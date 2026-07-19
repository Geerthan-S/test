"use client";

import { motion, type Variants } from "framer-motion";
import { Truck, Tractor, Clock, ShieldCheck, MapPin } from "lucide-react";

export function FleetAtAGlance() {
    const metrics = [
        {
            icon: Truck,
            value: "50+",
            label: "Vehicles",
        },
        {
            icon: Tractor,
            value: "20+",
            label: "Heavy Equipment",
        },
        {
            icon: Clock,
            value: "24 HRS",
            label: "Mobilisation",
        },
        {
            icon: ShieldCheck,
            value: "100%",
            label: "Deployment Ready",
        },
        {
            icon: MapPin,
            value: "500+",
            label: "Projects Supported",
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
        <section className="bg-[#1f0d10] py-16 px-4 md:px-8 border-y border-[#3a1b21]">
            <div className="max-w-[1500px] mx-auto">

                <div className="text-center mb-12">
                    <h2 className="font-display text-[15px] font-extrabold tracking-[0.2em] text-white uppercase m-0 leading-none">
                        FLEET AT A GLANCE
                    </h2>
                </div>

                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    {metrics.map((metric, idx) => {
                        const Icon = metric.icon;
                        return (
                            <motion.div
                                key={idx}
                                className="flex items-center gap-5 text-left"
                                variants={itemVariants}
                            >
                                <div className="text-white/80 shrink-0">
                                    <Icon className="w-10 h-10" strokeWidth={1.2} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-display text-[32px] md:text-[38px] font-bold text-white leading-none mb-1">
                                        {metric.value}
                                    </span>
                                    <span className="text-white/60 text-[11px] font-extrabold tracking-widest uppercase">
                                        {metric.label}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
