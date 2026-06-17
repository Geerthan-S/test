import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Clock3,
  Download,
  DraftingCompass,
  HardHat,
  ShieldCheck,
} from "lucide-react";

const whyTrustItems = [
  "Response within 24 Hours",
  "Site Evaluation Available",
  "Project Consultation Included",
] as const;

const trustPills = [
  "ISO Certified",
  "65+ Works Delivered",
  "8 Core Services",
  "Safety First",
] as const;

const features = [
  {
    icon: DraftingCompass,
    title: "Engineering Excellence",
    text: "Technical planning, design coordination and execution controls that keep project decisions grounded in engineering.",
    proof: "65+ works executed",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Compliance",
    text: "ISO-aligned site practices, documentation discipline and safety-first supervision across active work fronts.",
    proof: "ISO certified systems",
  },
  {
    icon: Clock3,
    title: "Reliable Delivery",
    text: "Milestone-led planning, transparent reporting and accountable teams focused on dependable project handover.",
    proof: "Milestone-led handover",
  },
];

export function WhyDockside() {
  return (
    <section className="home-why" id="why-dockside" aria-labelledby="home-why-title">
      <div className="home-why__intro">
        <span>Why clients choose Dockside</span>
        <h2 id="home-why-title">Built For Engineering-Led Project Certainty.</h2>
        <p>
          Dockside supports industrial, commercial and infrastructure owners who need
          disciplined safety standards, controlled execution and reliable delivery
          from planning through handover.
        </p>
        <div className="home-why__actions" aria-label="Dockside enquiry actions">
          <Link href="/contact" className="studio-button studio-button--fill home-why__cta">
            Get A Quote <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <a
            href="/Dockside%20Business%20Profile.pdf"
            download
            className="studio-button studio-button--outline home-why__profile"
          >
            Company Profile <Download className="size-4" aria-hidden="true" />
          </a>
        </div>
        <ul className="cta-trust-strip" aria-label="What to expect after enquiry">
          {whyTrustItems.map((item) => (
            <li key={item}>
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="home-why__trust" aria-label="Dockside trust indicators">
          {trustPills.map((pill) => (
            <span key={pill}>
              <CheckCircle2 aria-hidden="true" />
              {pill}
            </span>
          ))}
        </div>
      </div>

      <div className="home-why__cards" aria-label="Dockside advantages">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const AccentIcon = index === 0 ? Building2 : index === 1 ? HardHat : Award;
          return (
            <article className="home-why-card" key={feature.title}>
              <div className="home-why-card__icon">
                <Icon aria-hidden="true" />
                <AccentIcon aria-hidden="true" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <strong className="home-why-card__proof">{feature.proof}</strong>
            </article>
          );
        })}
      </div>
    </section>
  );
}
