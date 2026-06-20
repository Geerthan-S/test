"use server";

import { revalidatePath } from "next/cache";

// ── Cloudinary SDK lazy-loaded to avoid errors when env vars are missing ──────

async function getCloudinary() {
  const { v2: cloudinary } = await import("cloudinary");
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return cloudinary;
}

const CMS_ROOT = "dockside-cms";

function isCloudinaryConfigured() {
  return (
    !!process.env.CLOUDINARY_CLOUD_NAME &&
    !!process.env.CLOUDINARY_API_KEY &&
    !!process.env.CLOUDINARY_API_SECRET
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface FolderInfo {
  name: string;
  path: string;
  assetCount?: number;
  previewUrl?: string;
}

export interface FileInfo {
  publicId: string;
  url: string;
  format: string;
  width: number;
  height: number;
  createdAt: string;
  bytes: number;
  displayName: string;
}

// ── Server Actions ─────────────────────────────────────────────────────────────

export async function getFolders(): Promise<FolderInfo[]> {
  if (!isCloudinaryConfigured()) {
    return [
      { name: "project-alpha", path: `${CMS_ROOT}/project-alpha` },
      { name: "project-beta", path: `${CMS_ROOT}/project-beta` },
      { name: "company-profile", path: `${CMS_ROOT}/company-profile` },
    ];
  }

  const cloudinary = await getCloudinary();
  const result = await cloudinary.api.sub_folders(CMS_ROOT).catch(() => ({ folders: [] }));
  return (result.folders ?? []).map((f: { name: string; path: string }) => ({
    name: f.name,
    path: f.path,
  }));
}

export async function createFolder(name: string): Promise<{ ok: boolean; error?: string }> {
  const safe = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-");

  if (!safe) return { ok: false, error: "Invalid folder name." };
  if (!isCloudinaryConfigured()) {
    return { ok: false, error: "Cloudinary is not configured. Add env vars to enable this feature." };
  }

  const cloudinary = await getCloudinary();
  await cloudinary.api.create_folder(`${CMS_ROOT}/${safe}`);
  revalidatePath("/admin/files");
  return { ok: true };
}

export async function deleteFolder(folderName: string): Promise<{ ok: boolean; error?: string }> {
  if (!isCloudinaryConfigured()) {
    return { ok: false, error: "Cloudinary is not configured." };
  }

  const cloudinary = await getCloudinary();
  const path = `${CMS_ROOT}/${folderName}`;

  // Delete all assets first
  await cloudinary.api.delete_resources_by_prefix(path).catch(() => null);
  // Then remove the folder
  await cloudinary.api.delete_folder(path).catch(() => null);

  revalidatePath("/admin/files");
  return { ok: true };
}

export async function getFilesInFolder(folderName: string): Promise<FileInfo[]> {
  if (!isCloudinaryConfigured()) return [];

  const cloudinary = await getCloudinary();
  const result = await cloudinary.api
    .resources({
      type: "upload",
      prefix: `${CMS_ROOT}/${folderName}/`,
      max_results: 100,
    })
    .catch(() => ({ resources: [] }));

  return (result.resources ?? []).map((r: any) => ({
    publicId: r.public_id,
    url: r.secure_url,
    format: r.format,
    width: r.width,
    height: r.height,
    createdAt: r.created_at,
    bytes: r.bytes,
    displayName: r.public_id.split("/").pop() ?? r.public_id,
  }));
}

export async function deleteFile(publicId: string): Promise<{ ok: boolean; error?: string }> {
  if (!isCloudinaryConfigured()) {
    return { ok: false, error: "Cloudinary is not configured." };
  }

  const cloudinary = await getCloudinary();
  await cloudinary.uploader.destroy(publicId);
  revalidatePath("/admin/files");
  return { ok: true };
}
