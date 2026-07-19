"use client";

import { Building2, Landmark, Pickaxe, Users } from "lucide-react";
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
    <div className="relative w-full px-[4.05vw] flex justify-end z-[100]" style={{ marginTop: "-130px" }}>
      <motion.div
        className="w-full max-w-fit"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={containerVariants}
      >
        <div className="grid overflow-hidden rounded-[20px] border border-white bg-white shadow-[0_22px_62px_rgba(42,26,29,0.12)] md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                variants={metricVariants}
                className={`flex items-center gap-4 py-5 px-6 border-[#8B3A4A]/10 ${index === 0 ? "" :
                  index === 1 ? "border-t md:border-t-0 md:border-l" :
                    index === 2 ? "border-t md:border-l-0 lg:border-l lg:border-t-0" :
                      "border-t md:border-l lg:border-t-0"
                  }`}
              >
                <div className="flex w-[48px] h-[48px] shrink-0 items-center justify-center rounded-[12px] bg-[#f4ecea] border-white/60 border-[1.5px] shadow-sm text-[#8B3A4A]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <div className="font-display text-[20px] font-black uppercase leading-tight text-[#8B3A4A]">
                    <CountUp end={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="mt-0.5 text-[12px] font-medium leading-snug text-[#666971] whitespace-nowrap">
                    {metric.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
