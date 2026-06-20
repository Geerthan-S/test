import { redirect } from "next/navigation";

// Clients section has moved to the homepage — scroll to the #clients section
export default function ClientsPage() {
  redirect("/#clients");
}
