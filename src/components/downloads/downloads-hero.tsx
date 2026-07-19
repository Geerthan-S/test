"use client";

import { FileText, Award, FileCheck, Download, BookOpen, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { HeroMetrics, type HeroMetric } from "@/components/sections/HeroMetrics";

const downloadMetrics: HeroMetric[] = [
  { icon: FileText, value: 15, suffix: "+", label: "Documents" },
  { icon: Award, value: 100, suffix: "%", label: "Certified" },
  { icon: FileCheck, value: 100, suffix: "%", label: "Verified" },
];

export default function DownloadsHero() {
  return (
    <div className="relative">
      <Hero
        eyebrow="Download Center"
        badgeIcon={Download}
        title="Business|Credentials|& Resources."
        description="Download our company credentials, certifications, policies, and documentation. All resources are verified and up-to-date for your business needs."
        slides={[
          {
            src: "/hero/downloads.png",
            alt: "Dockside business credentials and documentation center",
          },
        ]}
      >
        <div className="pt-2">
          <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8B3A4A] mb-4">
            Available Resources
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Company Profile</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Safety Policies</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">ISO Certifications</span>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Corporate Documents</span>
            </div>
          </div>
        </div>
      </Hero>
      <div className="absolute bottom-[80px] left-0 right-0 z-50">
        <HeroMetrics metrics={downloadMetrics} />
      </div>
    </div>
  );
}
