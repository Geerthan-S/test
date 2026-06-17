import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Factory,
  Landmark,
  Network,
  ShieldCheck,
} from "lucide-react";
import { ClientLogoMarquee } from "@/components/client-logo-marquee";
import { CountUp } from "@/components/ui/CountUp";
import { seedClients } from "@/lib/content";
import { getClients } from "@/lib/repositories";

export const metadata = {
  title: "Clients",
  description:
    "Client proof for Dockside Constructions across industrial manufacturing, logistics, public infrastructure, commercial campuses and institutional projects.",
};

const clientMetrics = [
  { end: 10, suffix: "+", label: "Key Client References", icon: Building2 },
  { end: 5,  suffix: "+", label: "Sectors Served",        icon: Network    },
  { end: 65, suffix: "+", label: "Works Delivered",       icon: ShieldCheck },
  { end: 3,  suffix: "",  label: "ISO Systems",           icon: Landmark   },
];

const sectorProof = [
  {
    title: "Industrial Manufacturing",
    text: "Facility works, utility interfaces, renovations and production-support civil execution.",
    icon: Factory,
  },
  {
    title: "Public Infrastructure",
    text: "Roads, drainage, civic works and accountable delivery for government-linked environments.",
    icon: Landmark,
  },
  {
    title: "Logistics & Commercial Campuses",
    text: "Large-format site development, civil works and operating-ready infrastructure support.",
    icon: Building2,
  },
];

export default async function ClientsPage() {
  const clients = await getClients().catch(() => seedClients);

  return (
    <div className="shot-page shot-page--clients">
      <section className="shot-subhero shot-subhero--clients">
        <div className="shot-subhero__inner">
          <span className="shot-kicker">TRUSTED PARTNERSHIPS</span>
          <h1>
            Trusted by Industry Leaders, Institutions and Public Sector Organizations<em>.</em>
          </h1>
          <p>
            Our client relationships are built on reliability, transparency and consistent project
            delivery. We are proud to support organizations across industrial, commercial and
            infrastructure sectors.
          </p>
          <div className="shot-subhero__actions">
            <Link href="#client-list" className="shot-button shot-button--fill">
              View Client Portfolio <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/contact" className="shot-button shot-button--outline">
              Start a Conversation <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="cv2-stats-bar-wrap">
        <section className="cv2-stats-bar" aria-label="Client proof metrics">
          {clientMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article key={metric.label}>
                <div className="cv2-stats-bar__icon">
                  <Icon aria-hidden="true" />
                </div>
                <div className="cv2-stats-bar__text">
                  <CountUp
                    end={metric.end}
                    suffix={metric.suffix}
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
                    fontFamily: "var(--font-dm-mono, monospace)",
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "rgba(26,10,12,0.45)",
                    display: "block",
                    marginTop: "4px",
                  }}>{metric.label}</span>
                </div>
              </article>
            );
          })}
        </section>
      </div>

      <section className="clients-logo-section">
        <span>Client References</span>
        <h2>Organizations and sectors represented in Dockside&apos;s delivery record.</h2>
        <ClientLogoMarquee clients={clients} />
      </section>

      <section className="clients-grid-section" aria-labelledby="clients-grid-title">
        <div>
          <span>Delivery Context</span>
          <h2 id="clients-grid-title">Built for owners who value accountable execution.</h2>
          <p>
            The client mix reflects Dockside&apos;s ability to coordinate civil,
            infrastructure and industrial scopes across different operating environments.
          </p>
        </div>
        <div className="clients-sector-grid">
          {sectorProof.map((sector) => {
            const Icon = sector.icon;
            return (
              <article key={sector.title}>
                <Icon aria-hidden="true" />
                <h3>{sector.title}</h3>
                <p>{sector.text}</p>
              </article>
            );
          })}
        </div>
      </section>



      <section className="clients-reference-grid" id="client-list" aria-label="Client list">
        {clients.map((client) => {
          const caseStudySlugs: Record<string, string> = {
            "whirlpool-of-india": "whirlpool-industrial-works-program",
            "lodha-industrial-park": "lodha-industrial-park-chennai",
            "adani-logistics-limited": "adani-logistics-civil-structural-works",
            "chennai-one-it-sez": "chennai-one-it-sez-land-development",
          };
          const projectSlug = caseStudySlugs[client.slug];
          const isKeyPartner = ["whirlpool-of-india", "pwd-puducherry", "tahdco"].includes(client.slug);
          
          return (
            <article key={client.slug} className="client-card">
              <div className="client-card__logo-wrap">
                {client.logoUrl ? (
                  <Image
                    src={client.logoUrl}
                    alt={`${client.name} logo`}
                    width={220}
                    height={90}
                    className="client-card__logo"
                  />
                ) : (
                  <strong className="client-card__name-fallback">{client.name}</strong>
                )}
              </div>
              <div className="client-card__content">
                {isKeyPartner && (
                  <div className="client-card__badge">
                    Key Reference Partner
                  </div>
                )}
                <h3 className="client-card__title">{client.name}</h3>
                {client.industry ? <span className="client-card__industry">{client.industry}</span> : null}
                {client.testimonial ? (
                  <p className="client-card__description">{client.testimonial}</p>
                ) : null}
                {projectSlug ? (
                  <Link href={`/projects/${projectSlug}`} className="client-card__link">
                    View Case Study <ArrowRight aria-hidden="true" />
                  </Link>
                ) : (
                  <Link href="/projects" className="client-card__link">
                    View Projects <ArrowRight aria-hidden="true" />
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {/* ── FULL-WIDTH CTA SECTION ── */}
      <section className="clients-final-cta-v2">
        <div className="clients-final-cta-v2__inner">
          <span className="clients-final-cta-v2__kicker">BECOME A PARTNER</span>
          <h2>Ready to build with high site control?</h2>
          <p>
            Join leading industrial manufacturers, logistics developers and public institutions partnering with Dockside.
          </p>
          <Link href="/contact" className="clients-final-cta-v2__btn">
            Start Your Project <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
