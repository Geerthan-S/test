import Link from "next/link";
import Image from "next/image";
import {
  Download,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { DOCKSIDE_LOGO_SRC, Logo } from "@/components/ui/logo";

const companyLinks = [
  ["About Us", "/about"],
  ["Projects", "/projects"],
  ["Careers", "/careers"],
  ["Clients", "/clients"],
  ["Contact Us", "/contact"],
] as const;

const resourceLinks = [
  ["Privacy Policy", "mailto:admin@docksideconstructions.com?subject=Privacy%20Policy"],
  ["Terms & Conditions", "mailto:admin@docksideconstructions.com?subject=Terms%20%26%20Conditions"],
  ["ISO Certification", "/Dockside%20Business%20Profile.pdf"],
  ["Safety Policy", "mailto:admin@docksideconstructions.com?subject=Safety%20Policy"],
  ["Quality Policy", "mailto:admin@docksideconstructions.com?subject=Quality%20Policy"],
  ["Company Profile", "/Dockside%20Business%20Profile.pdf"],
] as const;

export function SiteFooter() {
  return (
    <footer className="industrial-footer" id="site-footer">
      <div className="industrial-footer__main">
        <Image
          src={DOCKSIDE_LOGO_SRC}
          alt=""
          width={420}
          height={420}
          className="industrial-footer__watermark"
          style={{ width: "auto", height: "auto" }}
          aria-hidden="true"
        />

        <div className="industrial-footer__grid">
          <div className="industrial-footer__brand">
            <Logo className="industrial-wordmark--footer" />
            <p className="industrial-footer__tagline">
              Dockside Constructions is a professionally driven infrastructure
              and construction company delivering industrial, commercial and
              public sector projects with engineering excellence and disciplined
              execution.
            </p>

            <a href="/Dockside%20Business%20Profile.pdf" download className="industrial-footer__download">
              <Download aria-hidden="true" />
              Download Company Profile
            </a>

            <div className="industrial-footer__socials" aria-label="Social links">
              <a
                href="https://www.linkedin.com/search/results/companies/?keywords=Dockside%20Constructions"
                target="_blank"
                rel="noreferrer"
                aria-label="Dockside on LinkedIn"
              >
                <Linkedin aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/explore/search/keyword/?q=Dockside%20Constructions"
                target="_blank"
                rel="noreferrer"
                aria-label="Dockside on Instagram"
              >
                <Instagram aria-hidden="true" />
              </a>
              <a href="mailto:admin@docksideconstructions.com" aria-label="Email Dockside">
                <Mail aria-hidden="true" />
              </a>
            </div>
          </div>

          <FooterColumn title="COMPANY" links={companyLinks} />
          <FooterColumn title="RESOURCES" links={resourceLinks} downloadPdfs />

          <div className="industrial-footer__column">
            <h3>LEGAL</h3>
            <nav aria-label="Legal information">
              <span className="industrial-footer__legal-item">
                <strong>CIN</strong>
                U45309TN2022PTC153673
              </span>
              <span className="industrial-footer__legal-item">
                <strong>Registered Office</strong>
                No 58, V.G.P Nagar, Salamedu,<br />Villupuram &ndash; 605401, Tamil Nadu
              </span>
              <span className="industrial-footer__legal-item">
                <strong>Incorporated</strong>
                2022 &middot; Private Limited
              </span>
            </nav>
          </div>

          <div className="industrial-footer__column">
            <h3>CONTACT</h3>
            <nav aria-label="Contact information">
              <a href="tel:+918825922737" className="industrial-footer__legal-item">
                <strong>Phone</strong> +91 88259 22737
              </a>
              <a href="mailto:admin@docksideconstructions.com" className="industrial-footer__legal-item">
                <strong>Email</strong> admin@docksideconstructions.com
              </a>
              <span className="industrial-footer__legal-item">
                <strong>Hours</strong> Mon &ndash; Sat, 9:00 AM &ndash; 6:00 PM
              </span>
              <span className="industrial-footer__legal-item">
                <strong>Address</strong> No 58, V.G.P Nagar, Salamedu, Villupuram &ndash; 605401
              </span>
            </nav>
          </div>
        </div>

        <div className="industrial-footer__bar">
          <span>&copy; 2025 Dockside Constructions Private Limited</span>
          <span className="industrial-footer__bar-mark" aria-hidden="true">
            <Image
              src={DOCKSIDE_LOGO_SRC}
              alt=""
              width={26}
              height={26}
              style={{ width: "auto", height: "auto" }}
            />
          </span>
          <span>Engineering Excellence &bull; Execution Certainty</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  downloadPdfs = false,
}: {
  title: string;
  links: readonly (readonly [string, string])[];
  downloadPdfs?: boolean;
}) {
  return (
    <div className="industrial-footer__column">
      <h3>{title}</h3>
      <nav aria-label={title}>
        {links.map(([label, href]) => {
          const isDownload = downloadPdfs && href.includes(".pdf");

          if (href.startsWith("mailto:")) {
            return (
              <a href={href} key={label}>
                {label}
              </a>
            );
          }

          if (isDownload) {
            return (
              <a href={href} download key={label}>
                {label}
              </a>
            );
          }

          return (
            <Link href={href} key={label}>
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
