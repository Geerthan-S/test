import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { canUseDatabase, getPrisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json({ error: message }, { status: 422 });
    }

    const { name, email, message } = parsed.data;
    const fullMessage = parsed.data.phone
      ? `Phone: ${parsed.data.phone}\n\n${message}`
      : message;

    if (canUseDatabase()) {
      await getPrisma().contactMessage.create({
        data: { name, email, message: fullMessage },
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[contact] POST error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
