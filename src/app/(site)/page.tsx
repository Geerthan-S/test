import { Hero } from "@/components/sections/Hero";
import { CTA } from "@/components/sections/CTA";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { TrustSystems } from "@/components/sections/TrustSystems";
import { WhyDockside } from "@/components/sections/WhyDockside";
import { TrustedByStrip } from "@/components/enterprise-proof";
import { SiteContentSections } from "@/components/site-content-sections";
import { homeReferenceImages } from "@/lib/content";
import { getFeaturedProjects, getSitePage } from "@/lib/repositories";

export default async function HomePage() {
  const [projects, page] = await Promise.all([
    getFeaturedProjects(),
    getSitePage("home"),
  ]);
  const sections = (page?.sections ?? []).map((section) =>
    section.id === "company-introduction"
      ? {
          ...section,
          body:
            "Dockside Constructions helps owners move from scope to handover with disciplined planning, documented systems and accountable site execution.",
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
        title="BUILDING INDUSTRIAL &|INFRASTRUCTURE PROJECTS|THAT LAST FOR GENERATIONS."
        description="Delivering industrial facilities, logistics parks, commercial developments and infrastructure projects through disciplined execution, engineering excellence and uncompromising quality."
        primaryLabel="VIEW PROJECTS"
        primaryHref="/projects"
        secondaryLabel="GET A QUOTE"
        secondaryHref="/contact"
      />

      {/* 2 — Stats */}
      <TrustSystems />

      {/* 3 — Clients */}
      <TrustedByStrip />

      {/* 4 — About */}
      <SiteContentSections sections={pick("company-introduction")} />

      {/* 5 — Services */}
      <Services />

      {/* 6 — Featured Projects */}
      <Projects projects={projects} />

      {/* 7 — Why Dockside */}
      <WhyDockside />

      {/* 8 — Process Timeline */}
      <ProcessTimeline />

      {/* 9 — CTA */}
      <CTA
        eyebrow="Start your project"
        title="Ready To Build With Confidence?"
        description="Partner with Dockside Constructions for engineering-led execution, disciplined safety standards, and reliable project delivery."
        label="Get A Quote"
        href="/contact"
        secondaryLabel="View Projects"
        secondaryHref="/projects"
        image={homeReferenceImages.hero}
      />
    </>
  );
}
