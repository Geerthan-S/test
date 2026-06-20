import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteDownload } from "@/app/admin/actions";
import { getPrisma, canUseDatabase } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export const metadata = { title: "Downloads CMS" };

export default async function AdminDownloadsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; database?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const items = canUseDatabase()
    ? await getPrisma().download.findMany({
        orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      })
    : [];

  return (
    <div>
      <div className="admin-page-title flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1>Downloads</h1>
          <p className="mt-3">
            Manage downloadable documents shown on the public Downloads section — company profile,
            certifications, tender documents and more.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/downloads/new">
            <Plus className="size-4" /> Add Document
          </Link>
        </Button>
      </div>

      {params.saved && (
        <p className="mt-4 rounded-md border border-green-600/30 bg-green-600/10 p-3 text-sm text-green-700">
          Download saved successfully.
        </p>
      )}

      <div className="admin-table-shell mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No documents added yet. Click &quot;Add Document&quot; to get started.
                </TableCell>
              </TableRow>
            )}
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.fileType.toUpperCase()}</Badge>
                </TableCell>
                <TableCell>{item.published ? "Yes" : "No"}</TableCell>
                <TableCell>{item.sortOrder}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/downloads/${item.id}/edit`}>
                      <Pencil className="size-3 mr-1" /> Edit
                    </Link>
                  </Button>
                  <form action={deleteDownload.bind(null, item.id)}>
                    <Button variant="destructive" size="icon" aria-label="Delete download">
                      <Trash2 className="size-4" />
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
