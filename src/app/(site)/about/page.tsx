import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CircleArrowRight,
  ClipboardCheck,
  Download,
  DraftingCompass,
  Factory,
  FileCheck2,
  Handshake,
  HardHat,
  IndianRupee,
  Landmark,
  MapPinned,
  Ruler,
  ShieldCheck,
  Warehouse,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { StatCounter } from "@/components/about-stat-counter";
import { CertificateViewer } from "@/components/certificate-viewer";

export const metadata = {
  title: "About",
  description:
    "Dockside Constructions is an engineering-led infrastructure and construction company delivering industrial, commercial and public-sector projects with disciplined execution.",
};

const stats = [
  { value: "65+", label: "Works Delivered", icon: Building2 },
  { value: "8", label: "Core Service Lines", icon: Wrench },
  { value: "10", label: "Key References", icon: Landmark },
  { value: "20+", label: "Industrial Works", icon: Factory },
  { value: "INR 60+ Cr", label: "Featured Value", icon: BadgeCheck },
  { value: "3", label: "ISO Certifications", icon: ShieldCheck },
] as const;

const pillars = [
  {
    title: "Engineering First",
    text: "Technical review, constructability thinking and method-led planning before execution begins.",
  },
  {
    title: "Execution Discipline",
    text: "Milestone ownership, controlled site coordination and clear reporting across every active front.",
  },
  {
    title: "Long-Term Value",
    text: "Assets are delivered for durability, operating efficiency and dependable long-term use.",
  },
] as const;

// Stats removed from approach cards — they repeat what's already in At a Glance
const approachCards = [
  {
    number: "01",
    title: "ENGINEERING EXCELLENCE",
    bullets: [
      "Structured technical planning",
      "Drawing coordination",
      "Practical problem solving",
      "Value engineering mindset",
    ],
    icon: DraftingCompass,
  },
  {
    number: "02",
    title: "EXECUTION DISCIPLINE",
    bullets: [
      "Planned work sequences",
      "Documentation control",
      "Accountable site supervision",
      "On-time, quality execution",
    ],
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "SAFETY CULTURE",
    bullets: [
      "Safety-first at every level",
      "ISO-aligned processes",
      "Workfront risk assessments",
      "Continuous training & audits",
    ],
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "CLIENT COMMITMENT",
    bullets: [
      "Transparent communication",
      "Reliable delivery",
      "Scope to handover support",
      "Long-term client relationships",
    ],
    icon: Handshake,
  },
] as const;

const approachMetrics = [
  { value: "65+", label: "Works Delivered", icon: Building2 },
  { value: "INR 60+ Cr", label: "Featured Value", icon: IndianRupee },
  { value: "8", label: "Core Service Lines", icon: Wrench },
  { value: "3", label: "ISO Certifications", icon: ShieldCheck },
] as const;

// Added certifier + validThrough fields
const certifications = [
  {
    title: "ISO 9001",
    subtitle: "Quality Management System",
    image: "/certificates/iso-9001-quality-management-system.jpg",
    text: "Quality-led processes for planning, execution, inspection and continuous improvement.",
    certifier: "Bureau Veritas",
    validThrough: "Dec 2026",
  },
  {
    title: "ISO 14001",
    subtitle: "Environmental Management System",
    image: "/certificates/iso-14001-environmental-management-system.jpg",
    text: "Environment-aware project delivery with documented controls for responsible site execution.",
    certifier: "Bureau Veritas",
    validThrough: "Dec 2026",
  },
  {
    title: "ISO 45001",
    subtitle: "Occupational Health & Safety",
    image: "/certificates/iso-45001-occupational-health-and-safety-management-system.jpg",
    text: "Safety-focused systems that support disciplined site practices and workforce protection.",
    certifier: "Bureau Veritas",
    validThrough: "Dec 2026",
  },
] as const;

const aboutImages = {
  heroTeam: "/about-reference/hd-hero-site-team.jpg",
  industrialPlanning: "/about-reference/hd-who-industrial-structure.jpg",
  manufacturing: "/about-reference/hd-industry-manufacturing.jpg",
  logistics: "/about-reference/hd-industry-logistics.jpg",
  commercial: "/about-reference/hd-industry-commercial.jpg",
  governmentInfrastructure: "/about-reference/hd-industry-government.jpg",
  energyInfrastructure: "/about-reference/intro-industrial-building.jpg", // Replaced residential
  institutional: "/about-reference/hd-industry-institutional.jpg",
  // Corporate profile: swapped from generic blueprint → premium site/crane shot
  profileImage: "/about-reference/intro-crane-site.jpg",
  finalCta: "/about-reference/hd-final-cta-construction.jpg",
} as const;

