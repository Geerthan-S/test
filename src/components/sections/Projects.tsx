"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { RevealText } from "@/components/motion/reveal";
import { homeReferenceImages, type ProjectView } from "@/lib/content";
import { projectCategoryFilters, projectCategoryHref } from "@/lib/project-categories";

const projectCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};


const categoryPills = projectCategoryFilters.map((label) => ({
  label,
  href: projectCategoryHref(label),
}));

const homeFeaturedProjects = [
  {
    slug: "whirlpool-industrial-works-program",
    client: "WHIRLPOOL INDIA",
    type: "Industrial Facility",
    area: "250,000 Sq.ft",
    value: "INR 4+ Cr",
    timeline: "Completed 2024",
    note: "20+ repeat works across warehouse, lab, utility, mezzanine, civil and electrical scopes.",
    image: homeReferenceImages.projects.whirlpool,
  },
  {
    slug: "lodha-industrial-park-chennai",
    client: "LODHA INDUSTRIAL PARK",
    type: "Industrial Infrastructure",
    area: "500,000 Sq.ft",
    value: "INR 50+ Cr",
    timeline: "Completed 2023",
    note: "Earthwork, land grading, material supply and common-area development at industrial park scale.",
    image: homeReferenceImages.projects.lodha,
  },
  {
    slug: "adani-logistics-civil-structural-works",
    client: "ADANI LOGISTICS",
    type: "Logistics Infrastructure",
    area: "300,000 Sq.ft",
    value: "INR 10 Cr",
    timeline: "2025 Onwards",
    note: "Civil, RCC, drainage and structural works supporting logistics infrastructure at Malur.",
    image: homeReferenceImages.projects.adani,
  },
  {
    slug: "chennai-one-it-sez-land-development",
    client: "CHENNAI ONE IT SEZ",
    type: "Commercial Campus",
    area: "200,000 Sq.ft",
    value: "INR 300+ Cr Overall",
    timeline: "2025 Onwards",
    note: "Survey-led land development, soil filling, site preparation and DGPS works for the campus.",
    image: homeReferenceImages.projects.chennaiOne,
  },
];

export function Projects({ projects }: { projects: ProjectView[] }) {
  const orderedProjects = homeFeaturedProjects
    .map((featured) => {
      const project = projects.find((entry) => entry.slug === featured.slug);
      return project ? { project, featured } : null;
    })
    .filter((entry): entry is { project: ProjectView; featured: (typeof homeFeaturedProjects)[number] } => Boolean(entry));

  const fallbackProjects = projects
    .filter((project) => !orderedProjects.some((entry) => entry.project.slug === project.slug))
    .slice(0, 4 - orderedProjects.length)
    .map((project) => ({
      project,
      featured: {
        slug: project.slug,
        client: project.clientName.toUpperCase(),
        type: project.industry,
        area: project.scopeOfWork,
        value: project.contractValue ?? project.projectValue,
        timeline: project.timeline,
        note: project.summary,
        image: project.featuredImage,
      },
    }));

  const displayProjects = [...orderedProjects, ...fallbackProjects].slice(0, 4);

  return (
    <section className="premium-projects" id="featured-projects">
      <div className="premium-projects__header">
        <div>
          <span>Featured projects</span>
          <RevealText>
            <h2>PROJECTS THAT DEFINE OUR CAPABILITY.</h2>
          </RevealText>
        </div>
      </div>

      <nav className="premium-projects__filters" aria-label="Featured project categories">
        {categoryPills.map((pill, index) => (
          <Link className={index === 0 ? "is-active" : ""} href={pill.href} key={pill.label}>
            {pill.label}
          </Link>
        ))}
      </nav>

      <div className="premium-projects__case-label">
        <span>Major deliveries</span>
        <Link href="/projects" className="studio-link premium-projects__view-all">
          View all case studies <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="premium-project-rail" aria-label="Featured projects">
        <motion.div
          className="premium-project-rail"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          style={{ display: "contents" }}
        >
          {displayProjects.map(({ project, featured }, index) => (
            <motion.div key={project.id} variants={projectCardVariants}>
              <Link
                href={`/projects/${project.slug}`}
                className="premium-project-card"
                style={{ ["--index" as string]: index }}
              >
            <div className="premium-project-card__image">
              <Image
                src={featured.image}
                alt={project.title}
                fill
                data-parallax-media
                loading="eager"
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(min-width: 1200px) 24vw, (min-width: 760px) 45vw, 92vw"
              />
              <span>{project.status === "COMPLETED" ? "Completed" : "In Progress"}</span>
              <div className="premium-project-card__hover">
                <strong>View Project</strong>
                <ArrowUpRight aria-hidden="true" />
              </div>
            </div>
            <div className="premium-project-card__glass">
              <h3>{featured.client}</h3>
              <p className="premium-project-card__type">{featured.type}</p>
              <div className="premium-project-card__value">
                <strong>{featured.value}</strong>
                <span>Project Value</span>
              </div>
              <div className="premium-project-card__delivered">
                <span>Delivered</span>
                <ul>
                  {project.servicesUsed.slice(0, 3).map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              <span className="premium-project-card__case-link">
                View Case Study <ArrowUpRight aria-hidden="true" />
              </span>
              <span className="premium-project-card__arrow" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
