import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, PhoneCall, Truck } from "lucide-react";
import { getEquipment, type EquipmentItem } from "@/lib/repositories";
import { EquipmentGridClient } from "@/components/equipment/EquipmentGridClient";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Equipment Fleet | Dockside Constructions",
  description:
    "Explore Dockside Constructions' owned heavy equipment fleet — tipper trucks, excavators, motor graders, vibro rollers, JCB backhoe loaders, and water tankers deployed across all active project sites.",
};

const fleetBadgeMap: Record<string, string> = {
  "tipper-truck": "TIPPER",
  "excavator": "EXCAVATOR",
  "motor-grader": "GRADER",
  "vibro-roller": "ROLLER",
  "jcb-backhoe": "JCB",
  "water-tanker": "TANKER",
};

const fleetDescMap: Record<string, string> = {
  "tipper-truck": "Heavy-duty tipper trucks for bulk material transport and site clearing operations.",
  "excavator": "Hydraulic excavators for earthwork, trenching, and foundation digging.",
  "motor-grader": "Motor graders for road construction, grading, and surface finishing.",
  "vibro-roller": "Vibratory compactors for soil compaction and pavement finishing.",
  "jcb-backhoe": "JCB backhoe loaders for versatile on-site material handling.",
  "water-tanker": "Water tankers for dust suppression, site watering, and hydration.",
};

