"use client";

import { Building2, Timer, BadgeCheck, Factory, Landmark, Truck } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { HeroMetrics, type HeroMetric } from "@/components/sections/HeroMetrics";

const projectMetrics: HeroMetric[] = [
  { icon: Building2, value: 25, suffix: "+", label: "Projects Delivered" },
  { icon: Timer, value: 100, suffix: " CR+", label: "Project Exposure" },
  { icon: BadgeCheck, value: 100, suffix: "%", label: "Quality Assured" },
];

export function ProjectsHero() {
  return (
    <div className="relative">
      <Hero
        eyebrow="Our Portfolio"
        badgeIcon={Building2}
        title="Projects That|Demonstrate|Capability."
        description="Explore a portfolio of industrial, commercial and infrastructure projects delivered through careful planning, technical expertise and a relentless focus on quality."
        slides={[
          {
            src: "/hero/projects-construction-site.jpg",
            alt: "Dockside construction projects portfolio",
          },
        ]}
      >
        <div className="pt-2">
          <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8B3A4A] mb-4">
            Project Expertise
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex items-center gap-3">
              <Factory className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Industrial Infrastructure</span>
            </div>
            <div className="flex items-center gap-3">
              <Landmark className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Government Projects</span>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Commercial Developments</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Logistics Facilities</span>
            </div>
          </div>
        </div>
      </Hero>

      <div className="absolute bottom-[90px] left-0 right-0 z-50 home-metrics-card pointer-events-none">
        <HeroMetrics metrics={projectMetrics} />
      </div>
    </div>
  );
}
