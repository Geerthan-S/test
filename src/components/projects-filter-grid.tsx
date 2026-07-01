"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProjectView } from "@/lib/content";
import { getProjectCategory, projectCategoryFilters, type ProjectCategoryFilter } from "@/lib/project-categories";
import { ProjectModal } from "@/components/projects/project-modal";

const filters = projectCategoryFilters;

export function ProjectsFilterGrid({
  projects,
  initialFilter = "All",
}: {
  projects: ProjectView[];
  initialFilter?: ProjectCategoryFilter;
}) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategoryFilter>(initialFilter);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    return getProjectCategory(project) === activeFilter;
  });

  const handleFilterChange = (filter: ProjectCategoryFilter) => {
    setActiveFilter(filter);
    setSelectedProjectIndex(null); // Close modal when filter changes
  };

  return (
    <>
      <div className="shot-filter-tabs" aria-label="Project categories">
        {filters.map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? "is-active" : ""}
            onClick={() => handleFilterChange(filter)}
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
              <div
                className="premium-project-card cursor-pointer"
                onClick={() => setSelectedProjectIndex(index)}
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
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal
        project={selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null!}
        allProjects={filteredProjects}
        currentIndex={selectedProjectIndex ?? 0}
        isOpen={selectedProjectIndex !== null}
        onClose={() => setSelectedProjectIndex(null)}
        onNavigate={(newIndex) => setSelectedProjectIndex(newIndex)}
      />
    </>
  );
}
