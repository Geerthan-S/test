"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Briefcase, CalendarClock, BookOpen, AlertCircle, Sparkles } from "lucide-react";
import { jobOpenings, type JobOpening } from "@/lib/careers-data";
import { CareerApplicationModal } from "@/components/career-application-modal";

const departments = ["All Departments", "Project Management", "Engineering", "QA/QC", "Safety"];
const locations = ["All Locations", "Chennai", "Bengaluru", "Site-based"];
const experiences = ["All Experience", "0-2 Years", "3-5 Years", "5+ Years"];

export function CareersFilterGrid() {
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedLoc, setSelectedLoc] = useState("All Locations");
  const [selectedExp, setSelectedExp] = useState("All Experience");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Apply filters
  const filteredJobs = jobOpenings.filter((job) => {
    const deptMatch =
      selectedDept === "All Departments" ||
      job.department.toLowerCase() === selectedDept.toLowerCase();

    const locMatch =
      selectedLoc === "All Locations" ||
      job.location.toLowerCase() === selectedLoc.toLowerCase();

    const expMatch =
      selectedExp === "All Experience" ||
      (selectedExp === "0-2 Years" && (job.experience.includes("0-2") || job.experience.includes("2-5"))) ||
      (selectedExp === "3-5 Years" && (job.experience.includes("3-5") || job.experience.includes("2-5"))) ||
      (selectedExp === "5+ Years" && job.experience.includes("8+"));

    return deptMatch && locMatch && expMatch;
  });

  const handleApply = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setSelectedDept("All Departments");
    setSelectedLoc("All Locations");
    setSelectedExp("All Experience");
  };

  return (
    <>
      {/* Filtering Toolbar */}
      <div className="careers-filter-toolbar">
        {/* Department Select */}
        <div className="career-filter-select">
          <label htmlFor="dept-filter">Department</label>
          <select
            id="dept-filter"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Location Select */}
        <div className="career-filter-select">
          <label htmlFor="loc-filter">Location</label>
          <select
            id="loc-filter"
            value={selectedLoc}
            onChange={(e) => setSelectedLoc(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Select */}
        <div className="career-filter-select">
          <label htmlFor="exp-filter">Experience Level</label>
          <select
            id="exp-filter"
            value={selectedExp}
            onChange={(e) => setSelectedExp(e.target.value)}
          >
            {experiences.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Content */}
      <motion.div layout className="careers-jobs-grid">
        <AnimatePresence mode="popLayout">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                layout
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="career-job-card"
              >
                <div className="career-job-card__inner">
                  {/* Job Header */}
                  <div className="career-job-card__header">
                    <span className="career-job-card__tag">{job.department}</span>
                    <span className="career-job-card__type">{job.type}</span>
                  </div>

                  {/* Job Title */}
                  <h3 className="career-job-card__title">{job.title}</h3>

                  {/* Job Metadata */}
                  <div className="career-job-card__meta">
                    <div className="career-job-card__meta-item">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="career-job-card__meta-item">
                      <CalendarClock className="w-4 h-4" />
                      <span>{job.experience} Required</span>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="career-job-card__skills">
                    <span>Required Competencies</span>
                    <ul>
                      {job.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={() => handleApply(job.id)}
                    className="shot-button shot-button--fill career-job-card__apply-btn"
                    type="button"
                  >
                    Apply for Role
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="careers-empty-state"
            >
              <AlertCircle className="w-12 h-12 text-[#923e4d] mb-4" />
              <h3>No Positions Match Your Filters</h3>
              <p>
                We are always looking for premium engineering talent. Try resetting your search parameters or submit a general application.
              </p>
              <div className="careers-empty-state__actions">
                <button
                  onClick={handleResetFilters}
                  className="shot-button shot-button--outline"
                  type="button"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => handleApply("general")}
                  className="shot-button shot-button--fill"
                  type="button"
                >
                  General Application
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal Application Form */}
      <CareerApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedJobId={selectedJobId}
      />
    </>
  );
}
