"use client";

import { Briefcase, TrendingUp, Users, GraduationCap, Building2, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { HeroMetrics, type HeroMetric } from "@/components/sections/HeroMetrics";

const careerMetrics: HeroMetric[] = [
  { icon: Briefcase, value: 100, suffix: "%", label: "Real Projects Day One" },
  { icon: TrendingUp, value: 100, suffix: "%", label: "Clear Career Path" },
  { icon: Users, value: 100, suffix: "%", label: "Expert Mentorship" },
];

export default function CareersHero() {
  return (
    <div className="relative">
      <Hero
        eyebrow="Join Our Team"
        badgeIcon={GraduationCap}
        title="Build|Infrastructure|That Lasts."
        description="Join Dockside Constructions and take technical ownership of high-impact industrial facilities, logistics corridors, and civil infrastructure. We build careers with safety, quality, and discipline."
        slides={[
          {
            src: "/hero/career5.png",
            alt: "Dockside Constructions engineering team at work",
          },
        ]}
      >
        <div className="pt-2">
          <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8B3A4A] mb-4">
            What You'll Experience
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Live Infrastructure Projects</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Career Growth Path</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Certified Safety Culture</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Expert Mentorship</span>
            </div>
          </div>
        </div>
      </Hero>
      <div className="absolute bottom-[80px] left-0 right-0 z-50">
        <HeroMetrics metrics={careerMetrics} />
      </div>
    </div>
  );
}
