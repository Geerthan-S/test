import { Prisma, ProjectStatus } from "@prisma/client";
import { cache } from "react";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import {
  industrialImages,
  seedClients,
  seedProjects,
  serviceCategories,
  type ClientView,
  type ProjectView,
} from "@/lib/content";
import {
  defaultSitePages,
  getDefaultSitePage,
  type EditableSitePage,
  type SitePageSection,
} from "@/lib/site-content";

const PUBLIC_DATABASE_READ_TIMEOUT_MS = 6000;
const PUBLIC_DATABASE_RETRY_COOLDOWN_MS = 60_000;
const retiredSitePageSlugs = [
  "get-quote",
  ...serviceCategories.map((service) => `service-${service.slug}`),
];
let publicDatabaseUnavailableUntil = 0;

function markPublicDatabaseUnavailable() {
  publicDatabaseUnavailableUntil = Date.now() + PUBLIC_DATABASE_RETRY_COOLDOWN_MS;
}

async function withDatabaseFallback<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  if (Date.now() < publicDatabaseUnavailableUntil) return fallback;

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const query = operation().catch(() => {
    markPublicDatabaseUnavailable();
    return fallback;
  });
  const timeout = new Promise<T>((resolve) => {
    timeoutId = setTimeout(() => {
      markPublicDatabaseUnavailable();
      resolve(fallback);
    }, PUBLIC_DATABASE_READ_TIMEOUT_MS);
  });

  try {
    return await Promise.race([query, timeout]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

function normalizeProject(project: ProjectView): ProjectView {
  return {
    ...project,
    status: project.status as ProjectStatus,
    gallery: project.gallery ?? [],
    servicesUsed: project.servicesUsed ?? [],
    keyAchievements: project.keyAchievements ?? [],
  };
}

function normalizeSections(slug: string, value: Prisma.JsonValue, fallback: SitePageSection[]) {
  if (!Array.isArray(value)) return fallback;

  let sections = value as SitePageSection[];
  if (slug === "about") {
    const fallbackCertifications = fallback.find((section) => section.id === "certifications");
    const fallbackImageByTitle = new Map(
      fallbackCertifications?.items
        ?.filter((item) => item.image)
        .map((item) => [item.title, item.image]) ?? [],
    );

    if (fallbackImageByTitle.size) {
      sections = sections.map((section) => {
        if (section.id !== "certifications" || !section.items?.length) return section;
        return {
          ...section,
          items: section.items.map((item) => ({
            ...item,
            image: item.image ?? fallbackImageByTitle.get(item.title),
          })),
        };
      });
    }
  }

  return sections;
}

const staleDefaultHeroImages: Record<string, string[]> = {
  about: [industrialImages.structure],
  services: [industrialImages.highRise],
  projects: [industrialImages.hero, "/projects-hero-logistics.jpg"],
  careers: [industrialImages.crane],
};

function normalizeHeroImage(slug: string, heroImage: string, fallback?: EditableSitePage | null) {
  if (fallback && staleDefaultHeroImages[slug]?.includes(heroImage)) {
    return fallback.heroImage;
  }

  return heroImage || fallback?.heroImage || "";
}

function hasCurrentServiceCatalog(sections: SitePageSection[], fallback: EditableSitePage) {
  const expectedHrefs =
    fallback.sections
      .find((section) => section.id === "service-selection")
      ?.items?.map((item) => item.href)
      .filter(Boolean) ?? [];
  const actualHrefs = sections
    .flatMap((section) => section.items ?? [])
    .map((item) => item.href)
    .filter(Boolean);

  return expectedHrefs.length > 0 && expectedHrefs.every((href) => actualHrefs.includes(href));
}

function removeRetiredProjectSections(sections: SitePageSection[]) {
  return sections.filter((section) => section.id !== "project-categories");
}

function normalizeSitePage(
  page: {
    slug: string;
    title: string;
    description: string;
    heroTitle: string;
    heroDescription: string;
    heroImage: string;
    sections: Prisma.JsonValue;
    published: boolean;
  },
  fallback?: EditableSitePage | null,
): EditableSitePage {
  if (fallback && page.slug === "about" && Array.isArray(page.sections)) {
    const sectionIds = new Set((page.sections as SitePageSection[]).map((section) => section.id));
    const hasPremiumAboutStructure = [
      "company-snapshot",
      "who-we-are",
      "project-exposure",
      "corporate-profile",
      "about-final-cta",
    ].every((id) => sectionIds.has(id));

    if (!hasPremiumAboutStructure) {
      return { ...fallback, published: page.published };
    }
  }

  if (fallback && page.slug === "services" && Array.isArray(page.sections)) {
    if (!hasCurrentServiceCatalog(page.sections as SitePageSection[], fallback)) {
      return { ...fallback, published: page.published };
    }
  }

  const sections =
    page.slug === "projects"
      ? removeRetiredProjectSections(normalizeSections(page.slug, page.sections, fallback?.sections ?? []))
      : normalizeSections(page.slug, page.sections, fallback?.sections ?? []);

  return {
    slug: page.slug,
    title: page.title || fallback?.title || page.slug,
    description: page.description || fallback?.description || "",
    heroTitle: page.heroTitle || fallback?.heroTitle || page.title,
    heroDescription: page.heroDescription || fallback?.heroDescription || page.description,
    heroImage: normalizeHeroImage(page.slug, page.heroImage, fallback),
    sections,
    published: page.published,
  };
}

export const getProjects = cache(async (): Promise<ProjectView[]> => {
  if (!canUseDatabase()) return seedProjects;

  return withDatabaseFallback(async () => {
    const projects = await getPrisma().project.findMany({
      where: { published: true },
      include: { testimonial: true },
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
    });
    return projects.map(normalizeProject);
  }, seedProjects);
});

export const getFeaturedProjects = cache(async () => {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, 6);
});

export const getProjectBySlug = cache(async (slug: string) => {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
});

export const getClients = cache(async (): Promise<ClientView[]> => {
  if (!canUseDatabase()) return seedClients;

  return withDatabaseFallback(
    () =>
      getPrisma().client.findMany({
        where: { featured: true },
        orderBy: { updatedAt: "desc" },
      }),
    seedClients,
  );
});

export const getSitePages = cache(async (): Promise<EditableSitePage[]> => {
  if (!canUseDatabase()) return defaultSitePages;

  return withDatabaseFallback(async () => {
    const rows = await getPrisma().sitePage.findMany({
      where: { slug: { notIn: retiredSitePageSlugs } },
      orderBy: [{ slug: "asc" }],
    });
    const rowBySlug = new Map(rows.map((row) => [row.slug, row]));
    const merged = defaultSitePages.map((fallback) => {
      const row = rowBySlug.get(fallback.slug);
      rowBySlug.delete(fallback.slug);
      return row ? normalizeSitePage(row, fallback) : fallback;
    });
    const customPages = [...rowBySlug.values()].map((row) => normalizeSitePage(row));
    return [...merged, ...customPages];
  }, defaultSitePages);
});

export const getSitePage = cache(async (slug: string): Promise<EditableSitePage | null> => {
  if (retiredSitePageSlugs.includes(slug)) return null;

  const fallback = getDefaultSitePage(slug);
  if (!canUseDatabase()) return fallback;

  return withDatabaseFallback(async () => {
    const row = await getPrisma().sitePage.findUnique({ where: { slug } });
    return row ? normalizeSitePage(row, fallback) : fallback;
  }, fallback);
});

export async function getAdminMetrics() {
  if (!canUseDatabase()) {
    return {
      projects: seedProjects.length,
      testimonials: seedProjects.filter((project) => project.testimonial).length,
      clients: seedClients.length,
      sitePages: defaultSitePages.length,
    };
  }

  const db = getPrisma();
  const [projects, testimonials, clients, sitePages] = await Promise.all([
    db.project.count(),
    db.testimonial.count(),
    db.client.count(),
    db.sitePage.count({ where: { slug: { notIn: retiredSitePageSlugs } } }),
  ]);

  return {
    projects,
    testimonials,
    clients,
    sitePages: Math.max(sitePages, defaultSitePages.length),
  };
}
