import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function ContactCTA() {
  return (
    <section id="contact" className="contact-cta-section" aria-label="Contact Dockside Constructions">
      <div className="contact-cta-section__inner">
        <div className="contact-cta-section__content">
          <span className="contact-cta-section__eyebrow">Let&apos;s Build Together</span>
          <h2>
            Looking for a Reliable<br />
            Infrastructure Partner?
          </h2>
          <p>
            From industrial facilities to highway infrastructure — Dockside brings disciplined execution,
            ISO-certified systems and transparent delivery to every project.
          </p>
          <div className="contact-cta-section__actions">
            <Link href="/contact" className="cta-btn cta-btn--primary">
              Get In Touch <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a href="tel:+918825922737" className="cta-btn cta-btn--outline">
              <Phone className="size-4" aria-hidden="true" />
              +91 88259 22737
            </a>
          </div>
        </div>
        <div className="contact-cta-section__stat-strip" aria-hidden="true">
          <div className="cta-stat">
            <strong>₹250Cr+</strong>
            <span>Projects Delivered</span>
          </div>
          <div className="cta-stat">
            <strong>10+</strong>
            <span>Years Experience</span>
          </div>
          <div className="cta-stat">
            <strong>3× ISO</strong>
            <span>Certified</span>
          </div>
          <div className="cta-stat">
            <strong>100%</strong>
            <span>Owned Fleet</span>
          </div>
        </div>
      </div>
    </section>
  );
}
