"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { createFolder } from "./actions";
import { useRouter } from "next/navigation";

export function CreateFolderForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");
    const result = await createFolder(name);
    setLoading(false);
    if (result.ok) {
      setOpen(false);
      setName("");
      router.refresh();
    } else {
      setError(result.error ?? "Failed to create folder.");
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        className="admin-btn admin-btn--primary"
        onClick={() => setOpen(true)}
      >
        <Plus className="size-4" aria-hidden="true" />
        New Folder
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="admin-inline-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="folder-name (e.g. project-alpha)"
        autoFocus
        required
        className="admin-input"
      />
      {error && <p className="admin-error-text">{error}</p>}
      <div className="admin-inline-form__actions">
        <button
          type="submit"
          className="admin-btn admin-btn--primary"
          disabled={loading}
        >
          {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
          Create
        </button>
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          onClick={() => { setOpen(false); setName(""); setError(""); }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
