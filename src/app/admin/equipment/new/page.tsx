import { createEquipment } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";

export const metadata = { title: "Add Equipment" };

export default async function NewEquipmentPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  return (
    <div>
      <div className="admin-page-title">
        <h1>Add Equipment</h1>
        <p className="mt-2">Add a new machine to the Equipment Fleet section.</p>
      </div>

      {params.error && (
        <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {decodeURIComponent(params.error)}
        </p>
      )}

      <form action={createEquipment} className="admin-form mt-6">
        <EquipmentFormFields />
        <div className="admin-form__actions">
          <Button type="submit">Add Equipment</Button>
        </div>
      </form>
    </div>
  );
}

export function EquipmentFormFields({
  defaults,
}: {
  defaults?: Partial<{
    name: string;
    slug: string;
    imageUrl: string | null;
    quantity: number;
    capacity: string | null;
    manufacturer: string | null;
    year: number | null;
    status: string;
    sortOrder: number;
    published: boolean;
  }>;
}) {
  return (
    <div className="admin-form__grid">
      <div className="admin-form__field admin-form__field--full">
        <label htmlFor="eq-name">Equipment Name *</label>
        <input
          id="eq-name"
          name="name"
          type="text"
          required
          defaultValue={defaults?.name ?? ""}
          placeholder="e.g. Hydraulic Excavator"
        />
      </div>

      <div className="admin-form__field">
        <label htmlFor="eq-slug">Slug *</label>
        <input
          id="eq-slug"
          name="slug"
          type="text"
          required
          defaultValue={defaults?.slug ?? ""}
          placeholder="e.g. hydraulic-excavator"
        />
      </div>

      <div className="admin-form__field">
        <label htmlFor="eq-status">Status</label>
        <select id="eq-status" name="status" defaultValue={defaults?.status ?? "Active"}>
          <option value="Active">Active</option>
          <option value="Maintenance">Under Maintenance</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="admin-form__field admin-form__field--full">
        <label htmlFor="eq-image">Image URL</label>
        <input
          id="eq-image"
          name="imageUrl"
          type="text"
          defaultValue={defaults?.imageUrl ?? ""}
          placeholder="https://... or /path/to/image.jpg"
        />
      </div>

      <div className="admin-form__field">
        <label htmlFor="eq-qty">Quantity *</label>
        <input
          id="eq-qty"
          name="quantity"
          type="number"
          min="1"
          required
          defaultValue={defaults?.quantity ?? 1}
        />
      </div>

      <div className="admin-form__field">
        <label htmlFor="eq-capacity">Capacity / Rating</label>
        <input
          id="eq-capacity"
          name="capacity"
          type="text"
          defaultValue={defaults?.capacity ?? ""}
          placeholder="e.g. 20T – 30T"
        />
      </div>

      <div className="admin-form__field">
        <label htmlFor="eq-manufacturer">Manufacturer</label>
        <input
          id="eq-manufacturer"
          name="manufacturer"
          type="text"
          defaultValue={defaults?.manufacturer ?? ""}
          placeholder="e.g. CAT / JCB"
        />
      </div>

      <div className="admin-form__field">
        <label htmlFor="eq-year">Year</label>
        <input
          id="eq-year"
          name="year"
          type="number"
          min="1990"
          max={new Date().getFullYear() + 1}
          defaultValue={defaults?.year ?? ""}
          placeholder={String(new Date().getFullYear())}
        />
      </div>

      <div className="admin-form__field">
        <label htmlFor="eq-sort">Sort Order</label>
        <input
          id="eq-sort"
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={defaults?.sortOrder ?? 0}
        />
        <small>Lower number = displayed first</small>
      </div>

      <div className="admin-form__field">
        <label className="admin-checkbox">
          <input
            name="published"
            type="checkbox"
            defaultChecked={defaults?.published ?? true}
          />
          Published (visible on website)
        </label>
      </div>
    </div>
  );
}
