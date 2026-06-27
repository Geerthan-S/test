import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { ProjectDelivery } from "@/components/home/ProjectDelivery";
import { Services } from "@/components/sections/Services";
import { TrustSystems } from "@/components/sections/TrustSystems";
import { TrustedByStrip } from "@/components/enterprise-proof";
import { SiteContentSections } from "@/components/site-content-sections";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { homeReferenceImages } from "@/lib/content";
import { getFeaturedProjects, getSitePage } from "@/lib/repositories";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, page] = await Promise.all([
    getFeaturedProjects(),
    getSitePage("home"),
  ]);

  const sections = (page?.sections ?? []).map((section) =>
    section.id === "company-introduction"
      ? {
        ...section,
        body: "Dockside Constructions is a professionally managed infrastructure and construction company specializing in earthworks, industrial infrastructure, logistics parks, roadworks and project management services. We combine engineering expertise, disciplined execution and transparent project controls to deliver successful outcomes.",
        media: homeReferenceImages.about,
        items: [
          { title: "Engineering-led planning" },
          { title: "ISO-certified processes" },
          { title: "Dedicated project controls" },
          { title: "On-time delivery culture" },
          { title: "Experienced site teams" },
          { title: "Transparent reporting" },
        ],
      }
      : section,
  );
  const pick = (...ids: string[]) => sections.filter((section) => ids.includes(section.id));

  return (
    <>
      {/* 1 — Hero */}
      <Hero
        eyebrow="INDUSTRIAL • COMMERCIAL • INFRASTRUCTURE"
        title="From Land Development|to Large-Scale |Infrastructure Execution."
        description="Dockside Constructions delivers earthworks, industrial infrastructure, road construction, site development and project management services across India with engineering precision, safety compliance and reliable execution."
        primaryLabel="VIEW PROJECTS"
        primaryHref="/projects"
        secondaryLabel="CONTACT US"
        secondaryHref="/contact"
      />

      {/* 2 — Key Stats */}
      <TrustSystems />

      {/* 3 — About Dockside */}
      <div id="about">
        <SiteContentSections sections={pick("company-introduction")} />
      </div>

      {/* 4 — Services */}
      <div id="services">
        <Services />
      </div>

      {/* 5 — Featured Projects */}
      <div id="clients">
        <TrustedByStrip />
      </div>

      <Projects projects={projects} />

      {/* 5.5 — Project Delivery Process */}
      <ProjectDelivery />

      {/* 6 — Contact CTA */}
      <ContactCTA />
    </>
  );
}
