import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { canUseDatabase, getPrisma } from "@/lib/prisma";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const contactSchema = z.object({
  inquiryType: z.enum(["General", "Project", "Grievance"]).default("General"),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(6, "Phone number must be at least 6 characters"),
  company: z.string().trim().optional(),
  grievanceCategory: z.string().trim().optional(),
  projectLocation: z.string().trim().optional(),
  priorityLevel: z.enum(["Low", "Medium", "High", "Urgent"]).optional(),
  preferredContactMethod: z.enum(["Email", "Phone", "Either"]).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

async function uploadFileToCloudinary(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "dockside-contact",
        secure: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url || "");
      }
    );
    stream.end(buffer);
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const data = {
      inquiryType: formData.get("inquiryType"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      grievanceCategory: formData.get("grievanceCategory"),
      projectLocation: formData.get("projectLocation"),
      priorityLevel: formData.get("priorityLevel"),
      preferredContactMethod: formData.get("preferredContactMethod"),
      message: formData.get("message"),
    };

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json({ error: message }, { status: 422 });
    }

    // Handle file uploads
    let attachmentUrls: string[] = [];
    const files = formData.getAll("attachments") as File[];

    if (files.length > 0) {
      for (const file of files) {
        if (file.size > 0) {
          // Only upload non-empty files
          const url = await uploadFileToCloudinary(file);
          attachmentUrls.push(url);
        }
      }
    }

    // Create contact message in database
    if (canUseDatabase()) {
      const enrichedMessage = [
        `Inquiry Type: ${parsed.data.inquiryType}`,
        `Priority: ${parsed.data.priorityLevel || "Not specified"}`,
        `Contact Method: ${parsed.data.preferredContactMethod || "Not specified"}`,
        "",
        parsed.data.message,
        "",
        ...(parsed.data.grievanceCategory
          ? [`Grievance Category: ${parsed.data.grievanceCategory}`]
          : []),
        ...(parsed.data.projectLocation
          ? [`Project/Location: ${parsed.data.projectLocation}`]
          : []),
        ...(parsed.data.company ? [`Company: ${parsed.data.company}`] : []),
      ].join("\n");

      await getPrisma().contactMessage.create({
        data: {
          id: crypto.randomUUID(),
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          company: parsed.data.company || undefined,
          inquiryType: parsed.data.inquiryType,
          grievanceCategory: parsed.data.grievanceCategory || undefined,
          projectLocation: parsed.data.projectLocation || undefined,
          priorityLevel: parsed.data.priorityLevel || undefined,
          preferredContactMethod: parsed.data.preferredContactMethod || undefined,
          message: enrichedMessage,
          attachments: attachmentUrls,
        },
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[contact] POST error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
