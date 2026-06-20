"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteFile } from "../actions";
import { useRouter } from "next/navigation";

export function DeleteFileButton({ publicId }: { publicId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this image permanently?")) return;
    setLoading(true);
    await deleteFile(publicId);
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      className="admin-btn admin-btn--ghost admin-btn--danger-hover"
      onClick={handleDelete}
      disabled={loading}
      aria-label="Delete this image"
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <Trash2 className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
