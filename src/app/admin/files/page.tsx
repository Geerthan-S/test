import Link from "next/link";
import { FolderOpen, Plus, Folder, AlertCircle } from "lucide-react";
import { getFolders } from "./actions";
import { CreateFolderForm } from "./create-folder-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Files Manager | Admin" };

const isCloudinaryConfigured =
  !!process.env.CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET;

export default async function FilesManagerPage() {
  const folders = await getFolders();

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <h1>Files Manager</h1>
          <p className="text-muted-foreground text-sm">
            Manage media folders in Cloudinary <code>dockside-cms/</code> root. Each folder can
            be linked to a project gallery.
          </p>
        </div>
        <CreateFolderForm />
      </div>

      {!isCloudinaryConfigured && (
        <div className="admin-alert admin-alert--warning">
          <AlertCircle className="size-5" aria-hidden="true" />
          <div>
            <strong>Cloudinary Not Configured</strong>
            <p>
              Set <code>CLOUDINARY_CLOUD_NAME</code>, <code>CLOUDINARY_API_KEY</code>, and{" "}
              <code>CLOUDINARY_API_SECRET</code> environment variables to enable live media
              management. Showing placeholder folders for now.
            </p>
          </div>
        </div>
      )}

      {folders.length === 0 ? (
        <div className="admin-empty">
          <FolderOpen className="size-12" aria-hidden="true" />
          <p>No folders yet. Create your first folder above.</p>
        </div>
      ) : (
        <div className="admin-folder-grid">
          {folders.map((folder) => (
            <Link
              key={folder.path}
              href={`/admin/files/${encodeURIComponent(folder.name)}`}
              className="admin-folder-card"
            >
              <Folder className="size-8" aria-hidden="true" />
              <div>
                <strong>{folder.name}</strong>
                <span className="text-muted-foreground text-xs">{folder.path}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
