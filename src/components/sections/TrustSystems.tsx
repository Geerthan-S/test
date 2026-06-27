"use client";

import { Building2, Landmark, Pickaxe, Users, Workflow } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { motion, type Variants } from "framer-motion";

const metricVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const metrics = [
  { icon: Building2, value: 25, suffix: "+", label: "Projects Delivered" },
  { icon: Landmark, value: 100, suffix: " CR+", label: "Project Exposure" },
  { icon: Pickaxe, value: 500000, suffix: "+ M³", label: "Earthwork Executed" },
  { icon: Users, value: 10, suffix: "+", label: "Major Clients" },
];

export function TrustSystems() {
  return (
    <motion.section
      className="trust-systems"
      aria-label="Trust metrics"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={containerVariants}
    >
      <motion.div className="trust-metric-strip">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.article key={metric.label} variants={metricVariants}>
              <Icon aria-hidden="true" />
              <div>
                <strong>
                  <CountUp end={metric.value} suffix={metric.suffix} />
                </strong>
                <span>{metric.label}</span>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
      <Workflow className="trust-systems__watermark" aria-hidden="true" />
    </motion.section>
  );
}
