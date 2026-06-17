"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { X, ZoomIn } from "lucide-react";

interface CertificateViewerProps {
  src: string;
  title: string;
  subtitle: string;
}

export function CertificateViewer({ src, title, subtitle }: CertificateViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleBackdrop = (e: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        close();
      }
    };
    dialog.addEventListener("click", handleBackdrop);
    return () => dialog.removeEventListener("click", handleBackdrop);
  }, []);

  return (
    <>
      <button
        className="about-premium-certificate-card__image-wrapper"
        onClick={open}
        aria-label={`View ${title} certificate enlarged`}
        type="button"
      >
        <div className="about-premium-certificate-card__image">
          <Image
            src={src}
            alt={`${title} certificate preview`}
            fill
            sizes="(min-width: 1024px) 30vw, 92vw"
          />
        </div>
        <span className="about-premium-certificate-card__zoom" aria-hidden="true">
          <ZoomIn />
          Click to enlarge
        </span>
      </button>

      <dialog ref={dialogRef} className="cert-lightbox" aria-label={`${title} certificate`}>
        <button
          className="cert-lightbox__close"
          onClick={close}
          aria-label="Close certificate view"
          type="button"
        >
          <X />
        </button>
        <div className="cert-lightbox__inner">
          <div className="cert-lightbox__image">
            <Image src={src} alt={`${title} — ${subtitle}`} fill sizes="90vw" />
          </div>
          <p className="cert-lightbox__caption">
            {title} · {subtitle}
          </p>
        </div>
      </dialog>
    </>
  );
}
