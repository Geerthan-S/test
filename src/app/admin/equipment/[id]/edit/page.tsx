import { notFound } from "next/navigation";
import { updateEquipment } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { getPrisma, canUseDatabase } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { EquipmentFormFields } from "@/app/admin/equipment/new/page";

export const metadata = { title: "Edit Equipment" };

export default async function EditEquipmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const sp = await searchParams;

  if (!canUseDatabase()) notFound();
  const item = await getPrisma().equipment.findUnique({ where: { id } });
  if (!item) notFound();

  const updateWithId = updateEquipment.bind(null, id);

  return (
    <div>
      <div className="admin-page-title">
        <h1>Edit Equipment</h1>
        <p className="mt-2">{item.name}</p>
      </div>

      {sp.error && (
        <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {decodeURIComponent(sp.error)}
        </p>
      )}

      <form action={updateWithId} className="admin-form mt-6">
        <EquipmentFormFields defaults={item} />
        <div className="admin-form__actions">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
