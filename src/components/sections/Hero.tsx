"use client";

import { useEffect, useRef, useState } from "react";
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
  { value: "25+", label: "Projects Delivered" },
  { value: "100 CR+", label: "Project Exposure" },
  { value: "5,00,000+ m³", label: "Earthwork Executed" },
  { value: "10+", label: "Major Clients" },
];

const heroSlides = [
  {
    src: "/hero/hero-industrial-park.jpg",
    alt: "Aerial view of Dockside industrial park development at sunset",
  },
  {
    src: "/hero/hero-earthwork.jpg",
    alt: "Dockside earthwork and site preparation with heavy machinery at sunset",
  },
  {
    src: "/hero/hero-it-park.jpg",
    alt: "Aerial view of completed IT park commercial campus at dusk",
  },
];

const SLIDE_DURATION = 5500; // ms each slide stays visible
const TRANSITION_DURATION = 1.4; // seconds for crossfade

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const nextLayerRef = useRef<HTMLDivElement>(null);
  const currentLayerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTransitioning = useRef(false);
  const titleLines = title.split("|").map((line) => line.trim()).filter(Boolean);

  // Entry animations for text
  useEffect(() => {
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

  // Ken Burns + crossfade slideshow
  useEffect(() => {
    const advance = () => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;

      const next = (currentIndex + 1) % heroSlides.length;
      setNextIndex(next);

      // After next image is rendered, crossfade in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const nextEl = nextLayerRef.current;
          if (!nextEl) {
            isTransitioning.current = false;
            return;
          }

          // Start: next layer hidden, already has Ken Burns scale start
          gsap.set(nextEl, { opacity: 0 });
          gsap.to(nextEl, {
            opacity: 1,
            duration: TRANSITION_DURATION,
            ease: "power2.inOut",
            onComplete: () => {
              setCurrentIndex(next);
              setNextIndex(null);
              isTransitioning.current = false;
            },
          });
        });
      });
    };

    intervalRef.current = setInterval(advance, SLIDE_DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  return (
    <section ref={root} className="premium-hero">

      {/* ── Slideshow Background ── */}
      <div className="hero-slideshow" aria-hidden="true">
        {/* Current slide — always fully visible */}
        <div
          ref={currentLayerRef}
          className="hero-slide hero-slide--current hero-slide--kenburns"
          key={`current-${currentIndex}`}
          style={{ position: "absolute", inset: 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroSlides[currentIndex].src}
            alt={heroSlides[currentIndex].alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
            className="hero-slide__img"
          />
        </div>

        {/* Next slide — fades in on top */}
        {nextIndex !== null && (
          <div
            ref={nextLayerRef}
            className="hero-slide hero-slide--next hero-slide--kenburns"
            key={`next-${nextIndex}`}
            style={{ position: "absolute", inset: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroSlides[nextIndex].src}
              alt={heroSlides[nextIndex].alt}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
              className="hero-slide__img"
            />
          </div>
        )}

        {/* Slide indicator dots */}
        <div className="hero-slide-dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero-slide-dot${i === currentIndex ? " hero-slide-dot--active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                if (isTransitioning.current) return;
                if (intervalRef.current) clearInterval(intervalRef.current);
                isTransitioning.current = true;
                setNextIndex(i);
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    const nextEl = nextLayerRef.current;
                    if (!nextEl) { isTransitioning.current = false; return; }
                    gsap.set(nextEl, { opacity: 0 });
                    gsap.to(nextEl, {
                      opacity: 1,
                      duration: TRANSITION_DURATION,
                      ease: "power2.inOut",
                      onComplete: () => {
                        setCurrentIndex(i);
                        setNextIndex(null);
                        isTransitioning.current = false;
                      },
                    });
                  });
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* White-to-transparent gradient overlay — left side readable, right shows image */}
      <div
        aria-hidden="true"
        className="hero-gradient-overlay"
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