const fleetCategories = [
  { meta: "FLEET", label: "Tipper Trucks" },
  { label: "Excavators" },
  { label: "Motor Graders" },
  { label: "Vibro Rollers" },
  { label: "JCB Backhoes" },
  { label: "Water Tankers" },
];
export default async function EquipmentFleetPage() {
  const equipment = await getEquipment();

  return (
    <div className="min-h-screen bg-white">

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      {/*
        The section has:
        - enough top padding to clear the fixed site-header
        - enough responsive bottom padding so the absolute-positioned strip
          is fully visible before the next section begins
      */}
      <section
        className="relative overflow-visible bg-white pb-20 md:pb-20"
        style={{ paddingTop: "144px" }}
      >
        {/* ── Background image (full-bleed, behind content) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/hero/fleet-hero-bg.png"
            alt="Dockside heavy equipment fleet at work"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Horizontal fade keeps centre text readable while showing image at sides */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.78) 18%, rgba(255,255,255,0.78) 82%, rgba(255,255,255,0.10) 100%)",
            }}
          />
          {/* Bottom fade to white so the content area merges cleanly */}
          <div
            className="absolute left-0 right-0 bottom-0 h-32"
            style={{
              background: "linear-gradient(to bottom, transparent, #ffffff)",
            }}
          />
        </div>

        {/* ── Hero content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8">

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-8 h-px bg-[#8A3841]/50" />
            <span className="font-display text-[11px] font-bold tracking-[0.2em] text-[#8A3841] uppercase">
              Our Fleet
            </span>
            <span className="w-8 h-px bg-[#8A3841]/50" />
          </div>

          {/* Main heading */}
          <h1
            className="font-display text-center font-extrabold uppercase tracking-wide text-[#8A3841] mb-5 leading-none"
            style={{ fontSize: "clamp(40px, 6vw, 74px)" }}
          >
            Heavy Equipment Fleet
          </h1>

          {/* Sub-copy */}
          <p className="text-gray-600 text-center text-[14px] md:text-[15px] leading-[1.75] max-w-[580px] mx-auto mb-10">
            A modern fleet of heavy equipment maintained for rapid mobilisation,
            operational reliability, and seamless execution across infrastructure
            and civil construction projects.
          </p>

          {/* ── 3 stat columns */}
          <div className="grid grid-cols-3 max-w-[620px] mx-auto items-start mb-14 relative">

            {/* Col 1 – Tipper Trucks */}
            <div className="flex flex-col items-center text-center px-3">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#8A3841] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 18H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2z" />
                <path d="M16 10h4l2 3v3a2 2 0 0 1-2 2h-4v-8z" />
                <circle cx="7.5" cy="18.5" r="2.5" />
                <circle cx="16.5" cy="18.5" r="2.5" />
              </svg>
              <span className="font-display text-[38px] md:text-[50px] font-bold text-[#8A3841] leading-none">50+</span>
              <span className="text-[11px] font-extrabold tracking-wider text-gray-800 uppercase mt-1.5">Tipper Trucks</span>
            </div>

            <div className="absolute left-[33.33%] top-3 bottom-3 w-px bg-gray-200" />

            {/* Col 2 – Heavy Equipment */}
            <div className="flex flex-col items-center text-center px-3">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#8A3841] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 18H2v-2h4v-3h4v3h12v2z" />
                <path d="M6 13V5l5 2 3-3 5 5-7 4" />
              </svg>
              <span className="font-display text-[38px] md:text-[50px] font-bold text-[#8A3841] leading-none">20+</span>
              <span className="text-[11px] font-extrabold tracking-wider text-gray-800 uppercase mt-1.5">Heavy Equipment</span>
            </div>

            <div className="absolute left-[66.66%] top-3 bottom-3 w-px bg-gray-200" />

            {/* Col 3 – Deployment Ready */}
            <div className="flex flex-col items-center text-center px-3">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#8A3841] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 11 2 2 4-4" />
              </svg>
              <span className="font-display text-[38px] md:text-[50px] font-bold text-[#8A3841] leading-none">100%</span>
              <span className="text-[11px] font-extrabold tracking-wider text-gray-800 uppercase mt-1.5">Deployment Ready</span>
            </div>

          </div>
        </div>

        {/* ── Floating category strip — sits at the very bottom, overlapping the gap */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20 flex w-[86%] max-w-[1038px] items-center justify-center gap-3 border border-[#eadcda] bg-[#fffaf8] px-5 py-3 shadow-[0_8px_24px_rgba(88,54,54,0.06)]"
          style={{ bottom: "-20px", borderRadius: "4px" }}
        >
          <span className="relative h-4 w-4 flex-shrink-0">
            <Image
              src="/brand/dockside-company-logo.png"
              alt=""
              fill
              sizes="16px"
              className="object-contain"
            />
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#5f1f29]">
            {fleetCategories.map((category, index) => (
              <span key={category.label} className="inline-flex items-center gap-3">
                <span className="whitespace-nowrap">
                  {index === 0 ? `${category.meta} ` : ""}
                  {category.label}
                </span>
                {index < fleetCategories.length - 1 ? (
                  <span className="text-[#8A3841]/55" aria-hidden="true">
                    •
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EQUIPMENT GRID ══════════════════════════════════════════════════ */}
      <section className="pt-16 pb-16 px-4 md:px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {equipment.length > 0 ? (
            <EquipmentGridClient
              equipment={equipment}
              fleetBadgeMap={fleetBadgeMap}
              fleetDescMap={fleetDescMap}
            />
          ) : (
            <div className="text-center py-24 text-gray-400">
              <Truck className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-sm font-medium">No equipment items found.</p>
              <p className="text-xs mt-1 text-gray-300">Add items from the admin panel.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════════════════ */}
      <section className="fleet-cta-enhanced relative overflow-hidden bg-[#2B1116] px-4 py-16 md:px-8 md:py-20">
        <style>{`
          .fleet-cta-enhanced .fleet-cta-kicker {
            color: rgba(255, 255, 255, 0.78) !important;
          }
          .fleet-cta-enhanced .fleet-cta-title {
            color: #ffffff !important;
          }
          .fleet-cta-enhanced .fleet-cta-copy {
            color: rgba(255, 255, 255, 0.72) !important;
          }
          .fleet-cta-enhanced .fleet-cta-chip {
            color: rgba(255, 255, 255, 0.82) !important;
          }
          .fleet-cta-enhanced .fleet-cta-chip svg {
            color: #ffffff !important;
          }
        `}</style>
        <Image
          src="/hero/fleet-hero-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(43,17,22,0.98),rgba(43,17,22,0.88),rgba(43,17,22,0.72))]" />

        <div className="relative mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-[650px]">
            <div className="mb-5 inline-flex items-center gap-3 border border-white/15 bg-white/7 px-3 py-2">
              <span className="grid h-9 w-9 place-items-center bg-white text-[#8A3841]">
                <Truck className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
              </span>
              <span className="fleet-cta-kicker text-[10px] font-extrabold uppercase tracking-[0.22em]">
                Fleet Mobilisation Desk
              </span>
            </div>

            <h2
              className="fleet-cta-title font-display font-bold uppercase leading-none"
              style={{ fontSize: "clamp(34px, 5vw, 58px)" }}
            >
              Need Fleet Support for Your Next Project?
            </h2>

            <p
              className="fleet-cta-copy mt-5 max-w-[540px] text-[14px] leading-[1.8] md:text-[15px]"
            >
              Share your site requirements and mobilisation schedule. Our team
              will align available tipper trucks, graders, rollers, JCBs and
              tankers for faster deployment.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {["Rapid mobilisation", "Owned equipment", "Site-ready operators"].map((item) => (
                <span
                  key={item}
                  className="fleet-cta-chip inline-flex items-center gap-2 border border-white/14 bg-white/6 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em]"
                >
                  <CheckCircle2
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 md:w-[300px]">
            <Link
              href="/contact"
              className="inline-flex min-h-14 items-center justify-center gap-3 bg-white px-7 text-[11px] font-extrabold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F8EFEA]"
              style={{ borderRadius: "3px", color: "#8A3841" }}
            >
              Request Availability <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <Link
              href="tel:+918925922737"
              className="inline-flex min-h-14 items-center justify-center gap-3 border border-white/22 bg-white/8 px-7 text-[11px] font-extrabold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14"
              style={{ borderRadius: "3px", color: "#ffffff" }}
            >
              <PhoneCall className="h-4 w-4" strokeWidth={2.3} aria-hidden="true" />
              Call Fleet Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
