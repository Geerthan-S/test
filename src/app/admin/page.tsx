import Link from "next/link";
import { ArrowUpRight, DatabaseZap, Edit3 } from "lucide-react";
import { syncDefaultSitePages } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requireAdmin } from "@/lib/admin";
import { getSitePages } from "@/lib/repositories";
import { getSitePageRoute } from "@/lib/site-content";

export const metadata = { title: "Site Content CMS" };

function pageGroup(slug: string) {
  if (slug.startsWith("service-")) return "Service detail";
  if (slug === "home") return "Primary";
  return "Primary";
}

export default async function AdminSiteContentPage({
  searchParams,
}: {
  searchParams: Promise<{ database?: string; synced?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const pages = await getSitePages();

  return (
    <div>
      <div className="admin-page-title flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1>Site content</h1>
          <p className="mt-3">
            Edit page heroes and section JSON for the full public site, including service detail pages.
          </p>
        </div>
        <form action={syncDefaultSitePages}>
          <Button type="submit">
            <DatabaseZap className="size-4" aria-hidden="true" />
            Sync Default Content
          </Button>
        </form>
      </div>
      {params.synced ? (
        <p className="mt-5 rounded-md border border-primary/30 bg-primary/10 p-4 text-sm text-primary">
          Default page content, images, service sections and FAQs have been synced into the database.
        </p>
      ) : null}
      {params.database ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Configure DATABASE_URL and run Prisma migrations to enable writes.
        </p>
      ) : null}
      <div className="admin-table-shell">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Sections</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => {
              const route = getSitePageRoute(page.slug);
              return (
                <TableRow key={page.slug}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell>{pageGroup(page.slug)}</TableCell>
                  <TableCell>
                    <Link href={route} className="inline-flex items-center gap-1 text-primary">
                      {route}
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    </Link>
                  </TableCell>
                  <TableCell>{page.sections.length}</TableCell>
                  <TableCell>
                    <Badge>{page.published ? "Published" : "Hidden"}</Badge>
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Button asChild variant="outline">
                      <Link href={`/admin/site-content/${page.slug}`}>
                        <Edit3 className="size-4" aria-hidden="true" />
                        Edit
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
