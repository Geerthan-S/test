"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "../ui/magnetic-button";

type HeroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

const heroMetrics = [
  { value: "65+", label: "Works Delivered" },
  { value: "8", label: "Core Services" },
  { value: "3", label: "ISO Certifications" },
];

export function Hero({
  eyebrow = "INDUSTRIAL • COMMERCIAL • INFRASTRUCTURE",
  title = "BUILDING INDUSTRIAL &|INFRASTRUCTURE PROJECTS|THAT LAST FOR GENERATIONS.",
  description = "Delivering industrial facilities, logistics parks, commercial developments and infrastructure projects through disciplined execution, engineering excellence and uncompromising quality.",
  primaryLabel = "VIEW PROJECTS",
  primaryHref = "/projects",
  secondaryLabel = "GET A QUOTE",
  secondaryHref = "/contact",
}: HeroProps) {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleLines = title.split("|").map((line) => line.trim()).filter(Boolean);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.5;
    }

    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-kicker, .hero-line, .hero-copy, .hero-cta-certification, .hero-actions, .hero-large-metric",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  };

  return (
    <section ref={root} className="premium-hero">
      <video
        ref={videoRef}
        className="premium-hero__background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedMetadata={handleVideoLoadedMetadata}
        aria-hidden="true"
      >
        <source src="/bg_video.mp4" type="video/mp4" />
      </video>

      {/* White-to-transparent gradient overlay — left side readable, right shows video */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "linear-gradient(100deg, #ffffff 0%, #ffffff 30%, rgba(255,255,255,0.96) 38%, rgba(255,255,255,0.80) 46%, rgba(255,255,255,0.38) 57%, rgba(255,255,255,0.06) 68%, rgba(255,255,255,0.00) 78%)",
        }}
      />

      <div className="premium-hero__copy">
        <p className="hero-kicker studio-label">{eyebrow}</p>
        <h1>
          {titleLines.map((line, index) => (
            <span
              className={`hero-line ${index === titleLines.length - 1 ? "hero-line--accent" : ""}`}
              key={line}
            >
              {line}
              {index < titleLines.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <p className="hero-copy premium-hero__text">
          {description}
        </p>
        <p className="hero-industry-tag">
          Industrial Facilities&nbsp;•&nbsp;Logistics Parks&nbsp;•&nbsp;Roads &amp; Highways&nbsp;•&nbsp;Electrical Infrastructure&nbsp;•&nbsp;Railway Works
        </p>
        <p className="hero-cta-certification">ISO CERTIFIED</p>
        <div className="hero-actions premium-hero__actions">
          <MagneticButton>
            <Link href={primaryHref} className="studio-button studio-button--fill">
              {primaryLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link href={secondaryHref} className="studio-button studio-button--outline">
              {secondaryLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </MagneticButton>
        </div>
        <div className="hero-large-metrics" aria-label="Dockside delivery metrics">
          {heroMetrics.map((metric) => (
            <div className="hero-large-metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
