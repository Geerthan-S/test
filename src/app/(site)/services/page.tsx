import { ServicesLandingPage, type ServicesLandingService } from "@/components/services-landing-page";
import { serviceCategories } from "@/lib/content";
import { getProjects, getSitePage } from "@/lib/repositories";

export const dynamic = "force-dynamic";


export const metadata = {
  title: "Services",
  description:
    "Civil construction, roads, railway works, electrical works, industrial projects, project management, drainage works and traffic safety systems from Dockside Constructions.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Dockside Constructions",
    description:
      "Explore Dockside Constructions service lines for civil construction, roads, railways, electrical works, industrial projects, drainage and traffic safety systems.",
    url: "/services",
    type: "website",
  },
};

const landingServiceSlugs = [
  "civil-construction",
  "road-highways",
  "railway-works",
  "electrical-works",
  "industrial-projects",
  "project-management",
  "water-infrastructure-drainage-works",
  "road-safety-traffic-management-systems",
] as const;

const relatedServiceAliases: Record<string, string[]> = {
  "road-highways": ["Road", "Highways", "Road infrastructure"],
  "water-infrastructure-drainage-works": ["Drainage", "Storm water", "Culvert", "Water infrastructure"],
  "road-safety-traffic-management-systems": ["Road safety", "Traffic management", "Signage", "Barriers"],
};

function getServiceAliases(title: string, slug: string) {
  return [title, ...(relatedServiceAliases[slug] ?? [])].map((item) => item.toLowerCase());
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function projectMatchesAlias(entry: string, alias: string) {
  const target = entry.toLowerCase();
  if (alias.includes(" ")) return target.includes(alias);
  return new RegExp(`\\b${escapeRegExp(alias)}\\b`).test(target);
}

export default async function ServicesPage() {
  const projects = await getProjects();
  const services = landingServiceSlugs
    .map((slug) => serviceCategories.find((service) => service.slug === slug))
    .filter((service): service is (typeof serviceCategories)[number] => Boolean(service))
    .map<ServicesLandingService>((service) => {
      const aliases = getServiceAliases(service.title, service.slug);
      const relatedProjectCount = projects.filter((project) =>
        project.servicesUsed.some((entry) =>
          aliases.some((alias) => projectMatchesAlias(entry, alias)),
        ),
      ).length;

      return {
        title: service.title,
        slug: service.slug,
        image: service.image,
        description: service.shortDescription,
        deliverables: service.deliverables,
        benefits: service.benefits,
        relatedProjectCount,
      };
    });

  return <ServicesLandingPage services={services} />;
}
