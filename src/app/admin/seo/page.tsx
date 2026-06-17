import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { requireAdmin } from "@/lib/admin";
import { canUseDatabase, getPrisma } from "@/lib/prisma";

export const metadata = { title: "SEO Metadata Editor" };

async function saveSeo(formData: FormData) {
  "use server";
  await requireAdmin();
  if (!canUseDatabase()) return;

  await getPrisma().seoEntry.upsert({
    where: { path: String(formData.get("path") ?? "/") },
    update: {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      image: String(formData.get("image") ?? "") || undefined,
    },
    create: {
      path: String(formData.get("path") ?? "/"),
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      image: String(formData.get("image") ?? "") || undefined,
    },
  });
}

export default async function SeoPage() {
  await requireAdmin();
  const entries = canUseDatabase() ? await getPrisma().seoEntry.findMany({ orderBy: { path: "asc" } }) : [];

  return (
    <div className="admin-split-page grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
      <div>
        <div className="admin-page-title">
          <h1>SEO Metadata Editor</h1>
          <p className="mt-2 text-muted-foreground">Maintain route-level titles, descriptions and social images.</p>
        </div>
        <div className="admin-list-panel mt-8 grid gap-3">
          {entries.map((entry) => (
            <div key={entry.id} className="admin-list-card rounded-md border border-white/10 bg-card/45 p-4">
              <p className="font-mono text-sm text-primary">{entry.path}</p>
              <p className="mt-1 font-medium">{entry.title}</p>
            </div>
          ))}
        </div>
      </div>
      <form action={saveSeo} className="admin-form-shell grid gap-4">
        <div className="grid gap-2"><Label>Path</Label><Input name="path" placeholder="/services" required /></div>
        <div className="grid gap-2"><Label>Title</Label><Input name="title" required /></div>
        <div className="grid gap-2"><Label>Description</Label><Textarea name="description" required /></div>
        <div className="grid gap-2"><Label>Image URL</Label><Input name="image" /></div>
        <Button type="submit">Save Metadata</Button>
      </form>
    </div>
  );
}