const industries = [
  {
    title: "Industrial Manufacturing",
    image: aboutImages.manufacturing,
    icon: Factory,
  },
  {
    title: "Logistics & Warehousing",
    image: aboutImages.logistics,
    icon: Warehouse,
  },
  {
    title: "Commercial Development",
    image: aboutImages.commercial,
    icon: Building2,
  },
  {
    title: "Government Infrastructure",
    image: aboutImages.governmentInfrastructure,
    icon: Landmark,
  },
  {
    // Replaced "Residential Development" — doesn't match Dockside positioning
    title: "Energy & Utilities Infrastructure",
    image: aboutImages.energyInfrastructure,
    icon: Zap,
  },
  {
    title: "Institutional Projects",
    image: aboutImages.institutional,
    icon: MapPinned,
  },
] as const;

// Added badge field for project status
const projectExperience = [
  {
    title: "Whirlpool India",
    metric: "20+ Works",
    badge: "Repeat Client",
    badgeVariant: "repeat" as const,
    text: "Repeat industrial works across warehouses, utilities, civil works, mezzanine, lab and interior scopes.",
    image: "/about-reference/project-whirlpool.jpg",
  },
  {
    title: "Lodha Industrial Park",
    metric: "INR 50+ Crores",
    badge: "Completed",
    badgeVariant: "completed" as const,
    text: "Large-format earthwork, grading, site development and common infrastructure execution.",
    image: "/about-reference/project-lodha.jpg",
  },
  {
    title: "Adani Logistics",
    metric: "INR 10 Crores",
    badge: "Completed",
    badgeVariant: "completed" as const,
    text: "Logistics infrastructure delivery shaped by controlled planning and industrial site coordination.",
    image: "/about-reference/project-adani.jpg",
  },
  {
    title: "Chennai One IT SEZ",
    metric: "INR 300+ Crores Overall Value",
    badge: "Completed",
    badgeVariant: "completed" as const,
    text: "Commercial campus experience supporting large, high-accountability development environments.",
    image: "/about-reference/project-chennai-one.jpg",
  },
] as const;

const trustCapabilities = [
  { title: "Engineering Leadership", icon: Ruler },
  { title: "Industrial Expertise", icon: Factory },
  { title: "ISO-Certified Systems", icon: FileCheck2 },
  { title: "Infrastructure Capability", icon: Landmark },
  { title: "Safety Culture", icon: ShieldCheck },
  { title: "Reliable Delivery", icon: BadgeCheck },
] as const;

// CTA trust strip items
const ctaTrustItems = [
  "Response within 24 Hours",
  "Free Site Evaluation",
  "Engineering Consultation Included",
] as const;

function AboutSectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`about-premium__section-head about-premium__section-head--${align}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </Reveal>
  );
}

function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="about-premium__icon-badge">
      <Icon aria-hidden="true" />
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="about-premium-page">

      {/* ── 1. HERO ── */}
      <section className="about-premium-hero">
        <div className="about-premium-hero__copy">
          <RevealText>
            <span className="about-premium__eyebrow">ABOUT DOCKSIDE CONSTRUCTIONS</span>
            <h1>
              Built on Trust.
              <br />
              Driven by Execution.
              <br />
              Defined by Results.
            </h1>
          </RevealText>
          <Reveal delay={0.12}>
            <p>
              For over 8 years, Dockside Constructions has partnered with industries, institutions
              and businesses to deliver high-quality construction solutions across Tamil Nadu,
              combining technical expertise with a commitment to lasting value.
            </p>
            <div className="about-premium-hero__actions">
              <a href="#about-snapshot" className="about-premium-button about-premium-button--fill">
                <ArrowRight aria-hidden="true" />
                Our Journey
              </a>
              <Link href="/contact" className="about-premium-button about-premium-button--outline">
                Meet Our Team
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal className="about-premium-hero__media" delay={0.18}>
          <Image
            src={aboutImages.heroTeam}
            alt="Dockside construction team reviewing site drawings"
            fill
            priority
            sizes="(min-width: 1024px) 878vw, 94vw"
          />
          <div className="about-premium-hero__media-caption">
            <span>Engineering review</span>
            <strong>Site teams aligned before execution.</strong>
          </div>
        </Reveal>
      </section>

      {/* ── 2. AT A GLANCE — Animated counters + hover glow ── */}
      <section className="about-premium-section about-premium-snapshot" id="about-snapshot">
        <AboutSectionHeader eyebrow="AT A GLANCE" title="A disciplined construction partner with measurable project proof." align="center" />
        <div className="about-premium-snapshot__grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.label} delay={index * 0.04}>
                <article className="about-premium-stat-card">
                  <IconBadge icon={Icon} />
                  <StatCounter value={stat.value} />
                  <span>{stat.label}</span>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── 3. WHO WE ARE — image height 650px ── */}
      <section className="about-premium-section about-premium-who">
        <Reveal className="about-premium-who__image">
          <Image
            src={aboutImages.industrialPlanning}
            alt="Industrial project planning and construction site"
            fill
            sizes="(min-width: 1024px) 46vw, 94vw"
          />
        </Reveal>
        <div className="about-premium-who__copy">
          <AboutSectionHeader
            eyebrow="WHO WE ARE"
            title="BUILT ON DISCIPLINE. DRIVEN BY ENGINEERING."
            text="Dockside Constructions combines engineering expertise, structured planning and quality-focused execution to deliver dependable infrastructure assets for industrial, commercial and public-sector clients."
          />
          <div className="about-premium-pillars">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.06}>
                <article>
                  <span>{`0${index + 1}`}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. OPERATING PRINCIPLES — stats removed, more breathing room ── */}
      <section className="about-premium-section about-premium-approach">
        <Reveal className="about-premium-approach__header">
          <span>OUR APPROACH</span>
          <h2>
            OPERATING PRINCIPLES THAT KEEP
            <br />
            COMPLEX <strong>PROJECT DELIVERY CONTROLLED.</strong>
          </h2>
          <p>
            Our approach is built on engineering discipline, execution excellence
            and a commitment to safety and client success.
          </p>
        </Reveal>

        <div className="about-premium-approach__timeline">
          {approachCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} className="about-premium-approach__item" delay={index * 0.15}>
                <article className="about-premium-approach-card">
                  <span className="about-premium-approach-card__number">
                    {card.number}
                  </span>
                  <div className="about-premium-approach-card__icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <h3>{card.title}</h3>
                  <i aria-hidden="true" />
                  <ul>
                    {card.bullets.map((bullet) => (
                      <li key={bullet}>
                        <CheckCircle2 aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  {/* Stat block removed — prevents repetition with At a Glance section */}
                </article>
                {index < approachCards.length - 1 ? (
                  <span className="about-premium-approach__connector" aria-hidden="true">
                    <CircleArrowRight />
                  </span>
                ) : null}
              </Reveal>
            );
          })}
        </div>

        <Reveal className="about-premium-approach__metrics" delay={0.62}>
          {approachMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article key={metric.label}>
                <Icon aria-hidden="true" />
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            );
          })}
        </Reveal>
      </section>

      {/* ── 5. ISO CERTIFICATIONS — metadata + click-to-enlarge ── */}
      <section className="about-premium-section about-premium-certifications">
        <AboutSectionHeader
          eyebrow="CERTIFICATIONS"
          title="CERTIFIED SYSTEMS. CONSISTENT STANDARDS."
          text="ISO-aligned systems help Dockside maintain stronger project controls, safety discipline and process accountability."
          align="center"
        />
        <div className="about-premium-certifications__grid">
          {certifications.map((certificate, index) => (
            <Reveal key={certificate.title} delay={index * 0.06}>
              <article className="about-premium-certificate-card">
                {/* Click-to-enlarge via CertificateViewer */}
                <CertificateViewer
                  src={certificate.image}
                  title={certificate.title}
                  subtitle={certificate.subtitle}
                />
                <div>
                  <span>{certificate.subtitle}</span>
                  <h3>{certificate.title}</h3>
                  <p>{certificate.text}</p>
                  {/* Certifier + expiry metadata */}
                  <dl className="about-premium-certificate-card__meta">
                    <div>
                      <dt>Verified &amp; Certified by</dt>
                      <dd>{certificate.certifier}</dd>
                    </div>
                    <div>
                      <dt>Valid Through</dt>
                      <dd>{certificate.validThrough}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 6. SECTOR EXPOSURE — Residential replaced with Energy & Utilities ── */}
      <section className="about-premium-section about-premium-industries">
        <AboutSectionHeader
          eyebrow="INDUSTRIES WE SUPPORT"
          title="Sector exposure across industrial, civic and commercial environments."
          align="center"
        />
        <div className="about-premium-industries__grid">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <Reveal key={industry.title} delay={index * 0.035}>
                <article className="about-premium-industry-card">
                  <Image src={industry.image} alt={`${industry.title} project environment`} fill sizes="(min-width: 1024px) 31vw, 92vw" />
                  <div>
                    <Icon aria-hidden="true" />
                    <h3>{industry.title}</h3>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── 7. PROJECT EXPOSURE — status badges ── */}
      <section className="about-premium-section about-premium-projects">
        <AboutSectionHeader
          eyebrow="PROVEN THROUGH PROJECT EXPERIENCE"
          title="Enterprise-grade project exposure across repeat industrial and infrastructure clients."
          align="center"
        />
        <div className="about-premium-projects__grid">
          {projectExperience.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.05}>
              <article className="about-premium-project-card">
                <div className="about-premium-project-card__image">
                  {/* Status badge */}
                  <span className={`about-premium-project-badge about-premium-project-badge--${project.badgeVariant}`}>
                    {project.badge}
                  </span>
                  <Image src={project.image} alt={`${project.title} project reference`} fill sizes="(min-width: 1024px) 24vw, 92vw" />
                </div>
                <div>
                  <span>{project.metric}</span>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why Clients Choose Dockside */}
      <section className="about-premium-section about-premium-trust">
        <div className="about-premium-trust__copy">
          <AboutSectionHeader
            eyebrow="WHY CLIENTS CHOOSE DOCKSIDE"
            title="Clients choose Dockside when project certainty matters."
            text="Dockside supports industrial, commercial and infrastructure owners who need disciplined safety standards, controlled execution and reliable delivery from planning through handover."
          />
          <Link href="/contact" className="about-premium-button about-premium-button--fill">
            Get A Quote
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="about-premium-trust__grid">
          {trustCapabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Reveal key={capability.title} delay={index * 0.04}>
                <article>
                  <IconBadge icon={Icon} />
                  <h3>{capability.title}</h3>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── 8. CORPORATE PROFILE — swapped to authentic site image ── */}
      <section className="about-premium-section about-premium-profile">
        <Reveal className="about-premium-profile__card">
          <div className="about-premium-profile__image">
            {/* Replaced generic blueprint/stock image with real site/crane shot */}
            <Image src={aboutImages.profileImage} alt="Dockside industrial site — crane and structure overview" fill sizes="(min-width: 1024px) 42vw, 92vw" />
          </div>
          <div className="about-premium-profile__copy">
            <span>Corporate Profile</span>
            <h2>Explore our capabilities, project portfolio and engineering expertise.</h2>
            <a href="/Dockside%20Business%20Profile.pdf" download className="about-premium-button about-premium-button--fill">
              <Download aria-hidden="true" />
              Download Company Profile
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── 9. FINAL CTA — trust strip below buttons ── */}
      <section className="about-premium-section about-premium-final">
        <Reveal className="about-premium-final__card">
          <Image src={aboutImages.finalCta} alt="" fill sizes="100vw" />
          <div>
            <span>Next Project Discussion</span>
            <h2>READY TO DISCUSS YOUR NEXT PROJECT?</h2>
            <p>Connect directly with Dockside&apos;s engineering and project delivery teams.</p>
            <nav>
              <Link href="/contact" className="about-premium-button about-premium-button--fill">
                Get A Quote
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/projects" className="about-premium-button about-premium-button--outline">
                View Projects
                <ArrowRight aria-hidden="true" />
              </Link>
            </nav>
            {/* Trust strip below CTA buttons */}
            <ul className="about-premium-final__trust-strip">
              {ctaTrustItems.map((item) => (
                <li key={item}>
                  <CheckCircle2 aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
