"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import type { ProjectView } from "@/lib/content";

function formatProjectValue(val: number | string | null | undefined): string {
    if (!val) return "N/A";
    return typeof val === "number" ? val.toString() : val;
}

interface ProjectJourneyTimelineProps {
    projects: ProjectView[];
}

export function ProjectJourneyTimeline({ projects }: ProjectJourneyTimelineProps) {
    // 1. Sort and group projects by year
    const timelineData = useMemo(() => {
        // Helper to safely extract a numeric year from completedAt
        const extractYear = (completedAt: Date | string | null | undefined): number => {
            if (!completedAt) return 0;
            const d = new Date(completedAt);
            return isNaN(d.getTime()) ? 0 : d.getFullYear();
        };

        // Filter projects that actually have a valid completion date
        const completed = [...projects].filter((p) => extractYear(p.completedAt) > 1900);

        // Sort ascending by year
        completed.sort((a, b) => {
            const timeA = new Date(a.completedAt || 0).getTime();
            const timeB = new Date(b.completedAt || 0).getTime();
            return timeA - timeB;
        });

        // Group by year
        const groups: Record<number, ProjectView[]> = {};
        completed.forEach((p) => {
            // If it's explicitly not completed, push it to the "Present" (9999) node
            const year = p.status !== "COMPLETED" ? 9999 : extractYear(p.completedAt);
            if (!groups[year]) groups[year] = [];
            groups[year].push(p);
        });

        // Ensure a "Present" (9999) node always exists even if empty
        if (!groups[9999]) {
            groups[9999] = [];
        }

        // Unique sorted years
        const activeYears = Object.keys(groups)
            .map(Number)
            .sort((a, b) => a - b);

        return { groups, years: activeYears };
    }, [projects]);

    const [activeYear, setActiveYear] = useState<number>(
        timelineData.years.length > 0 ? timelineData.years[0] : new Date().getFullYear()
    );

    const [activeProjectIndex, setActiveProjectIndex] = useState(0);

    // When year changes, reset the sub-project index
    const handleYearClick = (year: number) => {
        if (activeYear === year) return;
        setActiveYear(year);
        setActiveProjectIndex(0);
    };

    const activeProjects = timelineData.groups[activeYear] || [];
    const currentProject = activeProjects[activeProjectIndex];

    if (timelineData.years.length === 0) {
        return null;
    }

    const handleNextProject = () => {
        if (activeProjectIndex < activeProjects.length - 1) {
            setActiveProjectIndex((prev) => prev + 1);
        }
    };

    const handlePrevProject = () => {
        if (activeProjectIndex > 0) {
            setActiveProjectIndex((prev) => prev - 1);
        }
    };

    return (
        <section className="py-24 px-6 md:px-12 lg:px-16 bg-[#faf8f7] overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display font-[800] text-3xl md:text-[44px] uppercase tracking-wide text-gray-900 mb-4"
                    >
                        Our Project Journey
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 text-[15px] max-w-[600px] mx-auto leading-relaxed"
                    >
                        Milestones of trust, engineering excellence, and landmark deliveries across the years.
                    </motion.p>
                </div>

                {/* The Timeline Track */}
                <div className="relative mb-24">
                    {/* Horizontal Line background */}
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-200 -translate-y-1/2 z-0 hidden md:block"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 overflow-x-auto pb-8 md:pb-0 hide-scrollbar snap-x snap-mandatory">
                        {timelineData.years.map((year, idx) => {
                            const isActive = activeYear === year;
                            return (
                                <button
                                    key={year}
                                    onClick={() => handleYearClick(year)}
                                    className="flex flex-col items-center gap-4 group shrink-0 snap-center focus:outline-none"
                                    style={{ minWidth: "120px" }}
                                >
                                    <span
                                        className={`font-display text-[22px] font-bold transition-colors duration-500 ${isActive ? "text-[#8A3841]" : "text-gray-900 group-hover:text-gray-600"
                                            }`}
                                    >
                                        {year === 9999 ? "Present" : year}
                                    </span>

                                    {/* Circle Marker */}
                                    <div className="relative flex items-center justify-center">
                                        <div className="absolute w-[60px] h-[1px] bg-gray-200 right-full md:hidden" />
                                        <div className="absolute w-[60px] h-[1px] bg-gray-200 left-full md:hidden" />

                                        <motion.div
                                            layout
                                            className={`w-5 h-5 rounded-full border-4 transition-colors duration-500 ${isActive
                                                ? "bg-[#8A3841] border-[#8A3841] scale-125"
                                                : "bg-white border-gray-300 group-hover:border-gray-400"
                                                }`}
                                        />
                                    </div>

                                    {/* Subtle indication of what projects are here (for desktop) */}
                                    <div className="hidden md:flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                                            {timelineData.groups[year].length} Project{timelineData.groups[year].length !== 1 && 's'}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Dynamic Showcase Panel */}
                <div className="relative bg-white rounded-[32px] md:rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {currentProject ? (
                            <motion.div
                                key={`${currentProject.id}-${activeProjectIndex}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="grid grid-cols-1 lg:grid-cols-2 h-full"
                            >
                                {/* Left: Premium Image */}
                                <div className="relative h-[400px] lg:h-full w-full overflow-hidden bg-gray-100">
                                    <Image
                                        src={currentProject.featuredImage || "/hero/projects.jpg"}
                                        alt={currentProject.title}
                                        fill
                                        className="object-cover transition-transform duration-[2s] hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

                                    {/* Status Badge */}
                                    <div className="absolute top-6 left-6 inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100 shadow-xl">
                                        <CheckCircle2 className="size-4 text-[#8A3841]" />
                                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-900">
                                            {activeYear === 9999 ? "Ongoing" : `Completed ${activeYear}`}
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Content Panel */}
                                <div className="flex flex-col p-8 md:p-12 lg:p-16 justify-center">

                                    {/* Sub-navigation if multiple projects exist in year */}
                                    {activeProjects.length > 1 && (
                                        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100">
                                            <span className="font-mono text-[10px] font-bold tracking-widest text-[#8A3841] uppercase mr-auto">
                                                Project {activeProjectIndex + 1} of {activeProjects.length}
                                            </span>
                                            <button
                                                onClick={handlePrevProject}
                                                disabled={activeProjectIndex === 0}
                                                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                            >
                                                <ChevronLeft className="size-4" />
                                            </button>
                                            <button
                                                onClick={handleNextProject}
                                                disabled={activeProjectIndex === activeProjects.length - 1}
                                                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                            >
                                                <ChevronRight className="size-4" />
                                            </button>
                                        </div>
                                    )}

                                    <div className="inline-flex items-center gap-3 mb-6">
                                        <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#8A3841] uppercase">
                                            {currentProject.industry}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                            <MapPin className="size-3" />
                                            {currentProject.location}
                                        </span>
                                    </div>

                                    <h3 className="font-display text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                                        {currentProject.title}
                                    </h3>

                                    <p className="text-gray-600 text-[15px] leading-[1.8] mb-12 max-w-[480px]">
                                        {currentProject.summary || "A landmark delivery marked by engineered precision, seamless execution, and rigorous quality safety standards."}
                                    </p>

                                    <div className="grid grid-cols-2 gap-8 mb-12">
                                        <div>
                                            <div className="font-mono text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">
                                                Project Value
                                            </div>
                                            <div className="font-display text-2xl md:text-3xl font-extrabold text-gray-900">
                                                {formatProjectValue(currentProject.projectValue)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-mono text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">
                                                Total Area
                                            </div>
                                            <div className="font-display text-2xl md:text-3xl font-extrabold text-[#8A3841]">
                                                {currentProject.area || "N/A"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Future-proof empty link if tracking back to full case-study later, but sticking to spec: no route change */}
                                    <a href={`#`} className="group inline-flex items-center gap-4 text-[13px] font-bold uppercase tracking-widest text-[#8A3841] mt-auto">
                                        View Project Details
                                        <span className="w-10 h-10 rounded-full bg-[#8A3841]/5 flex items-center justify-center group-hover:bg-[#8A3841]/10 transition-colors">
                                            <ArrowRight className="size-4" strokeWidth={2} />
                                        </span>
                                    </a>

                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty-present"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center h-full min-h-[600px] bg-gray-50/50 p-8 text-center"
                            >
                                <span className="font-mono text-[12px] font-bold tracking-[0.2em] text-[#8A3841] uppercase mb-4">
                                    The Future
                                </span>
                                <h3 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                                    Building what's next.
                                </h3>
                                <p className="text-gray-500 text-[15px] max-w-[400px]">
                                    We are actively engineering tomorrow's landmarks across industrial corridors and infrastructure.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}} />
        </section>
    );
}
