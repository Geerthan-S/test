"use client";

import { Building2, Landmark, Pickaxe, Users, Workflow } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";

const metrics = [
  { icon: Building2, value: 25, suffix: "+", label: "Projects Delivered" },
  { icon: Landmark, value: 100, suffix: " CR+", label: "Project Exposure" },
  { icon: Pickaxe, value: 500000, suffix: "+ M³", label: "Earthwork Executed" },
  { icon: Users, value: 10, suffix: "+", label: "Major Clients" },
];

export function TrustSystems() {
  return (
    <section className="trust-systems" aria-label="Trust metrics">
      <div className="trust-metric-strip">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article key={metric.label}>
              <Icon aria-hidden="true" />
              <div>
                <strong>
                  <CountUp end={metric.value} suffix={metric.suffix} />
                </strong>
                <span>{metric.label}</span>
              </div>
            </article>
          );
        })}
      </div>
      <Workflow className="trust-systems__watermark" aria-hidden="true" />
    </section>
  );
}
