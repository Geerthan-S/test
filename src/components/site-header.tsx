"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";

const navItems = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Careers", "/careers"],
  ["Clients", "/clients"],
  ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateScrolled = () => {
      frame = 0;
      const nextScrolled = window.scrollY > 80;
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrolled);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 981px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setOpen(false);
    };

    closeOnDesktop();
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`industrial-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="industrial-nav__utility" aria-label="Dockside contact details">
        <a href="tel:+918825922737">
          <Phone aria-hidden="true" />
          +91 88259 22737
        </a>
        <a href="mailto:admin@docksideconstructions.com">
          <Mail aria-hidden="true" />
          admin@docksideconstructions.com
        </a>
        <Link href="/contact">
          <MapPin aria-hidden="true" />
          Villupuram, Tamil Nadu
        </Link>
      </div>

      <div className="industrial-nav__bar">
        <Logo />
        <nav className="industrial-nav__links" aria-label="Main navigation">
          {navItems.map(([label, href]) => {
            const active = isActive(href);

            return (
              <Link key={href} href={href} className={active ? "is-active" : ""}>
                {label}
              </Link>
            );
          })}
          <Link href="/contact" className="industrial-quote">
            Get Quote
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </nav>
        <button
          className="industrial-menu"
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className={`industrial-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <button className="industrial-overlay__close" type="button" onClick={() => setOpen(false)}>
          <X className="size-5" aria-hidden="true" />
        </button>
        <p>Navigation</p>
        <div className="industrial-overlay__links">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}>
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
