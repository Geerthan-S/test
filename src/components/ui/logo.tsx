import Image from "next/image";
import Link from "next/link";

export const DOCKSIDE_LOGO_SRC = "/brand/dockside-company-logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`industrial-wordmark flex items-center gap-3 ${className}`} aria-label="Dockside home">
      <div className="industrial-wordmark__logo relative shrink-0">
        <Image
          src={DOCKSIDE_LOGO_SRC}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 88px, 72px"
          className="industrial-wordmark__logo-image"
        />
      </div>
      <div className="industrial-wordmark__type flex flex-col">
        <span className="font-display text-xl uppercase tracking-wider text-white">Dockside</span>
        <span className="text-[9px] uppercase tracking-widest text-[#f6f1e894]">Constructions</span>
      </div>
    </Link>
  );
}
