import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  Factory,
  IndianRupee,
  Landmark,
  MapPinned,
  Ruler,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { serviceCategories } from "@/lib/content";
import { getProjectBySlug, getProjects } from "@/lib/repositories";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { FloatingCTA } from "@/components/ui/floating-cta";

type ProjectRecord = NonNullable<Awaited<ReturnType<typeof getProjectBySlug>>>;

type CaseStudyData = {
  sector: string;
  clientType: string;
  value: string;
  area: string;
  scopeTitle: string;
  challenge: string;
  solution: string;
  deliveredWorks: string[];
  results: string[];
};

const profileCaseStudyData: Record<string, CaseStudyData> = {
  "whirlpool-industrial-works-program": {
    sector: "Industrial manufacturing",
    clientType: "Corporate industrial client",
    value: "INR 400+ Lakhs",
    area: "Warehouse, lab, utility, mezzanine and facility workfronts",
    scopeTitle: "Industrial facility works program.",
    challenge:
      "Whirlpool required repeat industrial works across active facility environments where production support, utility interfaces and handover discipline had to be coordinated without losing site control.",
    solution:
      "Dockside handled the program as a multi-scope execution package, aligning civil, electrical, interior, fire-hydrant, lab and mezzanine works with inspection-led quality control.",
    deliveredWorks: [
      "Warehouse and packaging lab construction",
      "Reliability lab renovation",
      "Fire hydrant pipeline work",
      "Mezzanine floor construction",
      "Civil, electrical and interior works",
      "Repeat industrial execution across 20+ works",
    ],
    results: [
      "20+ works completed in the last 5 years",
      "INR 400+ Lakhs total profiled value",
      "Repeat industrial facility execution",
    ],
  },
  "lodha-industrial-park-chennai": {
    sector: "Industrial park infrastructure",
    clientType: "Private industrial park developer",
    value: "INR 5000+ Lakhs (INR 50+ Crores)",
    area: "Industrial park common-area and site-development zones",
    scopeTitle: "Earthwork, grading and common-area development.",
    challenge:
      "The Lodha Industrial Park program required large-format earthwork, grading and common-area development where levels, material movement and site coordination directly affected infrastructure readiness.",
    solution:
      "Dockside structured the scope around earthwork sequencing, land grading, material supply and common infrastructure development with practical project controls.",
    deliveredWorks: [
      "Earthwork execution",
      "Land grading",
      "Material supply",
      "Site development",
      "Common area development works",
      "Industrial park infrastructure coordination",
    ],
    results: [
      "INR 50+ Crores profiled project value",
      "Large-format site-development capability",
      "Industrial park scale execution",
    ],
  },
  "adani-logistics-civil-structural-works": {
    sector: "Logistics infrastructure",
    clientType: "Logistics infrastructure client",
    value: "INR 10 Crores",
    area: "Logistics facility civil, RCC, drainage and structural workfronts",
    scopeTitle: "Civil, RCC, drainage and structural works.",
    challenge:
      "Adani Logistics required civil and structural execution across logistics infrastructure where drainage, RCC works and structural coordination had to progress with accountable project controls.",
    solution:
      "Dockside organized the ongoing scope around civil packages, RCC workfronts, drainage interfaces and structural works with milestone-led supervision.",
    deliveredWorks: [
      "Miscellaneous civil works",
      "RCC works",
      "Drainage works",
      "Structural works",
      "Logistics infrastructure support",
      "Ongoing site coordination",
    ],
    results: [
      "INR 10 Crores profiled project value",
      "Ongoing logistics infrastructure works",
      "Civil, RCC, drainage and structural execution",
    ],
  },
  "chennai-one-it-sez-land-development": {
    sector: "Commercial campus development",
    clientType: "Commercial campus developer",
    value: "INR 300+ Crores (Overall Project Value)",
    area: "Large-scale land development, soil filling and survey zones",
    scopeTitle: "Land development, soil filling and DGPS survey works.",
    challenge:
      "Chennai One IT SEZ involved large-scale early-stage campus development where land levels, soil filling, site preparation and survey accuracy formed the foundation for later construction stages.",
    solution:
      "Dockside supported the work through survey-led execution, DGPS control, site preparation and soil-filling coordination for a high-accountability commercial campus environment.",
    deliveredWorks: [
      "Large-scale land development",
      "Soil filling",
      "Site preparation",
      "DGPS works",
      "Survey works",
      "Commercial campus infrastructure support",
    ],
    results: [
      "INR 300+ Crores overall project value stated in profile",
      "Survey-led land development support",
      "Ongoing commercial campus execution",
    ],
  },
};

