"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarClock, IndianRupee, MapPin, Ruler, BadgeCheck } from "lucide-react";
import type { ProjectView } from "@/lib/content";

const filters = ["All Projects", "Industrial", "Commercial", "Infrastructure", "Logistics", "Government", "Institutional"];

function getProjectArea(project: ProjectView) {
  const projectAreaBySlug: Record<string, string> = {
    "whirlpool-industrial-works-program": "250,000 Sq.ft",
    "lodha-industrial-park-chennai": "500,000 Sq.ft",
    "adani-logistics-civil-structural-works": "300,000 Sq.ft",
    "chennai-one-it-sez-land-development": "200,000 Sq.ft",
    "state-highway-project": "120 Km Stretch",
    "manufacturing-plant": "150,000 Sq.ft",
    "government-college": "75,000 Sq.ft",
    "water-supply-project": "Utility Network",
  };
  return projectAreaBySlug[project.slug] ?? project.scopeOfWork;
}

export function ProjectsFilterGrid({ projects }: { projects: ProjectView[] }) {
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All Projects") return true;
    return project.industry?.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <>
      <div className="shot-filter-tabs" aria-label="Project categories">
        {filters.map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? "is-active" : ""}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div layout className="shot-project-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              style={{ width: "100%", height: "100%" }}
            >
              <Link
                className="premium-project-card"
                href={`/projects/${project.slug}`}
                style={{ ["--index" as string]: index }}
              >
                <div className="premium-project-card__image">
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    loading={index < 4 ? "eager" : "lazy"}
                    sizes="(min-width: 1200px) 24vw, (min-width: 760px) 48vw, 92vw"
                  />
                  <span>{project.status === "COMPLETED" ? "Completed" : "In Progress"}</span>
                  <div className="premium-project-card__hover">
                    <strong>View Project</strong>
                    <ArrowUpRight aria-hidden="true" />
                  </div>
                </div>
                <div className="premium-project-card__glass">
                  <h3>{project.clientName?.toUpperCase() || project.title.toUpperCase()}</h3>
                  <p className="premium-project-card__type">{project.industry}</p>
                  <div className="premium-project-card__value">
                    <strong>{project.contractValue ?? project.projectValue ?? "Confidential"}</strong>
                    <span>Project Value</span>
                  </div>
                  <div className="premium-project-card__delivered">
                    <span>Delivered</span>
                    <ul>
                      {project.servicesUsed?.slice(0, 3).map((service) => (
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
        </AnimatePresence>
      </motion.div>
    </>
  );
}
