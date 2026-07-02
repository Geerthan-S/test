import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Sparkles,
  Send,
  ShieldCheck,
  BadgeCheck,
  Briefcase,
  TrendingUp,
  Users,
} from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { CareersFilterGrid } from "@/components/careers-filter-grid";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { industrialImages } from "@/lib/content";
import { valueProps, timelineSteps } from "@/lib/careers-data";
import { getJobOpenings, getCareerSetting } from "@/lib/repositories";
import { InternshipButton } from "@/components/internship-button";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Careers | Dockside Constructions",
  description:
    "Build your career at Dockside Constructions. Explore open opportunities for Civil, Site, Planning, QA/QC and Safety Engineers. Real site exposure, professional growth, and safety-first culture.",
  keywords: [
    "Construction careers",
    "Civil Engineer jobs",
    "Site Engineer openings",
    "Dockside Constructions careers",
    "Infrastructure jobs India",
    "Planning Engineer vacancies",
  ],
  openGraph: {
    title: "Careers | Dockside Constructions",
    description:
      "Join a leading infrastructure and industrial civil engineering team. Build landmark projects, learn from veterans, and fast-track your career.",
    type: "website",
  },
};

export default async function CareersPage() {
  const jobOpenings = await getJobOpenings();
  const careerSetting = await getCareerSetting();

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Careers at Dockside Constructions",
    description:
      "Explore professional career pathways for engineers, project managers, and interns in civil and industrial construction.",
    publisher: {
      "@type": "Organization",
      name: "Dockside Constructions Private Limited",
      logo: {
        "@type": "ImageObject",
        url: "https://docksideconstructions.com/favicon-96x96.png",
      },
    },
  };

  return (
    <div className="careers-page-v2">
      {/* ── 1. HERO - REDESIGNED ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={industrialImages.careersHero}
            alt="Dockside Constructions site engineers reviewing project drawings"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-20"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-24 w-full">
          <div className="max-w-[900px]">

            {/* Eyebrow */}
            <RevealText>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[2px] w-12 bg-[#923e4d]" />
                <span className="font-mono text-[11px] tracking-[0.28em] text-[#923e4d] uppercase font-bold">
                  JOIN OUR ENGINEERING LEGACY
                </span>
              </div>
            </RevealText>

            {/* Main Heading with Gradient Text */}
            <RevealText>
              <h1 className="font-display font-extrabold uppercase leading-[0.92] mb-10 tracking-tight">
                <span
                  className="block text-[#1a0a0c]"
                  style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
                >
                  Build Infrastructure
                </span>
                <span
                  className="block bg-gradient-to-r from-[#923e4d] via-[#c95d6f] to-[#923e4d] bg-clip-text text-transparent"
                  style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
                >
                  That Shapes Tomorrow
                </span>
              </h1>
            </RevealText>

            {/* Description */}
            <Reveal delay={0.12}>
              <p className="text-[#2d1a1c]/90 text-[16px] md:text-[17px] leading-[1.75] mb-12 max-w-[680px]">
                Join Dockside Constructions and take technical ownership of high-impact industrial
                facilities, logistics corridors, and civil infrastructure. We don&apos;t just execute
                scopes; we build careers with safety, quality, and discipline.
              </p>

              {/* Key Career Highlights */}
              <div className="grid sm:grid-cols-3 gap-4 mb-12 max-w-[680px]">
                {[
                  { icon: Briefcase, label: "Real Projects, Day One" },
                  { icon: TrendingUp, label: "Clear Career Path" },
                  { icon: Users, label: "Expert Mentorship" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 px-4 py-3 bg-[#923e4d]/5 border border-[#923e4d]/10 backdrop-blur-sm hover:bg-[#923e4d]/10 hover:border-[#923e4d]/30 transition-all duration-300"
                  >
                    <item.icon className="w-4 h-4 text-[#923e4d] flex-shrink-0" />
                    <span className="text-[13px] font-medium text-[#2d1a1c]/90">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#open-positions"
                  className="inline-flex items-center gap-3 bg-[#923e4d] text-white px-8 py-4 font-bold text-[13px] uppercase tracking-[0.1em] hover:bg-[#7a3340] transition-all duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Explore Openings
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-transparent border-2 border-[#923e4d]/30 text-[#923e4d] px-8 py-4 font-bold text-[13px] uppercase tracking-[0.1em] hover:border-[#923e4d] hover:bg-[#923e4d]/5 transition-all duration-300 group"
                >
                  Discuss Your Career
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>

          </div>

          {/* Floating Caption Badge */}
          <Reveal delay={0.18} className="absolute bottom-12 right-12 hidden lg:block">
            <div className="bg-white/95 backdrop-blur-sm px-6 py-4 shadow-2xl max-w-[280px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#923e4d] rounded-full animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                  Engineering Careers
                </span>
              </div>
              <strong className="text-[#0a0204] text-[14px] font-bold block leading-tight">
                Real site exposure from day one.
              </strong>
            </div>
          </Reveal>
        </div>

        {/* Decorative Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 80px, #1a0a0c 80px, #1a0a0c 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, #1a0a0c 80px, #1a0a0c 81px)',
          }}
        />
      </section>

      {/* ── 2. STATS BAR ── */}
      <div className="cv2-stats-bar-wrap">
        <section className="cv2-stats-bar" aria-label="Company proof points">
          <article>
            <div className="cv2-stats-bar__icon">
              <BadgeCheck aria-hidden="true" />
            </div>
            <div className="cv2-stats-bar__text">
              <CountUp
                end={65}
                suffix="+"
                style={{
                  fontFamily: "var(--font-bebas-neue, sans-serif)",
                  fontSize: "52px",
                  color: "#923e4d",
                  lineHeight: "1",
                  letterSpacing: "0.02em",
                  display: "block",
                  fontWeight: "400",
                }}
              />
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: "9px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(26,10,12,0.45)",
                display: "block",
                marginTop: "4px",
              }}>Works Delivered</span>
            </div>
          </article>
          <article>
            <div className="cv2-stats-bar__icon">
              <Sparkles aria-hidden="true" />
            </div>
            <div className="cv2-stats-bar__text">
              <CountUp
                end={8}
                style={{
                  fontFamily: "var(--font-bebas-neue, sans-serif)",
                  fontSize: "52px",
                  color: "#923e4d",
                  lineHeight: "1",
                  letterSpacing: "0.02em",
                  display: "block",
                  fontWeight: "400",
                }}
              />
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: "9px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(26,10,12,0.45)",
                display: "block",
                marginTop: "4px",
              }}>Core Services</span>
            </div>
          </article>
          <article>
            <div className="cv2-stats-bar__icon">
              <Send aria-hidden="true" />
            </div>
            <div className="cv2-stats-bar__text">
              <CountUp
                end={10}
                suffix="+"
                style={{
                  fontFamily: "var(--font-bebas-neue, sans-serif)",
                  fontSize: "52px",
                  color: "#923e4d",
                  lineHeight: "1",
                  letterSpacing: "0.02em",
                  display: "block",
                  fontWeight: "400",
                }}
              />
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: "9px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(26,10,12,0.45)",
                display: "block",
                marginTop: "4px",
              }}>Major Clients</span>
            </div>
          </article>
          <article>
            <div className="cv2-stats-bar__icon">
              <ShieldCheck aria-hidden="true" />
            </div>
            <div className="cv2-stats-bar__text">
              <CountUp
                end={2022}
                style={{
                  fontFamily: "var(--font-bebas-neue, sans-serif)",
                  fontSize: "52px",
                  color: "#923e4d",
                  lineHeight: "1",
                  letterSpacing: "0.02em",
                  display: "block",
                  fontWeight: "400",
                }}
              />
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: "9px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(26,10,12,0.45)",
                display: "block",
                marginTop: "4px",
              }}>Established Year</span>
            </div>
          </article>
        </section>
      </div>

      {/* ── 3. WHY DOCKSIDE? ── */}
      <section className="cv2-section" id="why-dockside">
        <Reveal className="cv2-section__head">
          <span className="cv2-eyebrow">WHY BUILD YOUR FUTURE WITH</span>
          <h2 className="cv2-section__title">DOCKSIDE?</h2>
        </Reveal>

        <div className="cv2-values-grid">
          {valueProps.map((value, idx) => {
            const Icon = value.icon;
            return (
              <Reveal key={idx} delay={idx * 0.06} className="cv2-value-card">
                <div className="cv2-value-card__icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── 4. AVAILABLE POSITIONS ── */}
      <section className="cv2-section cv2-section--positions" id="open-positions">
        <Reveal className="cv2-section__head">
          <span className="cv2-eyebrow">OPEN OPPORTUNITIES</span>
          <h2 className="cv2-section__title cv2-section__title--large">AVAILABLE POSITIONS</h2>
        </Reveal>
        <CareersFilterGrid jobOpenings={jobOpenings} />
      </section>

      {/* ── 5. INTERNSHIP BANNER ── */}
      <section className="cv2-internship" id="internships">
        <div className="cv2-internship__inner">
          <div className="cv2-internship__copy">
            <div className="cv2-internship__tag">
              <GraduationCap aria-hidden="true" />
              Nurturing Civil Talent
            </div>
            <h2>DOCKSIDE ENGINEERING INTERNSHIPS</h2>
            <p>
              Are you a recent graduate or final-year Civil Engineering student? Our intensive
              internship program places you directly under senior site engineers on active ₹10+
              Crore projects. You won&apos;t just observe; you will measure, inspect, record, and
              execute.
            </p>
            <ul className="cv2-internship__bullets">
              <li>
                <strong>Real Site Exposure:</strong> Learn advanced total station setups, DGPS
                surveys, and lab concrete compressive tests.
              </li>
              <li>
                <strong>Structured Mentorship:</strong> Weekly reviews with Project Directors and QA
                leads.
              </li>
              <li>
                <strong>Completion Certificate:</strong> Earn a tier-1 reference letter and site
                certification.
              </li>
            </ul>
            <InternshipButton settings={careerSetting} jobOpenings={jobOpenings} />
          </div>
          <div className="cv2-internship__image">
            <Image
              src={industrialImages.safety}
              alt="Intern learning on-site safety and concrete checks"
              fill
              sizes="(min-width: 1024px) 40vw, 92vw"
            />
          </div>
        </div>
      </section>

      {/* ── 6. HOW WE SELECT ── */}
      <section className="cv2-section" id="process">
        <Reveal className="cv2-section__head cv2-section__head--center">
          <h2 className="cv2-section__title">HOW WE SELECT</h2>
        </Reveal>

        <div className="cv2-process">
          <div className="cv2-process__line" aria-hidden="true" />
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Reveal key={idx} delay={idx * 0.1} className="cv2-process__step">
                <div className="cv2-process__icon">
                  <Icon aria-hidden="true" />
                </div>
                <span className="cv2-process__num">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── 7. FINAL CTA ── */}
      <section className="cv2-cta">
        <div className="cv2-cta__inner">
          <span className="cv2-cta__kicker">JOIN THE FORCE</span>
          <h2>READY TO BUILD YOUR FUTURE?</h2>
          <p>
            We are open to talented individuals. Submit your résumé and our team will be in touch.
          </p>
          <div className="cv2-cta__actions">
            <Link href="#open-positions" className="cv2-btn cv2-btn--fill">
              View Open Roles <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/contact" className="cv2-btn cv2-btn--outline">
              Contact Recruitment Team <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Structured SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </div>
  );
}
