import { createJobOpening } from "@/app/admin/actions";
import { JobForm } from "@/components/admin/job-form";
import { requireAdmin } from "@/lib/admin";

export const metadata = { title: "Add Job Opening" };

export default async function NewJobOpeningPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; database?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  return (
    <div>
      <div className="admin-page-title">
        <h1>Add Job Opening</h1>
        <p className="mt-2 text-muted-foreground">Create a new career card for public applicants to view and apply to.</p>
      </div>
      {params?.error ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {params.error}
        </p>
      ) : null}
      {params?.database ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Database connection is currently inactive.
        </p>
      ) : null}
      <div className="mt-8">
        <JobForm action={createJobOpening} />
      </div>
    </div>
  );
}
