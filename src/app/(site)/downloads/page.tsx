import Link from "next/link";
import {
  FileText,
  Download,
  FolderOpen,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  BookOpen,
} from "lucide-react";
import { getDownloads, type DownloadGroup } from "@/lib/repositories";
import { DownloadGroupCard } from "@/components/downloads/DownloadGroupCard";

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

export default async function DownloadsPage() {
  const groups = await getDownloads();

  return (
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
              <div className="downloads-grid">
                {groups.map((group) => (
                  <DownloadGroupCard key={group.category} group={group} />
                ))}
              </div>
              <p className="downloads-main__note">
                Need a specific document not listed here?{" "}
                <Link href="/contact">Contact us directly</Link> and we will send it within 24 hours.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
