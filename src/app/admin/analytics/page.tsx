import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/admin";
import { getAdminMetrics } from "@/lib/repositories";

export const metadata = { title: "Analytics Overview" };

export default async function AnalyticsPage() {
  await requireAdmin();
  const metrics = await getAdminMetrics();

  return (
    <div>
      <div className="admin-page-title">
        <h1>Analytics Overview</h1>
        <p className="mt-2 text-muted-foreground">A CMS-ready analytics surface for future GA4, Vercel Analytics or CRM integrations.</p>
      </div>
      <div className="admin-analytics-grid mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Project portfolio", metrics.projects],
          ["Site pages", metrics.sitePages],
          ["Client proof", metrics.clients],
        ].map(([label, value]) => (
          <Card key={label as string} className="border-white/10 bg-card/55">
            <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="size-5 text-primary" /> {label}</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-semibold">{String(value)}</p></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
