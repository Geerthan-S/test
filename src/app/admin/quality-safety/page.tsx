import { redirect } from "next/navigation";
import { getSiteSettings } from "@/lib/repositories";
import { canUseDatabase, getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Quality & Safety | Admin" };

async function savePolicies(formData: FormData) {
  "use server";

  if (!canUseDatabase()) {
    redirect("/admin/quality-safety?error=no-db");
  }

  const db = getPrisma();
  const updates = [
    { key: "quality_policy", value: formData.get("quality_policy") as string },
    { key: "safety_policy", value: formData.get("safety_policy") as string },
  ];

  await Promise.all(
    updates.map(({ key, value }) =>
      db.siteSetting.upsert({
        where: { key },
        update: { value: value ?? "" },
        create: { key, value: value ?? "" },
      }),
    ),
  );

  redirect("/admin/quality-safety?saved=1");
}

export default async function AdminQualitySafetyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const settings = await getSiteSettings();

  const qualityPolicy =
    settings["quality_policy"] ||
    "At Dockside Constructions, we are committed to delivering projects that meet or exceed client expectations through disciplined execution, continuous improvement, and adherence to the highest quality standards. Our ISO 9001:2015 certified management system ensures that quality is built into every process — from initial planning through to project handover.";

  const safetyPolicy =
    settings["safety_policy"] ||
    "The safety of our workers, clients, and communities is our highest priority. We operate under a zero-compromise safety culture supported by ISO 45001:2018 occupational health and safety management systems. Every worker on a Dockside site is equipped, trained, and empowered to stop any unsafe act.";

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <h1>Quality &amp; Safety Policies</h1>
          <p className="text-muted-foreground text-sm">
            Edit the quality and safety policy statements displayed on the public{" "}
            <a href="/quality-safety" target="_blank" rel="noreferrer" className="underline">
              /quality-safety
            </a>{" "}
            page. Changes are saved to the database and take effect immediately.
          </p>
        </div>
      </div>

      {params.saved && (
        <div className="admin-alert admin-alert--success">
          ✅ Policies saved successfully.
        </div>
      )}

      {params.error === "no-db" && (
        <div className="admin-alert admin-alert--warning">
          ⚠️ Database not available. Policies cannot be saved right now.
        </div>
      )}

      <form action={savePolicies} className="admin-form">
        <div className="admin-form__field">
          <label htmlFor="quality_policy">
            <strong>Quality Policy</strong>
            <span className="text-muted-foreground text-xs">
              Shown in the Quality section of the public Quality &amp; Safety page.
            </span>
          </label>
          <textarea
            id="quality_policy"
            name="quality_policy"
            rows={6}
            defaultValue={qualityPolicy}
            placeholder="Enter your quality policy statement…"
            className="admin-textarea"
            required
          />
        </div>

        <div className="admin-form__field">
          <label htmlFor="safety_policy">
            <strong>Safety Policy</strong>
            <span className="text-muted-foreground text-xs">
              Shown in the Safety section of the public Quality &amp; Safety page.
            </span>
          </label>
          <textarea
            id="safety_policy"
            name="safety_policy"
            rows={6}
            defaultValue={safetyPolicy}
            placeholder="Enter your safety policy statement…"
            className="admin-textarea"
            required
          />
        </div>

        <div className="admin-form__actions">
          <button type="submit" className="admin-btn admin-btn--primary">
            Save Policies
          </button>
          <a href="/quality-safety" target="_blank" rel="noreferrer" className="admin-btn admin-btn--ghost">
            Preview Public Page ↗
          </a>
        </div>
      </form>
    </div>
  );
}
