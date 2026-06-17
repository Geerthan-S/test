"use client";

import { Building2, Landmark, ShieldCheck, Workflow, Wrench } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";

const metrics = [
  { icon: Building2, value: 65, suffix: "+", label: "Works Delivered" },
  { icon: Wrench, value: 8, suffix: "", label: "Core Services" },
  { icon: Landmark, value: 10, suffix: "", label: "Key References" },
  { icon: ShieldCheck, value: 3, suffix: "", label: "ISO Certifications" },
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
