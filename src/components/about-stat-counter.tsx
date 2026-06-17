"use client";

import { useEffect, useRef, useState } from "react";

function parseValue(raw: string): { prefix: string; num: number; suffix: string } {
  // e.g. "65+" → {prefix:"", num:65, suffix:"+"}
  // e.g. "INR 60+ Cr" → {prefix:"INR ", num:60, suffix:"+ Cr"}
  // e.g. "20+" → {prefix:"", num:20, suffix:"+"}
  const match = raw.match(/^([^\d]*)(\d+)([^]*)$/);
  if (!match) return { prefix: "", num: 0, suffix: raw };
  return { prefix: match[1], num: parseInt(match[2], 10), suffix: match[3] };
}

export function StatCounter({ value }: { value: string }) {
  const { prefix, num, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const steps = 50;
          const increment = num / steps;
          let count = 0;
          const timer = setInterval(() => {
            count += increment;
            if (count >= num) {
              setDisplay(num);
              clearInterval(timer);
            } else {
              setDisplay(Math.floor(count));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <strong ref={ref} aria-label={value}>
      {prefix}{display}{suffix}
    </strong>
  );
}
