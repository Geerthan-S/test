"use client";

import { Truck, Tractor, HardHat, ShieldCheck, Wrench, Boxes } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { HeroMetrics, type HeroMetric } from "@/components/sections/HeroMetrics";

const fleetMetrics: HeroMetric[] = [
  { icon: Truck, value: 50, suffix: "+", label: "Tipper Trucks" },
  { icon: Tractor, value: 20, suffix: "+", label: "Heavy Equipment" },
  { icon: HardHat, value: 100, suffix: "%", label: "Deployment Ready" },
];

export function EquipmentFleetHero() {
  return (
    <div className="relative">
      <Hero
        eyebrow="Our Fleet"
        badgeIcon={ShieldCheck}
        title="Heavy|Equipment|Fleet."
        description="A modern fleet of heavy equipment maintained for rapid mobilisation, operational reliability, and seamless execution across infrastructure and civil construction projects."
        slides={[
          {
            src: "/hero/equipment-fleet-generated-hero.png",
            alt: "Dockside equipment fleet and heavy machinery at construction site",
          },
        ]}
      >
        <div className="pt-2">
          <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8B3A4A] mb-4">
            Fleet Capabilities
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Rapid Site Mobilisation</span>
            </div>
            <div className="flex items-center gap-3">
              <HardHat className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Certified Equipment Operators</span>
            </div>
            <div className="flex items-center gap-3">
              <Wrench className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Preventive Fleet Maintenance</span>
            </div>
            <div className="flex items-center gap-3">
              <Boxes className="w-4 h-4 text-[#8B3A4A]" strokeWidth={2} />
              <span className="text-[14px] font-medium text-[#4a4b52]">Multi-Project Deployment</span>
            </div>
          </div>
        </div>
      </Hero>
      <div className="absolute bottom-[80px] left-0 right-0 z-50">
        <HeroMetrics metrics={fleetMetrics} />
      </div>
    </div>
  );
}