function getCaseStudyData(project: ProjectRecord): CaseStudyData {
  const profileData = profileCaseStudyData[project.slug];
  if (profileData) return profileData;

  const value = project.contractValue ?? project.projectValue;

  return {
    sector: project.industry,
    clientType: project.clientType ?? "Project client",
    value,
    area: project.scopeOfWork,
    scopeTitle: "Engineering-led project execution.",
    challenge: `${project.clientName} required ${project.scopeOfWork.toLowerCase()} in a ${project.industry.toLowerCase()} context where sequencing, quality control and site accountability shaped delivery confidence.`,
    solution: `Dockside structured the work around ${project.servicesUsed.slice(0, 3).join(", ").toLowerCase()} with planning, supervision, documentation and handover controls.`,
    deliveredWorks: project.servicesUsed.length ? project.servicesUsed : [project.scopeOfWork],
    results: project.keyAchievements?.length
      ? project.keyAchievements
      : ["Engineering-led planning", "Documented project controls", "Owner-ready handover discipline"],
  };
}

function getGallery(project: ProjectRecord) {
  return Array.from(new Set([project.featuredImage, ...project.gallery])).slice(0, 5);
}

function getRelatedServices(project: ProjectRecord) {
  const serviceTitleSet = new Set(project.servicesUsed.map((service) => service.toLowerCase()));
  const related = serviceCategories.filter((service) => serviceTitleSet.has(service.title.toLowerCase()));
  return (related.length ? related : serviceCategories.slice(0, 3)).slice(0, 4);
}

