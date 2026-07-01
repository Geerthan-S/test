"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  FileText,
  FolderOpen,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  BookOpen,
} from "lucide-react";
import type { DownloadGroup } from "@/lib/repositories";
import { DownloadCard } from "@/components/downloads/DownloadCard";

const PDFViewerModal = dynamic(
  () => import("@/components/downloads/PDFViewerModal").then((mod) => mod.PDFViewerModal),
  { ssr: false }
);

const categoryIcons: Record<string, React.ElementType> = {
  "Company Profile": BookOpen,
  Brochure: BookOpen,
  Certifications: ShieldCheck,
  "Registration Documents": FileCheck,
  "Tender Documents": FolderOpen,
  "GST Certificate": FileCheck,
  PAN: FileCheck,
  "Vendor Registration Forms": FolderOpen,
  Policies: ShieldCheck,
};

const downloadCategories = [
  "Company Profile",
  "Brochure",
  "Certifications",
  "Registration Documents",
  "Tender Documents",
  "Policies",
  "Vendor Registration Forms",
];

interface DownloadsPageClientProps {
  groups: DownloadGroup[];
}

// Convert Google Drive links to direct download format, then proxy
function convertToProxyUrl(url: string): string {
  let finalUrl = url;

  // Extract Google Drive file ID from various URL formats
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const queryIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const fileId = fileIdMatch?.[1] || queryIdMatch?.[1];

  if (fileId) {
    // Convert to direct download URL for Google Drive
    finalUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  // Use proxy API to bypass CORS
  return `/api/pdf-proxy?url=${encodeURIComponent(finalUrl)}`;
}

export function DownloadsPageClient({ groups }: DownloadsPageClientProps) {
  const [selectedFile, setSelectedFile] = useState<{
    fileUrl: string;
    title: string;
  } | null>(null);

  const handleViewFile = (fileUrl: string, title: string) => {
    const proxiedUrl = convertToProxyUrl(fileUrl);
    setSelectedFile({ fileUrl: proxiedUrl, title });
  };

  const handleCloseModal = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <div className="downloads-page">
        {/* Page Hero */}
        <section className="downloads-hero">
          <div className="downloads-hero__inner">
            <span className="downloads-hero__eyebrow">Documents &amp; Resources</span>
            <h1>Downloads</h1>
            <p>
              Company profile, ISO certificates, registration documents, and tender forms — all in
              one place for procurement and vendor onboarding.
            </p>
          </div>
        </section>

        {/* Downloads Content */}
        <section className="downloads-main">
          <div className="downloads-main__inner">
            {groups.length === 0 ? (
              <div className="downloads-empty">
                <FolderOpen className="size-12" aria-hidden="true" />
                <h2>Documents Being Uploaded</h2>
                <p>
                  Our document library is being prepared. Check back shortly or contact us directly
                  to request specific documents.
                </p>
                <div className="downloads-empty__categories">
                  <p>The following document types will be available:</p>
                  <ul>
                    {downloadCategories.map((cat) => {
                      const Icon = categoryIcons[cat] ?? FileText;
                      return (
                        <li key={cat}>
                          <Icon className="size-4" aria-hidden="true" />
                          {cat}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Link href="/contact" className="cta-btn cta-btn--primary">
                  Request Documents <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <>
                {groups.map((group) => {
                  const Icon = categoryIcons[group.category] ?? FileText;
                  return (
                    <div key={group.category} className="downloads-category">
                      <div className="downloads-category__header">
                        <Icon className="size-6 downloads-category__icon" aria-hidden="true" />
                        <h2 className="downloads-category__title">{group.category}</h2>
                        <span className="downloads-category__count">
                          {group.items.length} {group.items.length === 1 ? "file" : "files"}
                        </span>
                      </div>
                      <div className="downloads-category__grid">
                        {group.items.map((item) => (
                          <DownloadCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            category={item.category}
                            fileUrl={item.fileUrl}
                            fileType={item.fileType}
                            onView={() => handleViewFile(item.fileUrl, item.title)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
                <p className="downloads-main__note">
                  Need a specific document not listed here?{" "}
                  <Link href="/contact">Contact us directly</Link> and we will send it within 24
                  hours.
                </p>
              </>
            )}
          </div>
        </section>
      </div>

      {/* PDF Viewer Modal */}
      {selectedFile && (
        <PDFViewerModal
          isOpen={true}
          onClose={handleCloseModal}
          fileUrl={selectedFile.fileUrl}
          title={selectedFile.title}
          downloadEnabled={true}
        />
      )}
    </>
  );
}
