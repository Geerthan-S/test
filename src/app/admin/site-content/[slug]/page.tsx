import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { updateSitePage } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { requireAdmin } from "@/lib/admin";
import { getSitePage } from "@/lib/repositories";
import { getSitePageRoute } from "@/lib/site-content";

export const metadata = { title: "Edit Site Content" };

export default async function AdminSiteContentEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; database?: string; error?: string }>;
}) {
  await requireAdmin();
  const [{ slug }, flags] = await Promise.all([params, searchParams]);
  const page = await getSitePage(slug);
  if (!page) notFound();

  const route = getSitePageRoute(slug);

  return (
    <div>
      <div className="admin-page-title flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/admin/site-content" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to site content
          </Link>
          <h1>Edit {page.title}</h1>
          <p className="mt-3">
            This controls the page hero and editable sections rendered at {route}.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={route}>View page</Link>
        </Button>
      </div>

      {flags.saved ? (
        <p className="mt-5 rounded-md border border-primary/30 bg-primary/10 p-4 text-sm text-primary">
          Saved and revalidated.
        </p>
      ) : null}
      {flags.database ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Configure DATABASE_URL and run Prisma migrations to enable writes.
        </p>
      ) : null}
      {flags.error ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {flags.error === "sections"
            ? "Sections must be valid JSON and the top-level value must be an array."
            : flags.error}
        </p>
      ) : null}

      <form action={updateSitePage.bind(null, page.slug)} className="admin-form-shell mt-8 grid gap-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Admin page title</Label>
            <Input id="title" name="title" defaultValue={page.title} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="heroImage">Hero image URL</Label>
            <Input id="heroImage" name="heroImage" defaultValue={page.heroImage} required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">SEO / admin description</Label>
          <Textarea id="description" name="description" defaultValue={page.description} rows={3} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="heroTitle">Hero title</Label>
          <Input id="heroTitle" name="heroTitle" defaultValue={page.heroTitle} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="heroDescription">Hero description</Label>
          <Textarea id="heroDescription" name="heroDescription" defaultValue={page.heroDescription} rows={3} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="sections">Sections JSON</Label>
          <Textarea
            id="sections"
            name="sections"
            className="min-h-[520px] font-mono text-xs"
            defaultValue={JSON.stringify(page.sections, null, 2)}
            spellCheck={false}
            required
          />
          <p className="text-xs leading-5 text-muted-foreground">
            Keep this as a JSON array. Each section supports id, label, heading, body, layout, media, items, faqs and cta.
          </p>
        </div>
        <label className="flex items-center gap-3 text-sm text-muted-foreground">
          <input name="published" type="checkbox" defaultChecked={page.published} />
          Published
        </label>
        <div className="flex justify-end">
          <Button type="submit">
            <Save className="size-4" aria-hidden="true" />
            Save content
          </Button>
        </div>
      </form>
    </div>
  );
}
