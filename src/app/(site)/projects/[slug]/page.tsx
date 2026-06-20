import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  IndianRupee,
  Landmark,
  MapPinned,
  Phone,
  Ruler,
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
    <main className="project-case-page">
      {/* ── Hero ── */}
      <section className="project-detail-hero">
        <div className="project-detail-hero__media">
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
          <div className="project-detail-hero__overlay" />
        </div>
        <div className="project-detail-hero__content">
          <div className="project-detail-hero__badges">
            <span className={`project-status-badge project-status-badge--${project.status.toLowerCase().replace("_", "-")}`}>
              {statusLabel}
            </span>
            {(project as any).completionPct > 0 && (
              <span className="project-completion-badge">
                <TrendingUp className="size-3" aria-hidden="true" />
                {(project as any).completionPct}% Complete
              </span>
            )}
          </div>
          <h1>{project.title}</h1>
          <div className="project-detail-hero__meta">
            <span>
              <Landmark className="size-4" aria-hidden="true" /> {project.clientName}
            </span>
            <span>
              <MapPinned className="size-4" aria-hidden="true" /> {project.location}
            </span>
            <span>
              <IndianRupee className="size-4" aria-hidden="true" /> {contractValue}
            </span>
          </div>
        </div>
      </section>

      {/* ── Project Overview ── */}
      <Reveal>
        <section className="project-overview" aria-label="Project Overview">
          <div className="project-overview__inner">
            <div className="project-overview__head">
              <span>Project Overview</span>
              <h2>At a Glance</h2>
            </div>

            <div className="project-overview__layout">
              {/* Fact Table */}
              <table className="project-facts-table">
                <tbody>
                  <tr>
                    <th>
                      <Landmark className="size-4" aria-hidden="true" /> Client
                    </th>
                    <td>{project.clientName}</td>
                  </tr>
                  {project.clientType && (
                    <tr>
                      <th>
                        <Building2 className="size-4" aria-hidden="true" /> Project Type
                      </th>
                      <td>{project.clientType}</td>
                    </tr>
                  )}
                  <tr>
                    <th>
                      <MapPinned className="size-4" aria-hidden="true" /> Location
                    </th>
                    <td>{project.location}</td>
                  </tr>
                  <tr>
                    <th>
                      <IndianRupee className="size-4" aria-hidden="true" /> Contract Value
                    </th>
                    <td>{contractValue}</td>
                  </tr>
                  {startDateStr && (
                    <tr>
                      <th>
                        <CalendarClock className="size-4" aria-hidden="true" /> Start Date
                      </th>
                      <td>{startDateStr}</td>
                    </tr>
                  )}
                  {endDateStr && (
                    <tr>
                      <th>
                        <CalendarClock className="size-4" aria-hidden="true" /> End Date
                      </th>
                      <td>{endDateStr}</td>
                    </tr>
                  )}
                  {duration && (
                    <tr>
                      <th>
                        <Ruler className="size-4" aria-hidden="true" /> Duration
                      </th>
                      <td>{duration}</td>
                    </tr>
                  )}
                  {!startDateStr && (
                    <tr>
                      <th>
                        <CalendarClock className="size-4" aria-hidden="true" /> Timeline
                      </th>
                      <td>{project.timeline}</td>
                    </tr>
                  )}
                  <tr>
                    <th>Status</th>
                    <td>
                      <span className={`project-status-inline project-status-inline--${project.status.toLowerCase().replace("_", "-")}`}>
                        {statusLabel}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Industry</th>
                    <td>{project.industry}</td>
                  </tr>
                </tbody>
              </table>

              {/* Scope of Work */}
              <div className="project-scope">
                <h3>Scope of Work</h3>
                <ul>
                  {project.servicesUsed.length > 0
                    ? project.servicesUsed.map((item) => <li key={item}>{item}</li>)
                    : project.scopeOfWork
                        .split(/[.,;]\s+/)
                        .filter(Boolean)
                        .map((item) => <li key={item}>{item.trim()}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Key Metrics ── */}
      {hasMetrics && (
        <Reveal delay={0.1}>
          <section className="project-metrics" aria-label="Project Metrics">
            <div className="project-metrics__inner">
              <h3>Key Metrics</h3>
              <div className="project-metrics__grid">
                {(project as any).builtUpArea && (
                  <div className="project-metric-card">
                    <span>Built-up Area</span>
                    <strong>{(project as any).builtUpArea}</strong>
                  </div>
                )}
                {(project as any).roadLength && (
                  <div className="project-metric-card">
                    <span>Road Length</span>
                    <strong>{(project as any).roadLength}</strong>
                  </div>
                )}
                {(project as any).concreteUsed && (
                  <div className="project-metric-card">
                    <span>Concrete Used</span>
                    <strong>{(project as any).concreteUsed}</strong>
                  </div>
                )}
                {(project as any).steelUsed && (
                  <div className="project-metric-card">
                    <span>Steel Used</span>
                    <strong>{(project as any).steelUsed}</strong>
                  </div>
                )}
                {(project as any).workforceDeployed && (
                  <div className="project-metric-card">
                    <Users className="size-5" aria-hidden="true" />
                    <span>Workforce Deployed</span>
                    <strong>{(project as any).workforceDeployed}</strong>
                  </div>
                )}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* ── Project Gallery ── */}
      {gallery.length > 0 && (
        <Reveal delay={0.2}>
          <section className="project-gallery-section" aria-label={`${project.title} gallery`}>
            <div className="project-gallery-section__inner">
              <div className="project-gallery-section__head">
                <span>Project Gallery</span>
                <h2>Work From Site</h2>
              </div>
              <div className={`project-gallery-grid project-gallery-grid--${Math.min(gallery.length, 5)}`}>
                {gallery.map((image, index) => (
                  <figure
                    key={image}
                    className={`project-gallery-figure ${index === 0 ? "project-gallery-figure--primary" : ""}`}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} — site image ${index + 1}`}
                      fill
                      sizes={
                        index === 0
                          ? "(min-width: 1180px) 60vw, 100vw"
                          : "(min-width: 1180px) 30vw, 50vw"
                      }
                      className="object-cover"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* ── Testimonial ── */}
      {project.testimonial && (
        <Reveal delay={0.2}>
          <blockquote className="project-case-quote">
            <p>&ldquo;{project.testimonial.quote}&rdquo;</p>
            <footer>
              {project.testimonial.personName}, {project.testimonial.designation},{" "}
              {project.testimonial.company}
            </footer>
          </blockquote>
        </Reveal>
      )}

      {/* ── Contact CTA ── */}
      <section className="project-contact-cta" aria-label="Project enquiry">
        <Phone className="size-8" aria-hidden="true" />
        <div>
          <h2>Need Similar Project Execution?</h2>
          <p>
            Get in touch with our team — we will review your scope and provide a detailed proposal
            within 48 hours.
          </p>
        </div>
        <div className="project-contact-cta__actions">
          <a href="tel:+918825922737" className="studio-button studio-button--fill">
            Call Now <ArrowRight aria-hidden="true" />
          </a>
          <Link href="/projects" className="studio-button studio-button--outline">
            View All Projects <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <FloatingCTA />
    </main>
  );
}
