import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Trash2, Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import { getFilesInFolder, deleteFile } from "../actions";
import { FileUploader } from "./file-uploader";
import { DeleteFileButton } from "./delete-file-button";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ folder: string }>;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function FolderPage({ params }: Props) {
  const { folder } = await params;
  const folderName = decodeURIComponent(folder);
  const files = await getFilesInFolder(folderName);

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <Link href="/admin/files" className="admin-back-link">
            <ArrowLeft className="size-4" aria-hidden="true" />
            All Folders
          </Link>
          <h1 className="mt-2">{folderName}</h1>
          <p className="text-muted-foreground text-sm">
            {files.length} {files.length === 1 ? "file" : "files"} in{" "}
            <code>dockside-cms/{folderName}</code>
          </p>
        </div>
        <FileUploader folderName={folderName} />
      </div>

      {!process.env.CLOUDINARY_CLOUD_NAME && (
        <div className="admin-alert admin-alert--warning">
          <AlertCircle className="size-5" aria-hidden="true" />
          <div>
            <strong>Cloudinary Not Configured</strong>
            <p>File uploads and deletions require valid Cloudinary environment variables.</p>
          </div>
        </div>
      )}

      {files.length === 0 ? (
        <div className="admin-empty">
          <ImageIcon className="size-12" aria-hidden="true" />
          <p>No files in this folder yet. Upload images above.</p>
        </div>
      ) : (
        <div className="admin-media-grid">
          {files.map((file) => (
            <div key={file.publicId} className="admin-media-card">
              <div className="admin-media-card__image">
                <Image
                  src={file.url}
                  alt={file.displayName}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="admin-media-card__footer">
                <div>
                  <p className="admin-media-card__name" title={file.displayName}>
                    {file.displayName}
                  </p>
                  <p className="admin-media-card__meta">
                    {file.width}×{file.height} · {formatBytes(file.bytes)}
                  </p>
                </div>
                <DeleteFileButton publicId={file.publicId} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
