import Link from "next/link";
import { ExternalLink, Calendar, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requireAdmin } from "@/lib/admin";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import { updateApplicationStatus } from "@/app/admin/actions";

export const metadata = { title: "Job Applications CMS" };

const STATUS_OPTIONS = [
  { value: "NEW", label: "New", color: "bg-blue-100 text-blue-800" },
  { value: "REVIEWED", label: "Reviewed", color: "bg-yellow-100 text-yellow-800" },
  { value: "SHORTLISTED", label: "Shortlisted", color: "bg-green-100 text-green-800" },
  { value: "REJECTED", label: "Rejected", color: "bg-red-100 text-red-800" },
];

export default async function AdminJobApplicationsPage() {
  await requireAdmin();

  let applications = [];
  let dbAvailable = canUseDatabase();

  if (dbAvailable) {
    try {
      const db = getPrisma();
      applications = await db.jobApplication.findMany({
        include: {
          jobOpening: {
            select: {
              title: true,
              department: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      console.error("Failed to fetch job applications:", error);
      dbAvailable = false;
    }
  }

  const getStatusStyle = (status: string) => {
    const option = STATUS_OPTIONS.find((opt) => opt.value === status);
    return option?.color || "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <div className="admin-page-title flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1>Job Applications</h1>
          <p className="mt-2 text-muted-foreground">
            Review and manage candidate applications for open positions.
          </p>
        </div>
      </div>

      {!dbAvailable ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Connect PostgreSQL and run migrations to view job applications.
        </p>
      ) : null}

      {applications.length === 0 && dbAvailable ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <Briefcase className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">No Applications Yet</h3>
          <p className="text-sm text-gray-600">
            When candidates apply for positions, their applications will appear here.
          </p>
        </div>
      ) : null}

      {applications.length > 0 ? (
        <div className="admin-table-shell">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {applications.length} {applications.length === 1 ? "application" : "applications"} total
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app: any) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{app.name}</span>
                      <span className="text-xs text-muted-foreground">{app.email}</span>
                      <span className="text-xs text-muted-foreground">{app.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{app.jobOpening.title}</TableCell>
                  <TableCell>{app.jobOpening.department}</TableCell>
                  <TableCell>
                    <form action={updateApplicationStatus} className="inline">
                      <input type="hidden" name="applicationId" value={app.id} />
                      <select
                        name="status"
                        defaultValue={app.status}
                        onChange={(e) => e.currentTarget.form?.requestSubmit()}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(app.status)}`}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </form>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-3 mr-1" />
                        Resume
                      </a>
                    </Button>
                    {app.coverLetter ? (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/job-applications/${app.id}`}>View Details</Link>
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}
