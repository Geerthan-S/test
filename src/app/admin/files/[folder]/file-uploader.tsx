"use client";

import { useRef, useState } from "react";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function FileUploader({ folderName }: { folderName: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    setStatus("uploading");
    setProgress(0);

    const total = files.length;
    let done = 0;

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folderName);

      try {
        await fetch("/api/uploads", {
          method: "POST",
          body: formData,
        });
      } catch {
        // continue uploading remaining files even if one fails
      }
      done++;
      setProgress(Math.round((done / total) * 100));
    }

    setStatus("done");
    router.refresh();
    setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <div className="admin-uploader">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {status === "idle" && (
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="size-4" aria-hidden="true" />
          Upload Images
        </button>
      )}
      {status === "uploading" && (
        <div className="admin-uploader__progress">
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          <span>Uploading… {progress}%</span>
        </div>
      )}
      {status === "done" && (
        <div className="admin-uploader__done">
          <CheckCircle2 className="size-4" aria-hidden="true" />
          <span>Upload complete!</span>
        </div>
      )}
    </div>
  );
}
