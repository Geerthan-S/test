"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectView } from "@/lib/content";

const filters = ["All", "Industrial", "Commercial", "Infrastructure", "Government"];

function getProjectSector(project: ProjectView) {
  const text = `${project.industry} ${project.clientName} ${project.servicesUsed.join(" ")} ${project.scopeOfWork}`.toLowerCase();

  if (text.includes("government") || text.includes("public") || text.includes("pwd")) return "Government";
  if (text.includes("commercial") || text.includes("campus") || text.includes("sez")) return "Commercial";
  if (text.includes("road") || text.includes("drainage") || text.includes("utility") || text.includes("site development")) return "Infrastructure";
  return "Industrial";
}

function getOutcome(project: ProjectView) {
  if (project.status === "IN_PROGRESS") {
    return "Active delivery with milestone tracking, field coordination and progress visibility.";
  }

  if (project.clientName.toLowerCase().includes("whirlpool")) {
    return "Repeat industrial works completed across active facility, utility and renovation environments.";
  }

  return "Delivered scope with documented execution controls and owner-side coordination.";
}

export function ProjectShowcase({ projects }: { projects: ProjectView[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => getProjectSector(project) === activeFilter),
    [activeFilter, projects],
  );

  return (
    <section className="project-showcase" id="project-showcase">
      <div className="project-showcase__header">
        <div>
          <span>Project showcase</span>
          <h2>Mini case studies with scope, value, status and outcome.</h2>
          <p>
            Each project is structured for enterprise buyers who need proof of scale,
            execution context and delivery controls before starting a conversation.
          </p>
        </div>
        <div className="project-filter-tabs" aria-label="Project filters">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={activeFilter === filter ? "is-active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="project-case-study-grid" data-stagger-reveal>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.article
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="project-case-study-card"
              key={project.id}
            >
            <Link href={`/projects/${project.slug}`} className="project-case-study-card__media">
              <Image src={project.featuredImage} alt={project.title} fill sizes="(min-width: 1100px) 48vw, 92vw" />
              <span>{getProjectSector(project)}</span>
            </Link>
            <div className="project-case-study-card__body">
              <div className="project-case-study-card__meta">
                <strong>{project.clientName}</strong>
                <em>{project.status.replace("_", " ")}</em>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <dl>
                <div>
                  <dt>Location</dt>
                  <dd><MapPin className="size-3.5" aria-hidden="true" /> {project.location}</dd>
                </div>
                <div>
                  <dt>Value</dt>
                  <dd>{project.contractValue ?? project.projectValue}</dd>
                </div>
                <div>
                  <dt>Scope</dt>
                  <dd>{project.scopeOfWork}</dd>
                </div>
                <div>
                  <dt>Outcome</dt>
                  <dd><CheckCircle2 className="size-3.5" aria-hidden="true" /> {getOutcome(project)}</dd>
                </div>
              </dl>
              <div className="project-case-study-card__gallery">
                {project.gallery.slice(0, 3).map((image, index) => (
                  <span key={`${project.id}-${image}`}>
                    <Image src={image} alt={`${project.title} project gallery ${index + 1}`} fill sizes="140px" />
                  </span>
                ))}
              </div>
              <Link href={`/projects/${project.slug}`} className="project-case-study-card__link">
                View case study <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
