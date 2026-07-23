import { Users, HardHat, Activity, Clock } from "lucide-react";

const stats = [
    { value: "100+", label: "Engineers & Specialists", icon: Users },
    { value: "25+", label: "Major Projects", icon: HardHat },
    { value: "10+", label: "Ongoing Projects", icon: Activity },
    { value: "2-3 Days", label: "Average Hiring Response", icon: Clock },
];

export function CareersStatisticsStrip() {
    return (
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16 mt-[-60px] z-20">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.08),0_4px_12px_-4px_rgba(139,58,74,0.04)] border border-gray-100 p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`flex items-center gap-4 ${i !== 0 && i !== 2 ? "pt-6 md:pt-0" : ""} ${i === 2 ? "pt-6 md:pt-0" : ""} px-2 sm:px-6 md:px-8`}
                        >
                            <div className="w-12 h-12 rounded-full bg-[#8B3A4A]/5 flex items-center justify-center flex-shrink-0 border border-[#8B3A4A]/10">
                                <stat.icon className="w-5 h-5 text-[#8B3A4A]" strokeWidth={2} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[22px] md:text-2xl font-extrabold text-gray-900 tracking-tight leading-none mb-1">
                                    {stat.value}
                                </span>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                                    {stat.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
