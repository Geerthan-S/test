import Link from "next/link";
import { Plus, Trash2, Briefcase, Info } from "lucide-react";
import { deleteJobOpening, updateCareerSetting } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requireAdmin } from "@/lib/admin";
import { getJobOpenings, getCareerSetting } from "@/lib/repositories";
import { CareerSettingsForm } from "@/components/admin/career-settings-form";
import { canUseDatabase } from "@/lib/prisma";

export const metadata = { title: "Careers CMS" };

export default async function AdminCareersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string; database?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const jobOpenings = await getJobOpenings();
  const careerSetting = await getCareerSetting();

  return (
    <div className="grid gap-8">
      <div className="admin-page-title flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1>Careers Management</h1>
          <p className="mt-2 text-muted-foreground">
            Manage requirements cards (job openings) and configure the behavior of the "Apply for Internship" button.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/careers/new">
            <Plus className="size-4" /> Add Job Opening
          </Link>
        </Button>
      </div>

      {params.saved ? (
        <p className="rounded-md border border-primary/30 bg-primary/10 p-4 text-sm text-primary">
          Changes saved successfully!
        </p>
      ) : null}

      {params.error ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Error: {params.error}
        </p>
      ) : null}

      {params.database || !canUseDatabase() ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Database connection is currently inactive. Changes made here will only persist when PostgreSQL is connected.
        </p>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Side: Job Openings Table */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="size-5 text-[#923e4d]" />
            <h2 className="text-xl font-semibold">Active Job Openings ({jobOpenings.length})</h2>
          </div>
          <div className="admin-table-shell mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobOpenings.length > 0 ? (
                  jobOpenings.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell className="flex justify-end gap-2">
                        <Button asChild variant="outline">
                          <Link href={`/admin/careers/${job.id}/edit`}>Edit</Link>
                        </Button>
                        <form action={deleteJobOpening.bind(null, job.id)}>
                          <Button variant="destructive" size="icon" aria-label="Delete job opening">
                            <Trash2 className="size-4" />
                          </Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No job openings found. Click "Add Job Opening" to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Side: Internship Button Settings */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Info className="size-5 text-[#923e4d]" />
            <h2 className="text-xl font-semibold">Internship Config</h2>
          </div>
          <CareerSettingsForm action={updateCareerSetting} setting={careerSetting} />
        </div>
      </div>
    </div>
  );
}
