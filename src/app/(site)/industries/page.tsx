import { PageHero } from "@/components/page-hero";
import { industries, industrialImages } from "@/lib/content";

export const metadata = { title: "Industries" };

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Infrastructure for sectors where uptime matters."
        description="Dockside builds for owners who need resilient, maintainable and expansion-ready physical assets."
        image={industrialImages.site}
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {industries.map((industry) => (
          <div key={industry} className="rounded-lg border border-white/10 bg-card/45 p-7">
            <span className="mb-6 block font-mono text-primary">[ SECTOR ]</span>
            <h2 className="text-2xl font-semibold">{industry}</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Sector-specific project controls, site logistics and stakeholder reporting for capital-intensive programs.
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
