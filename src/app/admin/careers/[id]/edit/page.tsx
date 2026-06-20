import { redirect, notFound } from "next/navigation";
import { updateJobOpening } from "@/app/admin/actions";
import { JobForm } from "@/components/admin/job-form";
import { requireAdmin } from "@/lib/admin";
import { canUseDatabase, getPrisma } from "@/lib/prisma";

export const metadata = { title: "Edit Job Opening" };

export default async function EditJobOpeningPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const p = await searchParams;

  if (!canUseDatabase()) {
    redirect("/admin/careers?database=missing");
  }

  const job = await getPrisma().jobOpening.findUnique({
    where: { id },
  });

  if (!job) {
    notFound();
  }

  return (
    <div>
      <div className="admin-page-title">
        <h1>Edit Job Opening</h1>
        <p className="mt-2 text-muted-foreground">Modify details for this job requirement card.</p>
      </div>
      {p?.error ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {p.error}
        </p>
      ) : null}
      <div className="mt-8">
        <JobForm
          action={updateJobOpening.bind(null, id)}
          job={{
            id: job.id,
            title: job.title,
            department: job.department,
            experience: job.experience,
            location: job.location,
            type: job.type,
            skills: job.skills,
            published: job.published,
          }}
        />
      </div>
    </div>
  );
}
