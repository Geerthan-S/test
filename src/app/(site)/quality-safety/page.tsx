"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  ArrowRight,
  ShieldCheck,
  FileText,
  Wrench,
  Zap,
  Flame,
  ShieldAlert,
  ArrowUpFromLine,
  Truck,
  ClipboardCheck,
  FlaskConical,
  HardHat,
  FolderOpen,
  Award,
} from "lucide-react";
import { CertificateGrid } from "./CertificateGrid";
import { QualityInspectionStep } from "@/components/quality-safety/QualityInspectionStep";

export const dynamic = "force-dynamic";

const safetyTalks = [
  {
    title: "Working at Heights",
    desc: "Rigorous safety harness compliance, guardrail installations, and scaffold integrity inspections.",
    icon: ArrowUpFromLine,
    stat: "100%",
    statLabel: "Harness Compliance",
  },
  {
    title: "Equipment Safety",
    desc: "Pre-operational checks, exclusion zone enforcement, and certified heavy machinery operators.",
    icon: Truck,
    stat: "Daily",
    statLabel: "Operator Checks",
  },
  {
    title: "Electrical Safety",
    desc: "Insulated tools verification, temporary wiring compliance, and lockout/tagout (LOTO) protocols.",
    icon: Zap,
    stat: "LOTO",
    statLabel: "Protocol Enforced",
  },
  {
    title: "Excavation Safety",
    desc: "Soil profiling, shoring and trench protection, and underground utility clearance checking.",
    icon: Wrench,
    stat: "Zero",
    statLabel: "Trench Incidents",
  },
  {
    title: "Fire Prevention",
    desc: "Hot work permit enforcement, firefighting equipment checks, and combustible separation.",
    icon: Flame,
    stat: "100%",
    statLabel: "Permit Coverage",
  },
  {
    title: "Incident Prevention",
    desc: "Near-miss reporting, hazard logging, and immediate root-cause mitigation procedures.",
    icon: ShieldAlert,
    stat: "Active",
    statLabel: "Reporting System",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Material Receipt",
    desc: "Verification and testing of incoming construction materials against approved technical specifications.",
    icon: FlaskConical,
  },
  {
    step: "02",
    title: "Site Preparation",
    desc: "Site preparation inspections, layout markers verification, and safety checklist completion before work starts.",
    icon: ClipboardCheck,
  },
  {
    step: "03",
    title: "Work-In-Progress",
    desc: "Stage-wise audits during structural execution, concrete pours, reinforcing layout, and earthwork stages.",
    icon: HardHat,
  },
  {
    step: "04",
    title: "Consultant Sign-off",
    desc: "Collaborative checks with project consultants to secure necessary phase approvals and sign-offs.",
    icon: FileText,
  },
  {
    step: "05",
    title: "Final Inspection",
    desc: "Comprehensive visual and dimensional verification, commissioning checks, and snag-list closure.",
    icon: ShieldCheck,
  },
  {
    step: "06",
    title: "Project Handover",
    desc: "Verification of all quality registers, preparation of as-built records, and official client handover.",
    icon: Award,
  },
];

const materialTests = [
  {
    title: "Concrete Testing",
    desc: "Regular casting of cubes for compressive strength verification, slump tests, and thermal monitoring.",
    standard: "IS 516",
  },
  {
    title: "Reinforcement Steel Testing",
    desc: "Tensile strength checks, elongation, bend tests, and physical dimension verification against IS standards.",
    standard: "IS 1786",
  },
  {
    title: "Aggregate Testing",
    desc: "Sieve grading analysis, aggregate impact values, flakiness indices, and moisture level verification.",
    standard: "IS 2386",
  },
  {
    title: "Brick & Block Verification",
    desc: "Compressive load resistance testing, dimension consistency mapping, and water absorption checks.",
    standard: "IS 3077",
  },
  {
    title: "Water Quality Testing",
    desc: "Chemical testing of construction water to verify neutral pH, salinity limits, and organic impurity thresholds.",
    standard: "IS 456",
  },
  {
    title: "Supplier Certification Review",
    desc: "Regular validation of manufacturer mill certificates, third-party lab checks, and origin audits.",
    standard: "ISO 9001",
  },
];


/* ── animation variants ────────────────────────────────────── */

const sectionFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
};

