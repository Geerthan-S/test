import Link from "next/link";
import {
  Award,
  CheckCircle2,
  ClipboardCheck,
  HardHat,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { getSiteSettings } from "@/lib/repositories";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Quality & Safety | Dockside Constructions",
  description:
    "Dockside Constructions holds triple ISO certification (9001, 14001, 45001) backed by active compliance systems and rigorous site safety procedures.",
};

const certifications = [
  {
    code: "ISO 9001:2015",
    title: "Quality Management",
    description:
      "Systematic approach to quality — every process documented, measured and continuously improved to deliver consistent project excellence.",
    icon: Award,
  },
  {
    code: "ISO 14001:2015",
    title: "Environmental Management",
    description:
      "Responsible site management that minimises environmental impact across all project phases, from groundbreaking to handover.",
    icon: ShieldCheck,
  },
  {
    code: "ISO 45001:2018",
    title: "Occupational Safety & Health",
    description:
      "Workers go home safe. Every site operates under a structured occupational safety management system with zero-compromise enforcement.",
    icon: HardHat,
  },
];

const safetyProcedures = [
  "Daily toolbox talks before every shift",
  "Site-specific HSE plans and method statements",
  "PPE compliance enforced at all entry points",
  "Weekly safety audits and non-conformance reporting",
  "Incident investigation and corrective action tracking",
  "Emergency evacuation and first aid protocols",
  "Subcontractor safety induction and compliance checks",
  "Monthly HIRA (Hazard Identification & Risk Assessment) reviews",
  "Near-miss reporting and lessons-learned documentation",
  "Noise, dust and vibration monitoring on sensitive sites",
];

const complianceItems = [
  "BOCW Act Compliance",
  "Workmen Compensation Insurance",
  "PF & ESI for all workers",
  "Labour Licence & Contract compliance",
  "Statutory registers maintained on site",
  "Contractor License (Class I & II)",
  "Environmental clearances where applicable",
];

const qualityProcesses = [
  "Incoming material inspection and testing",
  "In-process quality checks at every milestone",
  "Third-party inspection for critical components",
  "As-built documentation and quality records",
  "Internal audit programme and management review",
  "Supplier evaluation and approved vendor register",
];

export default async function QualityAndSafetyPage() {
  const settings = await getSiteSettings();
  const qualityPolicy =
    settings["quality_policy"] ||
    "At Dockside Constructions, we are committed to delivering projects that meet or exceed client expectations through disciplined execution, continuous improvement, and adherence to the highest quality standards. Our ISO 9001:2015 certified management system ensures that quality is built into every process — from initial planning through to project handover.";
  const safetyPolicy =
    settings["safety_policy"] ||
    "The safety of our workers, clients, and communities is our highest priority. We operate under a zero-compromise safety culture supported by ISO 45001:2018 occupational health and safety management systems. Every worker on a Dockside site is equipped, trained, and empowered to stop any unsafe act.";

  return (
    <div className="qs-page">
      {/* Page Hero */}
      <section className="qs-hero">
        <div className="qs-hero__inner">
          <span className="qs-hero__eyebrow">Standards We Hold</span>
          <h1>Quality &amp; Safety</h1>
          <p>
            Triple ISO certification backed by active compliance systems — not certificates on a
            wall, but working processes enforced on every site, every day.
          </p>
          <div className="qs-hero__badges">
            {certifications.map((cert) => (
              <span key={cert.code} className="qs-iso-badge">
                {cert.code}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ISO Certifications */}
      <section className="qs-certs-section">
        <div className="qs-section__inner">
          <div className="qs-section__head">
            <h2>ISO Certifications</h2>
            <p>Three globally recognised management systems working together on every project.</p>
          </div>
          <div className="cert-grid">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <article key={cert.code} className="cert-card">
                  <div className="cert-card__icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <div className="cert-card__body">
                    <span className="cert-card__code">{cert.code}</span>
                    <h3>{cert.title}</h3>
                    <p>{cert.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Policy */}
      <section className="qs-policy-section qs-policy-section--quality">
        <div className="qs-section__inner qs-policy-grid">
          <div className="qs-policy-text">
            <span className="qs-policy-kicker">
              <Award className="size-4" aria-hidden="true" /> Quality Policy
            </span>
            <h2>Our Commitment to Quality</h2>
            <p>{qualityPolicy}</p>
          </div>
          <div className="qs-policy-checklist">
            <h3>
              <ClipboardCheck aria-hidden="true" /> Quality Control Processes
            </h3>
            <ul>
              {qualityProcesses.map((item) => (
                <li key={item}>
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Safety Policy */}
      <section className="qs-policy-section qs-policy-section--safety">
        <div className="qs-section__inner qs-policy-grid">
          <div className="qs-policy-text">
            <span className="qs-policy-kicker">
              <HardHat className="size-4" aria-hidden="true" /> Safety Policy
            </span>
            <h2>Zero Compromise on Safety</h2>
            <p>{safetyPolicy}</p>
          </div>
          <div className="qs-policy-checklist">
            <h3>
              <ClipboardCheck aria-hidden="true" /> Site Safety Procedures
            </h3>
            <ul>
              {safetyProcedures.map((item) => (
                <li key={item}>
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Statutory Compliance */}
      <section className="qs-compliance-section">
        <div className="qs-section__inner">
          <div className="qs-section__head">
            <h2>Statutory Compliance</h2>
            <p>
              Full compliance with all applicable labour, environmental and safety legislation across
              every project site.
            </p>
          </div>
          <div className="qs-compliance-grid">
            {complianceItems.map((item) => (
              <div key={item} className="qs-compliance-item">
                <ShieldCheck className="size-5" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="qs-compliance-badge">
            <ShieldCheck aria-hidden="true" />
            <div>
              <strong>Zero compromise on compliance</strong>
              <p>All statutory obligations maintained across every project site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fleet-cta">
        <div className="fleet-cta__inner">
          <h2>Need Our Quality Certificates?</h2>
          <p>
            Download our ISO certificates and compliance documents from our Downloads page, or
            contact us directly.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/downloads" className="cta-btn cta-btn--primary">
              Downloads <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="cta-btn cta-btn--outline">
              Contact Us <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
