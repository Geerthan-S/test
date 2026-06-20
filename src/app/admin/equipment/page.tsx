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
import { deleteEquipment } from "@/app/admin/actions";
import { getPrisma, canUseDatabase } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export const metadata = { title: "Equipment Fleet CMS" };

export default async function AdminEquipmentPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; database?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const items = canUseDatabase()
    ? await getPrisma().equipment.findMany({ orderBy: { sortOrder: "asc" } })
    : [];

  return (
    <div>
      <div className="admin-page-title flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1>Equipment Fleet</h1>
          <p className="mt-3">
            Manage machinery shown on the public Equipment Fleet section. Changes reflect
            immediately on the homepage.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/equipment/new">
            <Plus className="size-4" /> Add Equipment
          </Link>
        </Button>
      </div>

      {params.saved && (
        <p className="mt-4 rounded-md border border-green-600/30 bg-green-600/10 p-3 text-sm text-green-700">
          Equipment item saved successfully.
        </p>
      )}
      {params.database && (
        <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          Configure DATABASE_URL to enable equipment management.
        </p>
      )}

      <div className="admin-table-shell mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No equipment added yet. Click &quot;Add Equipment&quot; to get started.
                </TableCell>
              </TableRow>
            )}
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.capacity ?? "—"}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.manufacturer ?? "—"}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "Active" ? "default" : "outline"}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.sortOrder}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/equipment/${item.id}/edit`}>
                      <Pencil className="size-3 mr-1" /> Edit
                    </Link>
                  </Button>
                  <form action={deleteEquipment.bind(null, item.id)}>
                    <Button variant="destructive" size="icon" aria-label="Delete equipment">
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