function getMilestones(project: ProjectRecord) {
  const works = project.servicesUsed.length ? project.servicesUsed : ["civil execution"];

  return [
    ["01", "Scope Review", "Confirm client requirements, drawings, quantities, site constraints and delivery risks."],
    ["02", "Planning Lock", "Align methods, workfront sequence, manpower, materials, equipment and safety controls."],
    ["03", "Site Execution", `Execute ${works.slice(0, 2).join(" and ").toLowerCase()} with inspection gates and measurement discipline.`],
    ["04", "Quality Closeout", "Validate work records, documentation, snag control and handover readiness."],
  ];
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.featuredImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const caseStudy = getCaseStudyData(project);
  const gallery = getGallery(project);
  const relatedServices = getRelatedServices(project);
  const milestones = getMilestones(project);
  const statusLabel = project.status.replaceAll("_", " ");

  const factCards = [
    { label: "Client", value: project.clientName, icon: Landmark },
    { label: "Sector", value: caseStudy.sector, icon: Factory },
    { label: "Value", value: caseStudy.value, icon: IndianRupee },
    { label: "Area / Coverage", value: caseStudy.area, icon: Ruler },
    { label: "Timeline", value: project.timeline, icon: CalendarClock },
    { label: "Location", value: project.location, icon: MapPinned },
  ];

  return (
    <main className="project-case-page">
      <section className="premium-page-hero project-case-hero">
        <div className="premium-page-hero__media">
          <Image src={project.featuredImage} alt="" fill priority className="object-cover" />
        </div>
        <div className="premium-page-hero__content">
          <span>{statusLabel} / {project.clientName}</span>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="project-case-hero__actions">
            <Link href="/contact" className="studio-button studio-button--fill">
              Discuss Similar Project <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/projects" className="studio-button studio-button--outline">
              View All Projects <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="project-case-facts" aria-label="Project facts">
        {factCards.map((fact) => {
          const Icon = fact.icon;
          return (
            <article key={fact.label}>
              <Icon aria-hidden="true" />
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </article>
          );
        })}
      </section>

      <section className="project-case-shell">
        <article className="project-case-story">
          <Reveal>
            <section className="project-case-block project-case-block--scope">
              <div className="project-case-section-head">
                <span>Scope</span>
                <h2>{caseStudy.scopeTitle}</h2>
              </div>
              <div className="project-case-copy">
                <p><strong>Scope of work:</strong> {project.scopeOfWork}</p>
                <p>{project.body}</p>
                {project.clientOverview ? <p>{project.clientOverview}</p> : null}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.1}>
            <section className="project-case-two-up" aria-label="Challenge and solution">
            <article>
              <span>Challenge</span>
              <h2>What had to be solved.</h2>
              <p>{caseStudy.challenge}</p>
            </article>
            <article>
              <span>Solution</span>
              <h2>How Dockside responded.</h2>
              <p>{caseStudy.solution}</p>
            </article>
          </section>

          <section className="project-case-block">
            <div className="project-case-section-head">
              <span>Delivered works</span>
              <h2>What Dockside delivered.</h2>
            </div>
            <div className="project-case-delivered">
              {caseStudy.deliveredWorks.map((work) => (
                <article key={work}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>{work}</span>
                </article>
              ))}
            </div>
            </section>
          </Reveal>

          <Reveal delay={0.3}>
            <section className="project-case-gallery" aria-label={`${project.title} gallery`}>
            <div className="project-case-section-head">
              <span>Gallery</span>
              <h2>Visual proof from the project environment.</h2>
            </div>
            <div className="project-case-gallery__grid">
              {gallery.map((image, index) => (
                <figure key={image}>
                  <Image
                    src={image}
                    alt={`${project.title} project image ${index + 1}`}
                    fill
                    sizes={index === 0 ? "(min-width: 1180px) 52vw, 100vw" : "(min-width: 1180px) 24vw, 50vw"}
                  />
                </figure>
              ))}
            </div>
          </section>
          </Reveal>

          <Reveal delay={0.2}>
          <section className="project-case-block">
            <div className="project-case-section-head">
              <span>Execution flow</span>
              <h2>From review to handover.</h2>
            </div>
            <div className="project-case-timeline">
              {milestones.map(([number, title, text]) => (
                <article key={number}>
                  <b>{number}</b>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>
          </Reveal>

          <Reveal delay={0.3}>
          <section className="project-case-block">
            <div className="project-case-section-head">
              <span>Related services</span>
              <h2>Capabilities connected to this project.</h2>
            </div>
            <div className="project-case-services">
              {relatedServices.map((service) => (
                <Link href="/services" key={service.slug}>
                  <Wrench aria-hidden="true" />
                  <strong>{service.title}</strong>
                  <span>{service.description}</span>
                  <em>
                    View Services <ArrowRight aria-hidden="true" />
                  </em>
                </Link>
              ))}
            </div>
            </section>
          </Reveal>

          {project.testimonial ? (
            <Reveal delay={0.3}>
              <blockquote className="project-case-quote">
                <p>&ldquo;{project.testimonial.quote}&rdquo;</p>
                <footer>
                  {project.testimonial.personName}, {project.testimonial.designation}, {project.testimonial.company}
                </footer>
              </blockquote>
            </Reveal>
          ) : null}
        </article>

        <Reveal delay={0.4}>
          <aside className="project-case-dossier" aria-label="Project dossier">
          <span>Project dossier</span>
          <h2>{project.clientName}</h2>
          <dl>
            <div>
              <dt>Client Type</dt>
              <dd>{project.clientType ?? caseStudy.clientType}</dd>
            </div>
            <div>
              <dt>Sector</dt>
              <dd>{caseStudy.sector}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{statusLabel}</dd>
            </div>
            <div>
              <dt>Project Value</dt>
              <dd>{caseStudy.value}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{project.location}</dd>
            </div>
          </dl>
          <div className="project-case-results">
            <strong>Proof Points</strong>
            {caseStudy.results.map((result) => (
              <p key={result}>
                <BadgeCheck aria-hidden="true" />
                {result}
              </p>
            ))}
          </div>
          <div className="project-case-certified">
            <ShieldCheck aria-hidden="true" />
            <div>
              <strong>ISO-certified systems</strong>
              <p>Quality, environmental and occupational safety management standards support delivery discipline.</p>
            </div>
          </div>
          <Link href="/contact" className="studio-button studio-button--fill">
            Start A Similar Scope <ArrowRight aria-hidden="true" />
          </Link>
          </aside>
        </Reveal>
      </section>

      <section className="project-case-next">
        <Building2 aria-hidden="true" />
        <div>
          <span>Need this level of project control?</span>
          <h2>Bring Dockside into your next industrial, commercial or infrastructure scope.</h2>
        </div>
        <Link href="/contact" className="studio-button studio-button--outline">
          Contact Team <ArrowRight aria-hidden="true" />
        </Link>
      </section>
      
      <FloatingCTA />
    </main>
  );
}
