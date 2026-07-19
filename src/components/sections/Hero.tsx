"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Building2, Landmark, Pickaxe, Users } from "lucide-react";
import { MagneticButton } from "../ui/magnetic-button";

type HeroProps = {
  eyebrow?: string;
  badgeIcon?: React.ElementType;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  slides?: { src: string; alt: string }[];
  children?: React.ReactNode;
};

const defaultHeroSlides = [
  {
    src: "/hero/hero-earthwork.jpg",
    alt: "Dockside earthwork and site preparation with heavy machinery at sunset",
  },
  {
    src: "/hero/hero-industrial-park.jpg",
    alt: "Aerial view of Dockside industrial park development at sunset",
  },
  {
    src: "/hero/hero-it-park.jpg",
    alt: "Aerial view of completed IT park commercial campus at dusk",
  },
];

const SLIDE_DURATION = 4000;
const TRANSITION_DURATION = 1.6;

export function Hero({
  eyebrow = "INDUSTRIAL • COMMERCIAL • INFRASTRUCTURE",
  badgeIcon: BadgeIcon = ShieldCheck,
  title = "From Land|Development|to Large-Scale|Infrastructure|Execution.",
  description = "Dockside Constructions delivers earthworks, industrial infrastructure, road construction, site development and project management services across India with engineering precision, safety compliance and reliable execution.",
  primaryLabel = "VIEW PROJECTS",
  primaryHref = "/projects",
  secondaryLabel = "CONTACT US",
  secondaryHref = "/contact",
  slides = defaultHeroSlides,
  children,
}: HeroProps) {
  const root = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const indexRef = useRef(0);
  const titleLines = title.split("|").map((line) => line.trim()).filter(Boolean);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-kicker, .hero-line, .hero-copy, .hero-extended, .hero-actions, .hero-cta-certification",
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

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      const prev = indexRef.current;
      const next = (prev + 1) % slides.length;
      setPrevIndex(prev);
      setCurrentIndex(next);
      indexRef.current = next;
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section ref={root} className="home-hero-reference qs-reference-hero relative isolate bg-white">
      <style>{`
       

        .home-hero-reference::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.98) 0%,
              rgba(255, 255, 255, 0.96) 22%,
              rgba(255, 255, 255, 0.82) 38%,
              rgba(255, 255, 255, 0.45) 50%,
              rgba(255, 255, 255, 0.12) 60%,
              transparent 70%
            );
        }

        .home-hero-reference .home-hero-bg {
          position: absolute !important;
          inset: 0 !important;
          z-index: 1 !important;
          overflow: hidden !important;
        }

        .home-hero-reference .hero-slideshow-wrapper {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          z-index: 1 !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .home-hero-reference .hero-slideshow-wrapper img {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
          visibility: visible !important;
        }

        .home-hero-reference .home-hero-white-wash {
          position: absolute !important;
          inset: 0 !important;
          z-index: 3 !important;
          pointer-events: none !important;
          background:
            linear-gradient(
                90deg,
                rgba(255,255,255,.98) 0%,
                rgba(255,255,255,.96) 22%,
                rgba(255,255,255,.82) 38%,
                rgba(255,255,255,.45) 50%,
                rgba(255,255,255,.12) 60%,
                transparent 70%
            ),
            radial-gradient(
                ellipse at 20% 45%,
                rgba(255,255,255,.42),
                transparent 70%
            ) !important;
        }

        .home-hero-reference .qs-reference-hero__glass-wrapper {
          z-index: 4 !important;
        }

        .home-hero-reference .qs-reference-hero__glass-fade {
          display: none !important;
        }

        .home-hero-reference .qs-reference-hero__layout {
          position: absolute !important;
          inset: 0 !important;
          z-index: 30 !important;
          height: 100% !important;
          padding: 0 !important;
          pointer-events: none !important;
        }

        .home-hero-reference .qs-reference-hero__copy {
          position: absolute !important;
          top: 200px !important;
          left: clamp(36px, 3.7vw, 66px) !important;
          z-index: 31 !important;
          width: min(570px, 42vw) !important;
          max-width: 570px !important;
          opacity: 1 !important;
          transform: none !important;
          visibility: visible !important;
          padding-top: 0 !important;
          pointer-events: auto !important;
        }

        .home-hero-reference .hero-kicker,
        .home-hero-reference .hero-line,
        .home-hero-reference .hero-copy,
        .home-hero-reference .hero-actions {
          opacity: 1 !important;
          transform: none !important;
          visibility: visible !important;
        }

        .home-hero-reference .glass-panel {
          height: 155% !important;
          box-shadow: none !important;
          border-inline: 1px solid rgba(255, 255, 255, 0.55) !important;
          mix-blend-mode: screen !important;
          opacity: 1 !important;
        }

        .home-hero-reference .glass-panel-1 {
          top: -21% !important;
          left: 10% !important;
          width: 30vw !important;
          transform: rotate(30deg) !important;
          backdrop-filter: blur(5px) !important;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.66), rgba(255, 255, 255, 0.17)) !important;
        }

        .home-hero-reference .glass-panel-2 {
          top: 7% !important;
          left: 5% !important;
          width: 30vw !important;
          transform: rotate(-30deg) !important;
          backdrop-filter: blur(4px) !important;
          background: rgba(255, 255, 255, 0.22) !important;
        }

        .home-hero-reference .glass-panel-3 {
          top: -22% !important;
          left: 8% !important;
          width: 30vw !important;
          transform: rotate(30deg) !important;
          backdrop-filter: blur(3px) !important;
          background: rgba(255, 255, 255, 0.24) !important;
        }
          
        .home-hero-reference .glass-panel-6 {
          top: -19% !important;
          left: -8% !important;
          width: 30vw !important;
          transform: rotate(-30deg) !important;
          backdrop-filter: blur(10px) !important;
          background: #ffffff !important;
        }
        .home-hero-reference .glass-panel-7 {
          top: -18% !important;
          left: 4% !important;
          width: 30vw !important;
          transform: rotate(30deg) !important;
          backdrop-filter: blur(5px) !important;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.60), rgba(255, 255, 255, 0.13)) !important;
        }

        .home-hero-reference .glass-panel-5 {
          top: -19% !important;
          left: 2% !important;
          width: 30vw !important;
          transform: rotate(30deg) !important;
          backdrop-filter: blur(10px) !important;
          background: #ffffff !important;
          z-index: 10 !important;
        }

        

        .home-hero-reference .glass-panel-4 {
          top: -19% !important;
          left: -10% !important;
          width: 30vw !important;
          transform: rotate(-30deg) !important;
          backdrop-filter: none !important;
          background: #ffffff !important;
          z-index: 5 !important;
          mix-blend-mode: normal !important;
        }



        

        

        .home-hero-reference .hero-floating-metrics {
          bottom: -75px !important;
          width: min(calc(100% - 460px), 1280px) !important;
          min-width: 1120px !important;
          max-width: 1280px !important;
          left: 50% !important;
          z-index: 35 !important;
        }

        .home-hero-reference .qs-reference-hero__certs {
          border-radius: 17px !important;
          background: rgba(255, 255, 255, 0.94) !important;
          box-shadow: 0 32px 70px rgba(45, 24, 28, 0.18) !important;
        }

        .home-hero-reference .qs-reference-hero__cert {
          min-height: 134px !important;
          padding: 30px 38px !important;
        }

        .qs-reference-hero {
          height: clamp(790px, 100vh, 910px) !important;
          min-height: 790px !important;
          color: #202126 !important;
          background: #ffffff !important;
          overflow: visible !important;
        }
        .hero-slideshow-wrapper {
          position: absolute !important;
          top: 0 !important;
          bottom: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: auto !important;
          overflow: hidden !important;
          z-index: 0 !important;
        }
        .hero-slideshow-wrapper img {
          object-position: 62% 50% !important;
          filter: saturate(1.04) contrast(1.03) brightness(0.98) !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        .qs-reference-hero__glass-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background:
            linear-gradient(90deg, #ffffff 0%, #ffffff 32%, rgba(255, 255, 255, 0.96) 43%, rgba(255, 255, 255, 0.74) 54%, rgba(255, 255, 255, 0.24) 66%, transparent 78%),
            radial-gradient(circle at 25% 54%, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.76) 31%, transparent 62%);
          z-index: 1;
          pointer-events: none;
        }
        
        .qs-reference-hero__glass-wrapper {
          position: absolute;
          top: -24vh;
          bottom: -24vh;
          left: 0;
          right: 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
        }

        .glass-panel {
          position: absolute;
          height: 10%;
          box-shadow: none;
          border-inline: 1px solid rgba(255, 255, 255, 0.42);
          mix-blend-mode: screen;
        }

        .glass-panel-1 {
          top: -17%;
          left: 38%;
          width: 10vw;
          transform: rotate(-30deg);
          backdrop-filter: blur(5px);
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.54), rgba(255, 255, 255, 0.13));
        }

        .glass-panel-2 {
          top: -20%;
          left: 49%;
          width: 8vw;
          transform: rotate(-30deg);
          backdrop-filter: blur(4px);
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.08));
        }

        .glass-panel-3 {
          top: -18%;
          left: 58%;
          width: 12vw;
          transform: rotate(28deg);
          backdrop-filter: blur(5px);
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.48), rgba(255, 255, 255, 0.12));
        }

        .glass-panel-4 {
          top: -22%;
          left: 64%;
          width: 5vw;
          transform: rotate(28deg);
          backdrop-filter: blur(3px);
          background: rgba(255, 255, 255, 0.18);
        }

        .glass-panel-5 {
          top: -22%;
          left: 14%;
          width: 7vw;
          transform: rotate(28deg);
          backdrop-filter: blur(3px);
          background: #ffffff;
        }
        .qs-reference-hero__plan-lines {
          bottom: 0 !important;
          left: -92px !important;
          width: 370px !important;
          height: 230px !important;
        }
        .qs-reference-hero__layout {
          height: 100% !important;
          padding: 0 !important;
        }
        .qs-reference-hero__copy {
          max-width: 570px !important;
          padding-top: 12vh !important;
        }
        .qs-reference-hero__badge {
          position: relative !important;
          top: -20px !important;
          height: 52px !important;
          margin-bottom: 22px !important;
          padding: 0 18px !important;
        }
        .qs-reference-hero__title {
          color: #8B3A4A !important;
          font-size: clamp(38px, 3.45vw, 54px) !important;
          line-height: 1.09 !important;
          letter-spacing: 0 !important;
          text-shadow: none !important;
        }
        .qs-reference-hero__title span {
          color: #8B3A4A !important;
        }
        .qs-reference-hero__rule {
          margin-top: 18px !important;
        }
        .qs-reference-hero__body {
          margin-top: 18px !important;
          font-size: 15px !important;
          line-height: 1.75 !important;
          max-width: 535px !important;
        }
        .qs-reference-hero__actions {
          margin-top: 28px !important;
          margin-bottom: 0 !important;
          gap: 28px !important;
        }
        .qs-reference-hero__primary {
          min-height: 50px !important;
          padding: 0 30px !important;
          color: #ffffff !important;
          border-radius: 8px !important;
        }
        .qs-reference-hero__secondary {
          min-height: 52px !important;
          padding: 0 !important;
          border: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
        }
        .qs-reference-hero__secondary span,
        .qs-reference-hero__secondary svg {
          color: #8B2332 !important;
        }
        
        /* Floating Metrics Card */
        .hero-floating-metrics {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 50%);
          width: min(calc(100% - 64px), 1280px);
          max-width: 1280px;
          z-index: 40;
        }
        .qs-reference-hero__certs {
          width: 100% !important;
          margin-top: 0 !important;
          background: rgba(255, 255, 255, 0.9) !important;
          border-radius: 18px !important;
          box-shadow: 0 32px 80px rgba(45, 24, 28, 0.16), 0 2px 10px rgba(45, 24, 28, 0.04) !important;
          backdrop-filter: blur(24px) !important;
          border: 1px solid rgba(255, 255, 255, 1) !important;
        }

        .qs-reference-hero__cert {
          min-height: 112px !important;
          padding: 26px 34px !important;
        }
        .hero-slide-dots {
          position: absolute;
          bottom: 32px;
          right: 48px;
          left: auto;
          transform: none;
          display: flex;
          gap: 10px;
          z-index: 100;
        }
        .hero-slide-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.1);
          padding: 0;
          cursor: pointer;
        }
        .hero-slide-dot--active {
          background: #B34551;
          transform: scale(1.4);
          border-color: transparent;
        }

        @media (max-width: 1024px) {
          .home-hero-reference .hero-slideshow-wrapper {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            min-height: 100% !important;
            margin-top: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          .hero-slideshow-wrapper {
            position: relative !important;
            top: auto !important;
            bottom: auto !important;
            left: auto !important;
            width: 100% !important;
            min-height: 420px !important;
            border-radius: 28px !important;
            box-shadow: 0 28px 80px rgba(45,24,28,0.16) !important;
            margin-top: 40px !important;
          }
          .qs-reference-hero__glass-wrapper,
          .qs-reference-hero__glass-fade {
            display: none !important;
          }
        }
        @media (max-width: 1200px) {
          .qs-reference-hero {
            height: auto !important;
            min-height: 0 !important;
            padding-top: 86px !important;
          }
          .qs-reference-hero__layout {
            height: auto !important;
            padding: 34px 24px 24px !important;
          }
          .qs-reference-hero__title {
            font-size: clamp(36px, 6vw, 68px) !important;
          }
          .qs-reference-hero__certs {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 760px) {
          .qs-reference-hero__badge {
            height: auto !important;
            min-height: 54px !important;
            margin-bottom: 28px !important;
            padding: 14px 16px !important;
          }
          .qs-reference-hero__actions {
            gap: 20px !important;
            margin-bottom: 32px !important;
          }
          .qs-reference-hero__primary {
            width: 100% !important;
          }
          .qs-reference-hero__certs {
            grid-template-columns: 1fr !important;
          }
          .qs-reference-hero__cert {
            padding-inline: 22px !important;
          }
        }
      `}</style>

      {/* ── Background Wrapper (Clips content but allows metrics to float outside) ── */}
      <div className="home-hero-bg absolute inset-0 overflow-hidden z-0">
        <div
          className="absolute inset-0 pointer-events-none opacity-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(139,58,74,0.16) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
          }}
        />

        {/* ── Slideshow ── */}
        <div className="hero-slideshow-wrapper bg-[#050608]">
          {slides.map((slide, idx) => (
            <div
              key={`slide-${idx}`}
              className="hero-slide hero-slide--kenburns"
              style={{
                position: "absolute",
                inset: 0,
                opacity: idx === currentIndex || idx === prevIndex ? 1 : 0,
                zIndex: idx === currentIndex ? 2 : idx === prevIndex ? 1 : 0,
                transition: "opacity 1600ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="hero-slide__img w-full h-full object-cover"
                style={{
                  animation: idx === currentIndex || idx === prevIndex
                    ? "kenburns-zoom 7s ease-out forwards"
                    : "none"
                }}
              />
            </div>
          ))}

          {slides.length > 1 && (
            <div className="hero-slide-dots relative z-50">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`hero-slide-dot${i === currentIndex ? " hero-slide-dot--active" : ""}`}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    setPrevIndex(indexRef.current);
                    setCurrentIndex(i);
                    indexRef.current = i;
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Architectural Glass Transition ── */}
        <div className="home-hero-white-wash" />
        <div className="qs-reference-hero__glass-fade" />
        <div className="qs-reference-hero__glass-wrapper">
          <div className="glass-panel glass-panel-1" />
          <div className="glass-panel glass-panel-2" />
          <div className="glass-panel glass-panel-3" />
          <div className="glass-panel glass-panel-4" />
          <div className="glass-panel glass-panel-5" />
          <div className="glass-panel glass-panel-6" />
          <div className="glass-panel glass-panel-7" />
        </div>

        <div className="qs-reference-hero__plan-lines absolute hidden rotate-[-22deg] border border-[#8B3A4A]/12 lg:block" />
      </div>

      {/* ── Main Layout Content ── */}
      <div className="qs-reference-hero__layout relative z-[25] w-full h-full flex flex-col justify-start pt-[280px] md:pt-[380px] pointer-events-none px-[4.05vw]">
        <div className="qs-reference-hero__copy w-full max-w-[90vw] md:max-w-[700px] pointer-events-auto">
          {eyebrow && (
            <div className="hero-kicker qs-reference-hero__badge inline-flex items-center gap-4 rounded-[8px] border border-[#8B3A4A]/12 bg-white/78 text-[#8B3A4A] shadow-[0_18px_42px_rgba(45,24,28,0.07)] backdrop-blur-xl">
              <BadgeIcon className="h-5 w-5" strokeWidth={1.8} />
              <span className="font-mono text-[12px] font-black uppercase tracking-[0.28em]">
                {eyebrow}
              </span>
            </div>
          )}

          <h1
            className="qs-reference-hero__title font-display font-black uppercase"
          >
            {titleLines.map((line, index) => (
              <span
                className="hero-line inline-block"
                key={line}
              >
                {line}
                {index < titleLines.length - 1 ? <br /> : ""}
              </span>
            ))}
          </h1>

          <div className="hero-line qs-reference-hero__rule h-px w-16 bg-[#8B3A4A]" />

          <p className="hero-copy qs-reference-hero__body max-w-[610px] font-medium text-[#5F6067]">
            {description}
          </p>

          {children && (
            <div className="hero-extended mt-6 pb-8 w-full max-w-[610px]">
              {children}
            </div>
          )}

          <div className="hero-actions qs-reference-hero__actions mt-10 md:mt-12 flex flex-wrap items-center">
            {primaryLabel && primaryHref && (
              <MagneticButton>
                <Link href={primaryHref} className="qs-reference-hero__primary inline-flex items-center justify-center gap-2 rounded-[6px] bg-[#8B2332] font-mono text-[12px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-[#6A1A25]">
                  {primaryLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </MagneticButton>
            )}
            {secondaryLabel && secondaryHref && (
              <MagneticButton>
                <Link href={secondaryHref} className="qs-reference-hero__secondary inline-flex items-center justify-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#6A1A25]">
                  {secondaryLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
