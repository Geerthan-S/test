import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requireAdmin } from "@/lib/admin";
import { canUseDatabase, getPrisma, runSafeQuery } from "@/lib/prisma";

export const metadata = { title: "Media Uploads" };

export default async function MediaPage() {
  await requireAdmin();
  const assets = await runSafeQuery(
    () => getPrisma().mediaAsset.findMany({ orderBy: { createdAt: "desc" }, take: 24 }),
    [],
  );

  return (
    <div>
      <div className="admin-page-title">
        <h1>Media Uploads</h1>
        <p className="mt-2 text-muted-foreground">Cloudinary-backed upload endpoint for project galleries and CMS media.</p>
      </div>
      <form action="/api/uploads" method="post" encType="multipart/form-data" className="admin-form-shell mt-8 grid max-w-xl gap-4">
        <div className="grid gap-2">
          <Label htmlFor="file">Image file</Label>
          <Input id="file" name="file" type="file" accept="image/*" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="alt">Alt text</Label>
          <Input id="alt" name="alt" />
        </div>
        <Button type="submit"><Upload className="size-4" /> Upload to Cloudinary</Button>
      </form>
      <div className="admin-asset-grid mt-8 grid gap-4 md:grid-cols-3">
        {assets.map((asset) => (
          <div key={asset.id} className="admin-asset-card rounded-md border border-white/10 bg-card/45 p-4 text-sm">
            <p className="truncate font-medium">{asset.publicId}</p>
            <p className="mt-2 truncate text-muted-foreground">{asset.secureUrl}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
