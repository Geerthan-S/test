import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  IndianRupee,
  Landmark,
  MapPinned,
  Phone,
  Ruler,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/repositories";
import { Reveal } from "@/components/motion/reveal";
import { FloatingCTA } from "@/components/ui/floating-cta";

type ProjectRecord = NonNullable<Awaited<ReturnType<typeof getProjectBySlug>>>;

function getGallery(project: ProjectRecord) {
  return Array.from(new Set([project.featuredImage, ...project.gallery]));
}

function formatDate(date: Date | null | undefined) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

function getDuration(start: Date | null | undefined, end: Date | null | undefined) {
  if (!start) return null;
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  if (months < 1) return "< 1 Month";
  if (months < 12) return `${months} Months`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem ? `${years}y ${rem}m` : `${years} Year${years > 1 ? "s" : ""}`;
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

  const gallery = getGallery(project);
  const statusLabel = project.status.replaceAll("_", " ");
  const contractValue = project.contractValue ?? project.projectValue;
  const startDateStr = formatDate((project as any).startDate);
  const endDateStr = formatDate((project as any).endDate);
  const duration = getDuration((project as any).startDate, (project as any).endDate);

  const hasMetrics =
    (project as any).builtUpArea ||
    (project as any).roadLength ||
    (project as any).concreteUsed ||
    (project as any).steelUsed ||
    (project as any).workforceDeployed;

  return (
    <main className="project-case-detail-page">
      {/* ── Hero Section ── */}
      <section className="project-case-hero">
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          priority
          className="project-case-hero__image"
        />
        <div className="project-case-hero__content">
          <div className="project-case-hero__badge">
            {statusLabel} / {project.clientName}
          </div>
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

      {/* ── Project Facts Strip ── */}
      <Reveal>
        <section className="project-facts-strip" aria-label="Project facts">
          <article className="project-fact-card">
            <Landmark className="size-6" aria-hidden="true" />
            <span>Client</span>
            <strong>{project.clientName}</strong>
          </article>
          <article className="project-fact-card">
            <Building2 className="size-6" aria-hidden="true" />
            <span>Sector</span>
            <strong>{project.industry}</strong>
          </article>
          <article className="project-fact-card">
            <IndianRupee className="size-6" aria-hidden="true" />
            <span>Value</span>
            <strong>{contractValue}</strong>
          </article>
          <article className="project-fact-card">
            <Ruler className="size-6" aria-hidden="true" />
            <span>Area / Coverage</span>
            <strong>{(project as any).builtUpArea || project.scopeOfWork.split('.')[0]}</strong>
          </article>
          <article className="project-fact-card">
            <CalendarClock className="size-6" aria-hidden="true" />
            <span>Timeline</span>
            <strong>{duration || project.timeline}</strong>
          </article>
          <article className="project-fact-card">
            <MapPinned className="size-6" aria-hidden="true" />
            <span>Location</span>
            <strong>{project.location}</strong>
          </article>
        </section>
      </Reveal>

      {/* ── Main Content Grid ── */}
      <div className="project-case-grid">
        {/* Main Content Column */}
        <div className="project-case-main">
          {/* Scope Section */}
          <Reveal delay={0.1}>
            <article className="project-case-section">
              <div className="project-case-section__layout">
                <div className="project-case-section__header">
                  <span>Scope</span>
                  <h2>{project.title.split(' - ')[0]} scope and execution.</h2>
                </div>
                <div className="project-case-section__content">
                  <p>
                    <strong>Scope of work:</strong> {project.scopeOfWork}
                  </p>
                  <p>{project.summary}</p>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Challenge & Solution */}
          <Reveal delay={0.15}>
            <section className="project-challenge-solution" aria-label="Challenge and solution">
              <article className="project-challenge-card">
                <span>Challenge</span>
                <h2>What had to be solved.</h2>
                <p>
                  The {project.title} program required careful coordination of scope, timeline, and quality standards
                  where execution discipline and site management directly affected project success.
                </p>
              </article>
              <article className="project-solution-card">
                <span>Solution</span>
                <h2>How Dockside responded.</h2>
                <p>
                  Dockside structured the execution around proven project controls, quality checkpoints, and
                  clear communication protocols with the client team.
                </p>
              </article>
            </section>
          </Reveal>

          {/* Delivered Works */}
          <Reveal delay={0.2}>
            <article className="project-delivered-section">
              <div className="project-delivered-section__header">
                <span>Delivered works</span>
                <h2>What Dockside delivered.</h2>
              </div>
              <div className="project-delivered-grid">
                {project.servicesUsed.length > 0
                  ? project.servicesUsed.map((service, idx) => (
                      <article key={idx} className="project-delivered-card">
                        <CheckCircle2 className="size-5" aria-hidden="true" />
                        <span>{service}</span>
                      </article>
                    ))
                  : project.scopeOfWork
                      .split(/[.,;]\s+/)
                      .filter(Boolean)
                      .slice(0, 6)
                      .map((item, idx) => (
                        <article key={idx} className="project-delivered-card">
                          <CheckCircle2 className="size-5" aria-hidden="true" />
                          <span>{item.trim()}</span>
                        </article>
                      ))}
              </div>
            </article>
          </Reveal>

          {/* Gallery */}
          {gallery.length > 0 && (
            <Reveal delay={0.25}>
              <section className="project-case-gallery" aria-label={`${project.title} gallery`}>
                <div className="project-case-gallery__header">
                  <span>Gallery</span>
                  <h2>Visual proof from the project environment.</h2>
                </div>
                <div className="project-case-gallery__grid">
                  {gallery.slice(0, 3).map((image, index) => (
                    <figure key={image} className={index === 0 ? "project-case-gallery__primary" : ""}>
                      <Image
                        src={image}
                        alt={`${project.title} project image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </figure>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {/* Execution Flow */}
          <Reveal delay={0.3}>
            <article className="project-execution-flow">
              <div className="project-execution-flow__header">
                <span>Execution flow</span>
                <h2>From review to handover.</h2>
              </div>
              <div className="project-execution-flow__grid">
                <article className="project-execution-step">
                  <span className="project-execution-step__number">01</span>
                  <strong>Scope Review</strong>
                  <p>Confirm client requirements, drawings, quantities, site constraints and delivery risks.</p>
                </article>
                <article className="project-execution-step">
                  <span className="project-execution-step__number">02</span>
                  <strong>Planning Lock</strong>
                  <p>Align methods, workfront sequence, manpower, materials, equipment and safety controls.</p>
                </article>
                <article className="project-execution-step">
                  <span className="project-execution-step__number">03</span>
                  <strong>Site Execution</strong>
                  <p>Execute {project.industry} with inspection gates and measurement discipline.</p>
                </article>
                <article className="project-execution-step">
                  <span className="project-execution-step__number">04</span>
                  <strong>Quality Closeout</strong>
                  <p>Validate work records, documentation, snag control and handover readiness.</p>
                </article>
              </div>
            </article>
          </Reveal>

          {/* Related Services */}
          <Reveal delay={0.35}>
            <article className="project-related-services">
              <div className="project-related-services__header">
                <span>Related services</span>
                <h2>Capabilities connected to this project.</h2>
              </div>
              <div className="project-related-services__grid">
                {project.servicesUsed.slice(0, 3).map((service, idx) => (
                  <Link key={idx} href="/services" className="project-related-service-card">
                    <Building2 className="size-6" aria-hidden="true" />
                    <strong>{service}</strong>
                    <p>Professional execution delivered with disciplined site management and quality controls.</p>
                    <em>
                      View Services <ArrowRight className="size-6" aria-hidden="true" />
                    </em>
                  </Link>
                ))}
              </div>
            </article>
          </Reveal>

          {/* Testimonial */}
          {project.testimonial && (
            <Reveal delay={0.4}>
              <blockquote className="project-case-blockquote">
                <p>&ldquo;{project.testimonial.quote}&rdquo;</p>
                <footer>
                  {project.testimonial.personName}, {project.testimonial.designation},{" "}
                  {project.testimonial.company}
                </footer>
              </blockquote>
            </Reveal>
          )}
        </div>

        {/* Sidebar - Project Dossier */}
        <aside className="project-case-sidebar">
          <Reveal delay={0.2}>
            <div className="project-dossier">
              <span className="project-dossier__label">Project dossier</span>
              <h2 className="project-dossier__title">{project.clientName}</h2>

              <div className="project-dossier__facts">
                <div className="project-dossier__fact">
                  <dt>Client Type</dt>
                  <dd>{project.clientType || "Private sector"}</dd>
                </div>
                <div className="project-dossier__fact">
                  <dt>Sector</dt>
                  <dd>{project.industry}</dd>
                </div>
                <div className="project-dossier__fact">
                  <dt>Status</dt>
                  <dd className={`project-dossier__status project-dossier__status--${project.status.toLowerCase().replace("_", "-")}`}>
                    {statusLabel}
                  </dd>
                </div>
                <div className="project-dossier__fact">
                  <dt>Project Value</dt>
                  <dd>{contractValue}</dd>
                </div>
                <div className="project-dossier__fact">
                  <dt>Location</dt>
                  <dd>{project.location}</dd>
                </div>
              </div>

              <div className="project-dossier__proof-points">
                <strong>Proof Points</strong>
                <p>
                  <CheckCircle2 className="size-5" aria-hidden="true" />
                  {contractValue} profiled project value
                </p>
                <p>
                  <CheckCircle2 className="size-5" aria-hidden="true" />
                  {project.industry} capability
                </p>
                <p>
                  <CheckCircle2 className="size-5" aria-hidden="true" />
                  Professional project execution
                </p>
              </div>

              <div className="project-dossier__iso">
                <Shield className="size-5" aria-hidden="true" />
                <div>
                  <strong>ISO-certified systems</strong>
                  <p>Quality, environmental and occupational safety management standards support delivery discipline.</p>
                </div>
              </div>

              <Link href="/contact" className="studio-button studio-button--fill">
                Start A Similar Scope <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </aside>
      </div>

      {/* ── Footer CTA ── */}
      <section className="project-case-footer-cta" aria-label="Project enquiry">
        <Phone className="size-12" aria-hidden="true" />
        <div>
          <span>Need this level of project control?</span>
          <h2>Bring Dockside into your next industrial, commercial or infrastructure scope.</h2>
        </div>
        <Link href="/contact" className="studio-button studio-button--fill">
          Contact Team <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <FloatingCTA />
    </main>
  );
}
