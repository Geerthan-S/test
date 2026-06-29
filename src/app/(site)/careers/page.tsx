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
      {/* ── 1. HERO ── */}
      <section className="about-premium-hero">
        <div className="about-premium-hero__copy">
          <RevealText>
            <span className="about-premium__eyebrow">JOIN OUR ENGINEERING LEGACY</span>
            <h1>
              Build Infrastructure
              <br />
              That Shapes Tomorrow.
            </h1>
          </RevealText>
          <Reveal delay={0.12}>
            <p>
              Join Dockside Constructions and take technical ownership of high-impact industrial
              facilities, logistics corridors, and civil infrastructure. We don&apos;t just execute
              scopes; we build careers with safety, quality, and discipline.
            </p>
            <div className="about-premium-hero__actions">
              <Link
                href="#open-positions"
                className="about-premium-button about-premium-button--fill"
              >
                <ArrowRight aria-hidden="true" />
                Explore Openings
              </Link>
              <Link href="/contact" className="about-premium-button about-premium-button--outline">
                Discuss Your Career
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal className="about-premium-hero__media" delay={0.18}>
          <Image
            src={industrialImages.careersHero}
            alt="Dockside Constructions site engineers reviewing project drawings"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
          <div className="about-premium-hero__media-caption">
            <span>Engineering careers</span>
            <strong>Real site exposure from day one.</strong>
          </div>
        </Reveal>
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
