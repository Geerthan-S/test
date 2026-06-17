import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { SiteContentSections } from "@/components/site-content-sections";
import { getSitePage } from "@/lib/repositories";

export async function CmsMarketingPage({
  slug,
  eyebrow,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  className,
}: {
  slug: string;
  eyebrow: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  className?: string;
}) {
  const page = await getSitePage(slug);
  if (!page?.published) notFound();

  return (
    <div className={`cms-marketing-page cms-marketing-page--${slug}`}>
      <PageHero
        eyebrow={eyebrow}
        title={page.heroTitle}
        description={page.heroDescription}
        image={page.heroImage}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        secondaryCtaLabel={secondaryCtaLabel}
        secondaryCtaHref={secondaryCtaHref}
        className={className}
      />
      <SiteContentSections sections={page.sections} />
    </div>
  );
}
