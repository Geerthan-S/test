import { NextResponse } from "next/server";
import { seedProjects } from "@/lib/content";
import { canUseDatabase, getPrisma } from "@/lib/prisma";

export async function GET() {
  if (!canUseDatabase()) {
    return NextResponse.json(seedProjects.flatMap((project) => project.testimonial ? [project.testimonial] : []));
  }
  return NextResponse.json(await getPrisma().testimonial.findMany({ orderBy: { updatedAt: "desc" } }));
}

export async function POST() {
  return NextResponse.json(
    { error: "Testimonials management has been removed from the admin dashboard." },
    { status: 410 },
  );
}