export default function QualityAndSafetyPage() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  return (
    <div className="bg-white min-h-screen">

      {/* ── 1. HERO SECTION ── */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ background: "#0d0406" }}
      >
        {/* Background Image */}
        <Image
          src="/home-reference/about-site-supervision.jpg"
          alt="Dockside construction site quality inspection"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark maroon gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,2,4,0.78) 0%, rgba(90,20,30,0.62) 50%, rgba(10,2,4,0.85) 100%)",
          }}
        />
        {/* Subtle diagonal texture overlay */}
        <div
          className="absolute inset-0 z-10 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
          }}
        />

        {/* Content */}
        <div className="relative z-20 max-w-[900px] mx-auto text-center px-4 pt-[15vh] flex flex-col items-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6" data-text-reveal>
            <div className="h-px w-8 bg-white/40" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-white/80 uppercase font-bold">
              Quality &amp; Safety
            </span>
            <div className="h-px w-8 bg-white/40" />
          </div>

          <h1
            data-text-reveal
            className="font-display text-white font-extrabold uppercase leading-none mb-6 tracking-wide"
            style={{ fontSize: "clamp(38px, 5.5vw, 72px)" }}
          >
            Quality Built Into
            <br />
            <span style={{ color: "#f0c9cc" }}>Every Process</span>
          </h1>

          <p data-text-reveal className="text-white/80 max-w-[620px] mx-auto text-[14px] md:text-[15px] leading-[1.8] mb-10">
            Delivering projects through internationally aligned standards, rigorous
            inspections, material verification, and a proactive safety culture.
          </p>

          {/* Certification Pills */}
          <div data-stagger-reveal className="flex flex-wrap justify-center gap-3">
            {["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018"].map((pill) => (
              <span
                key={pill}
                className="bg-white/10 border border-white/25 text-white font-mono text-[10px] md:text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ── 2. ISO STANDARDS (ACTUAL CERTIFICATES) ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-white border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center mb-16">
            <span data-text-reveal className="font-mono text-[11px] tracking-[0.2em] text-[#8A3841] uppercase block mb-3 font-bold">
              Certifications &amp; Systems
            </span>
            <h2 data-text-reveal className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-4">
              International Standards We Follow
            </h2>
            <p data-text-reveal className="text-gray-500 max-w-[640px] mx-auto text-[13.5px] leading-[1.75]">
              Dockside Constructions operates under globally recognised management systems that ensure
              quality delivery, environmental responsibility, and occupational health &amp; safety across every project.
            </p>
          </div>
          <CertificateGrid />
        </div>
      </section>


      {/* ── 3. KPI STATS STRIP ── */}
      <section className="py-0 bg-[#8A3841]">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/15">
          {[
            { val: "Triple", unit: "ISO Certified", label: "9001 · 14001 · 45001" },
            { val: "100%", unit: "Quality Audits", label: "Every stage, every site" },
            { val: "Zero", unit: "Accident Culture", label: "Proactive safety mandate" },
          ].map((kpi) => (
            <div key={kpi.unit} className="py-10 px-8 text-center text-white">
              <div className="font-display text-4xl md:text-5xl font-extrabold leading-none mb-2 uppercase" style={{ color: "#f8e0e2" }}>
                {kpi.val}
              </div>
              <div className="font-mono text-[12px] font-bold tracking-widest uppercase text-white mb-1">
                {kpi.unit}
              </div>
              <div className="text-[12px] text-white/60">
                {kpi.label}
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── 4. DAILY SAFETY BRIEFING ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-[#fdfaf7] border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <div className="relative overflow-hidden bg-gray-100 group">
            <div className="aspect-[4/3] relative">
              <Image
                src="/about-reference/hd-hero-site-team.jpg"
                alt="Dockside team attending morning safety briefing"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 46vw, 92vw"
              />
              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {/* Floating label */}
              <div className="absolute bottom-4 left-4 bg-[#8A3841] text-white font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1.5">
                Daily Site Start
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span data-text-reveal className="font-mono text-[11px] tracking-[0.2em] text-[#8A3841] uppercase block mb-3 font-bold">
              Mandatory Site Start
            </span>
            <h2 data-text-reveal className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-6">
              Daily Safety Briefing
            </h2>
            <p data-text-reveal className="text-gray-600 text-[15px] leading-[1.8] mb-8">
              Every shift begins with a structured safety briefing to review work activities, site
              conditions, hazards, and preventive measures before execution begins.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Daily work scope review",
                "Hazard identification",
                "PPE verification",
                "Equipment readiness checks",
                "Emergency response awareness",
                "Workforce responsibility allocation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 p-3 bg-white border border-gray-100 hover:border-[#8A3841]/25 transition-colors duration-200">
                  <CheckCircle2 className="w-4 h-4 text-[#8A3841] mt-0.5 flex-shrink-0" />
                  <span className="text-[13px] font-semibold text-gray-700 leading-tight">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* ── 5. TOOLBOX TALKS ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-white border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center mb-16">
            <span data-text-reveal className="font-mono text-[11px] tracking-[0.2em] text-[#8A3841] uppercase block mb-3 font-bold">
              Continual Learning
            </span>
            <h2 data-text-reveal className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-4">
              Toolbox Talks
            </h2>
            <p data-text-reveal className="text-gray-500 max-w-[560px] mx-auto text-[13.5px] leading-[1.75]">
              Regular toolbox talks reinforce safe work practices and improve safety awareness across all teams working on site.
            </p>
          </div>

          <div data-stagger-reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-100">
            {safetyTalks.map((talk, idx) => {
              const Icon = talk.icon;
              return (
                <div
                  key={talk.title}
                  className="group relative p-7 bg-white hover:bg-[#8A3841] border-b border-r border-gray-100 last:border-r-0 transition-all duration-400 overflow-hidden cursor-default flex flex-col"
                  style={{
                    borderRight: (idx + 1) % 3 === 0 ? "none" : undefined,
                    borderBottom: idx >= 3 ? "none" : undefined,
                  }}
                >
                  {/* Top maroon accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-transparent group-hover:bg-white/30 transition-colors duration-300" />

                  {/* Background watermark number */}
                  <span className="absolute right-4 top-4 font-display text-6xl font-extrabold text-gray-50 group-hover:text-white/5 leading-none select-none pointer-events-none transition-colors duration-300">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-11 h-11 bg-[#8A3841]/8 text-[#8A3841] group-hover:bg-white/15 group-hover:text-white mb-5 transition-all duration-300">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>

                  {/* Stat badge */}
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="font-display text-2xl font-extrabold text-[#8A3841] group-hover:text-white leading-none transition-colors duration-300">
                      {talk.stat}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-gray-400 group-hover:text-white/60 tracking-widest uppercase transition-colors duration-300">
                      {talk.statLabel}
                    </span>
                  </div>

                  <h3 className="font-display text-[15px] font-extrabold uppercase tracking-wide text-gray-900 group-hover:text-white mb-2.5 transition-colors duration-300">
                    {talk.title}
                  </h3>

                  <p className="text-[13px] leading-[1.7] text-gray-500 group-hover:text-white/75 transition-colors duration-300">
                    {talk.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ── 6. QUALITY INSPECTION PROCESS ── */}
      <motion.section
        className="py-24 px-6 md:px-12 lg:px-16 bg-[#fdfaf7] border-b border-gray-100"
        initial={initial}
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={sectionFade}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={headerVariants}
          >
            <span data-text-reveal className="font-mono text-[11px] tracking-[0.2em] text-[#8A3841] uppercase block mb-3 font-bold">
              Execution Control
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-4">
              Quality Inspection Process
            </h2>
          </motion.div>

          <motion.p
            className="text-gray-500 max-w-[560px] mx-auto text-[14px] leading-[1.75] text-center mb-16"
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={subtitleVariants}
          >
            A structured, step-by-step verification pipeline enforcing specifications and controls at every phase.
          </motion.p>

          {/* Timeline with animated steps */}
          <div className="project-delivery__stage">
            <motion.ol
              className="project-delivery__steps"
              aria-label="Quality inspection process steps"
              initial={initial}
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={staggerContainer}
            >
              {processSteps.map((step, index) => (
                <QualityInspectionStep
                  key={step.step}
                  number={step.step}
                  title={step.title}
                  description={step.desc}
                  icon={step.icon}
                  index={index}
                />
              ))}
            </motion.ol>
          </div>
        </div>
      </motion.section>


      {/* ── 7. MATERIAL TESTING ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-white border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <span data-text-reveal className="font-mono text-[11px] tracking-[0.2em] text-[#8A3841] uppercase block mb-3 font-bold">
                Lab &amp; Site Tests
              </span>
              <h2 data-text-reveal className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900">
                Material Testing &amp; Verification
              </h2>
            </div>
            <p data-text-reveal className="text-gray-500 max-w-[400px] text-[14px] leading-[1.75] lg:text-right">
              All critical construction materials undergo testing and verification to ensure compliance with project specifications.
            </p>
          </div>

          <div data-stagger-reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {materialTests.map((test, idx) => (
              <div
                key={test.title}
                className="group relative bg-white border border-gray-100 hover:border-[#8A3841]/30 hover:shadow-[0_16px_44px_rgba(138,56,65,0.10)] transition-all duration-300 overflow-hidden"
              >
                {/* Full-height left accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8A3841]/20 group-hover:bg-[#8A3841] transition-all duration-300" />

                <div className="pl-6 pr-6 pt-6 pb-6">
                  {/* Standard badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] font-bold text-gray-300 tracking-widest uppercase">
                      Lab Verification
                    </span>
                    <span className="font-mono text-[11px] font-bold text-[#8A3841] tracking-wider bg-[#8A3841]/6 px-2 py-0.5">
                      {test.standard}
                    </span>
                  </div>

                  {/* Index number watermark */}
                  <span className="absolute right-5 bottom-4 font-display text-5xl font-extrabold text-gray-50 group-hover:text-[#8A3841]/5 leading-none select-none transition-colors duration-300">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-display text-[16px] font-extrabold uppercase tracking-wide text-gray-900 mb-2.5 group-hover:text-[#8A3841] transition-colors duration-300">
                    {test.title}
                  </h3>
                  <p className="text-[13px] leading-[1.75] text-gray-500">
                    {test.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. COMMITMENT SECTION ── */}
      <section className="relative py-24 px-6 md:px-12 lg:px-16 bg-[#8A3841] text-white overflow-hidden">
        {/* Decorative background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)",
          }}
        />

        <div className="relative z-10 max-w-[1000px] mx-auto text-center">
          <span data-text-reveal className="font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase block mb-3 font-bold">
            Our Core Promise
          </span>
          <h2 data-text-reveal className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6">
            Our Commitment
          </h2>
          <p data-text-reveal className="text-white/80 text-[14px] md:text-[15px] leading-[1.8] max-w-[680px] mx-auto mb-14">
            Quality and safety are integrated into every stage of planning, procurement, execution, inspection, testing, and project handover.
          </p>

          <div data-stagger-reveal className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[800px] mx-auto text-left">
            {[
              "International Standards",
              "Daily Site Briefings",
              "Material Verification",
              "Zero Compliance Gaps",
              "Complete Documentation",
              "Safety-First Culture",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-white/8 border border-white/15 px-4 py-3 hover:bg-white/15 transition-colors duration-200"
              >
                <CheckCircle2 className="w-4 h-4 text-white/90 flex-shrink-0" />
                <span className="text-[11px] font-bold tracking-wider uppercase text-white/90">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 10. CTA SECTION ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-white border-t border-gray-100">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <div data-text-reveal className="inline-flex items-center justify-center w-14 h-14 border border-gray-200 bg-gray-50 mb-6 text-[#8A3841]">
              <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <h2 data-text-reveal className="font-display text-3xl md:text-4xl font-bold uppercase text-gray-900 mb-4 tracking-wide">
              Need More Information?
            </h2>
            <p data-text-reveal className="text-gray-500 text-[14px] leading-[1.75] max-w-[460px]">
              Contact our team to learn more about our quality management and safety practices, or download our company profile.
            </p>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-[#8A3841] text-white font-mono text-[11px] font-bold tracking-widest uppercase px-7 py-4 hover:bg-[#6D2B32] transition-colors duration-200"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/dockside-business-profile.pdf"
              download
              className="inline-flex items-center gap-2.5 border border-gray-200 text-gray-800 bg-white font-mono text-[11px] font-bold tracking-widest uppercase px-7 py-4 hover:border-[#8A3841] hover:text-[#8A3841] transition-colors duration-200"
            >
              Download Profile <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
