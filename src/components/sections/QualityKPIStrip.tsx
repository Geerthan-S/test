"use client";

import { motion, type Variants } from "framer-motion";
import { BadgeCheck, ShieldAlert, CheckCircle2 } from "lucide-react";

export function QualityKPIStrip() {
    const metrics = [
        {
            icon: BadgeCheck,
            value: "TRIPLE",
            label: "ISO Certified (9001/14001/45001)",
        },
        {
            icon: CheckCircle2,
            value: "100%",
            label: "Quality Audits & Verification",
        },
        {
            icon: ShieldAlert,
            value: "ZERO",
            label: "Accident Proactive Culture",
        }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
        }
    };

    return (
        <section className="bg-[#38161C] border-y border-[#4a1d25]">
            <motion.div
                className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#4a1d25]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;

                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex-1 flex items-center justify-center gap-6 py-10 px-8 transition-colors hover:bg-[#401a20]"
                        >
                            <div className="flex-shrink-0 text-[#E8CDD1]">
                                <Icon className="w-8 h-8" strokeWidth={1.5} />
                            </div>

                            <div className="flex flex-col">
                                <span className="font-display text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-none mb-1">
                                    {metric.value}
                                </span>
                                <span className="font-mono text-[11px] font-bold text-[#D8C3C6] tracking-[0.15em] uppercase">
                                    {metric.label}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
