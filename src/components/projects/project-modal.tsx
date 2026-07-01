"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, MapPin, Building2, IndianRupee, Calendar, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectView } from "@/lib/content";

interface ProjectModalProps {
  project: ProjectView;
  allProjects: ProjectView[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function ProjectModal({
  project,
  allProjects,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}: ProjectModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Portals need a client-side document, so we only render after mount.
  // This also avoids SSR/hydration mismatches in Next.js.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Scroll modal content down 20px when opening
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 20, behavior: 'smooth' });
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, project?.id]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if (e.key === "ArrowLeft" && isOpen && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }
      if (e.key === "ArrowRight" && isOpen && currentIndex < allProjects.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, currentIndex, allProjects.length, onNavigate]);

  if (!project || !mounted) return null;

  const statusLabel = project.status.replaceAll("_", " ");
  const contractValue = project.contractValue ?? project.projectValue;
  const scopeItems = project.scopeOfWork
    .split(/[.,;]\s+/)
    .filter(Boolean)
    .slice(0, 8);
  const highlights = project.keyAchievements?.slice(0, 6) || [];
  const gallery = Array.from(new Set([project.featuredImage, ...project.gallery])).slice(0, 6);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allProjects.length - 1;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          onClick={onClose}
        >
          {/* Previous Button */}
          {hasPrevious && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(currentIndex - 1);
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 md:p-4 bg-white/90 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 group"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-800 group-hover:text-[#8A3841] transition-colors" />
            </motion.button>
          )}

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white overflow-hidden flex flex-col w-full"
            style={{
              height: '100vh',
              maxWidth: '100vw',
              borderRadius: '32px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between p-4 md:p-6 bg-white shadow-sm">
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                  <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-[#8A3841] text-white rounded">
                    {statusLabel}
                  </span>
                  <span className="text-sm md:text-base text-gray-600 font-medium">
                    {project.clientName}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-gray-50">
              <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
                {/* Hero Image */}
                <div className="relative w-full h-[250px] md:h-[350px] lg:h-[450px] rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1400px"
                    priority
                  />
                </div>

                {/* Project Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  <div className="bg-white p-4 rounded-lg  hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-[#8A3841]" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Client
                      </span>
                    </div>
                    <p className="text-sm md:text-base font-semibold text-gray-900">
                      {project.clientName}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg  hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-[#8A3841]" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Sector
                      </span>
                    </div>
                    <p className="text-sm md:text-base font-semibold text-gray-900">
                      {project.industry}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg  hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-[#8A3841]" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Location
                      </span>
                    </div>
                    <p className="text-sm md:text-base font-semibold text-gray-900">
                      {project.location}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg  hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <IndianRupee className="w-5 h-5 text-[#8A3841]" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Project Value
                      </span>
                    </div>
                    <p className="text-sm md:text-base font-semibold text-gray-900">
                      {contractValue}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg  hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-[#8A3841]" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Timeline
                      </span>
                    </div>
                    <p className="text-sm md:text-base font-semibold text-gray-900">
                      {project.timeline}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg  hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-[#8A3841]" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </span>
                    </div>
                    <p className="text-sm md:text-base font-semibold text-gray-900">
                      {statusLabel}
                    </p>
                  </div>
                </div>

                {/* Summary */}
                {project.summary && (
                  <div className="bg-white p-5 md:p-6 rounded-lg ">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                      Project Overview
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                )}

                {/* Scope of Work */}
                {scopeItems.length > 0 && (
                  <div className="bg-white p-5 md:p-6 rounded-lg ">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                      Scope of Work
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {scopeItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#8A3841] mt-2" />
                          <span className="text-sm md:text-base text-gray-700">
                            {item.trim()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Project Highlights */}
                {highlights.length > 0 && (
                  <div className="bg-white p-5 md:p-6 rounded-lg ">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                      Project Highlights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-lg  flex items-start gap-3 hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-[#8A3841] flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {gallery.length > 1 && (
                  <div className="bg-white p-5 md:p-6 rounded-lg ">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                      Project Gallery
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                      {gallery.slice(1).map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 cursor-pointer hover:opacity-90 transition-opacity group"
                        >
                          <Image
                            src={image}
                            alt={`${project.title} gallery image ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Next Button */}
          {hasNext && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(currentIndex + 1);
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 md:p-4 bg-white/90 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 group"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-800 group-hover:text-[#8A3841] transition-colors" />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}