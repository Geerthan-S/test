import { redirect } from "next/navigation";

// About content has moved to the homepage — scroll to the #about section
export default function AboutPage() {
  redirect("/#about");
}
