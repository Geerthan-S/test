"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function LuxuryScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const shouldSkipEnhancements =
      pathname?.startsWith("/admin") || pathname === "/login";
    const shouldUseNativeScroll = shouldSkipEnhancements || window.matchMedia(
      "(max-width: 899px), (pointer: coarse), (prefers-reduced-motion: reduce)",
    ).matches;

    if (shouldUseNativeScroll) {
      document.documentElement.classList.remove("has-smooth-scroll");
      document.documentElement.classList.remove("has-scroll-reveal");
      return undefined;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const timeout = window.setTimeout(async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });
      document.documentElement.classList.add("has-scroll-reveal");

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-text-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { yPercent: 12, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 84%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger-reveal]").forEach((scope) => {
          gsap.fromTo(
            scope.children,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.055,
              ease: "power3.out",
              scrollTrigger: { trigger: scope, start: "top 82%", once: true },
            },
          );
        });
      });

      cleanup = () => ctx.revert();
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      document.documentElement.classList.remove("has-smooth-scroll");
      document.documentElement.classList.remove("has-scroll-reveal");
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
