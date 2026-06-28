import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UsersRound,
  AlertTriangle,
} from "lucide-react";
import { getClients } from "@/lib/repositories";
import { seedClients } from "@/lib/content";
import { ClientLogoMarquee } from "@/components/client-logo-marquee";
import { ContactForm } from "@/components/contact/ContactForm";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Contact | Dockside Constructions",
  description:
    "Get in touch with Dockside Constructions. Contact our team for inquiries, project requests, or grievances. We're here to help.",
};

const reasons = [
  {
    title: "Expert Team",
    text: "Experienced professionals ready to understand your requirements.",
    icon: UsersRound,
  },
  {
    title: "Reliable Support",
    text: "Prompt responses and dedicated support at every step.",
    icon: ShieldCheck,
  },
  {
    title: "Tailored Solutions",
    text: "Customized solutions that fit your project and goals.",
    icon: ShieldCheck,
  },
  {
    title: "On-Time Delivery",
    text: "Commitment to deadlines and efficient execution always.",
    icon: ShieldCheck,
  },
  {
    title: "Quality Assured",
    text: "Highest standards of quality, safety and compliance.",
    icon: ShieldCheck,
  },
];

export default async function ContactPage() {
  const clientRecords = await getClients().catch(() => seedClients);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8">
            <span className="text-[11px] font-bold tracking-widest text-[#8A3841] uppercase">
              LET'S BUILD TOGETHER
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#8A3841] mt-3 mb-4 leading-tight">
              GET IN TOUCH WITH DOCKSIDE
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              Have a project in mind, need more information, or want to share feedback? We're
              here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Contact Section */}
      <section className="px-4 md:px-8 py-12 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            {/* Contact Info Box */}
            <div className="bg-gray-50 p-8 rounded-lg space-y-8">
              <div>
                <h2 className="text-[11px] font-bold tracking-widest text-[#8A3841] uppercase mb-6">
                  Contact Information
                </h2>
              </div>

              {/* Registered Office */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#8A3841] text-white">
                    <MapPin className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">REGISTERED OFFICE</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    No.56, V.G.P. Nagar East,<br />
                    Salamedu, Villupuram - 605401<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#8A3841] text-white">
                    <Phone className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">PHONE</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    <a href="tel:+918825922737" className="hover:text-[#8A3841]">
                      +91 88259 22737
                    </a>
                    <br />
                    <a href="tel:+919940100557" className="hover:text-[#8A3841]">
                      +91 99401 00557
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#8A3841] text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">EMAIL</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    <a
                      href="mailto:admin@docksideconstructions.com"
                      className="hover:text-[#8A3841]"
                    >
                      admin@docksideconstructions.com
                    </a>
                    <br />
                    <a
                      href="mailto:projects@docksideconstructions.com"
                      className="hover:text-[#8A3841]"
                    >
                      projects@docksideconstructions.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#8A3841] text-white">
                    <Clock3 className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">OFFICE HOURS</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Monday - Saturday<br />
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-[#2B1116] p-6 rounded-lg text-white space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider">
                    Emergency Support
                  </h3>
                  <p className="text-sm text-gray-300 mt-2">
                    For urgent site support or equipment breakdown, call anytime.
                  </p>
                </div>
              </div>
              <a
                href="tel:+918825922737"
                className="inline-block bg-[#8A3841] hover:bg-[#6B2F33] text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
              >
                <Phone className="h-4 w-4 inline mr-2" />
                +91 88259 22737
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white">
            <div className="mb-6">
              <h2 className="text-[11px] font-bold tracking-widest text-[#8A3841] uppercase mb-4">
                Send us a message
              </h2>
              <h3 className="text-2xl font-bold text-gray-900">
                We will get back to you
              </h3>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Why Connect Section */}
      <section className="px-4 md:px-8 py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <span className="text-[11px] font-bold tracking-widest text-[#8A3841] uppercase">
              Why connect with us?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              We're committed to your success
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div key={reason.title} className="bg-white p-6 rounded-lg">
                  <Icon className="h-8 w-8 text-[#8A3841] mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">{reason.title}</h3>
                  <p className="text-sm text-gray-600">{reason.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clients Strip */}
      <section className="px-4 md:px-8 py-16 bg-white border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-center text-gray-600 text-sm mb-8">
            Trusted by industrial leaders & public sector organizations
          </p>
          <ClientLogoMarquee clients={clientRecords} />
        </div>
      </section>
    </div>
  );
}
