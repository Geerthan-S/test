import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ArrowRight,
  Clock3,
  Cog,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Timer,
  UsersRound,
} from "lucide-react";
import { seedClients } from "@/lib/content";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import { getClients } from "@/lib/repositories";
import { ClientLogoMarquee } from "@/components/client-logo-marquee";

export const metadata = { title: "Contact" };

const OFFICE_LAT = "12.886303218652689";
const OFFICE_LNG = "80.0823886117243";
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${OFFICE_LAT},${OFFICE_LNG}`;
const mapUrl = `https://www.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&z=15&output=embed`;

const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  phone: z.string().min(6),
  email: z.string().email(),
  projectType: z.string().min(2),
  message: z.string().min(10),
});

async function submitContact(formData: FormData) {
  "use server";

  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (parsed.success && canUseDatabase()) {
    const { name, email, message, ...details } = parsed.data;
    const enrichedMessage = [
      message,
      "",
      "Project enquiry details:",
      `Company: ${details.company || "Not provided"}`,
      `Phone: ${details.phone}`,
      `Project type: ${details.projectType}`,
      `Map location: ${OFFICE_LAT}, ${OFFICE_LNG}`,
    ].join("\n");

    await getPrisma().contactMessage.create({
      data: {
        name,
        email,
        message: enrichedMessage,
      },
    });
  }

  redirect("/contact/thank-you");
}

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
    icon: Cog,
  },
  {
    title: "On-Time Delivery",
    text: "Commitment to deadlines and efficient execution always.",
    icon: Timer,
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
    <div className="shot-page shot-page--contact">
      <section className="shot-subhero shot-subhero--contact">
        <div className="shot-subhero__inner">
          <span className="shot-kicker">LET&apos;S BUILD TOGETHER</span>
          <h1>
            Every Successful Project Starts with the Right Conversation<em>.</em>
          </h1>
          <p>
            Whether you&apos;re planning an industrial facility, commercial development or
            infrastructure project, our team is ready to discuss your requirements and help
            bring your vision to life.
          </p>
          <div className="shot-subhero__actions">
            <Link href="#contact-form" className="shot-button shot-button--fill">
              Request a Quote <ArrowRight aria-hidden="true" />
            </Link>
            <a href="tel:+918825922737" className="shot-button shot-button--outline">
              Contact Our Team <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="shot-contact-panel">
        <div className="shot-contact-info">
          <span>Contact Information</span>
          <h2>Reach out to Dockside</h2>
          <div className="shot-contact-info__list">
            <article>
              <MapPin aria-hidden="true" />
              <div>
                <h3>Registered Office</h3>
                <p>No.56, V.G.P. Nagar East,<br />Salamedu, Villupuram - 605401<br />Tamil Nadu, India</p>
              </div>
            </article>
            <article>
              <Phone aria-hidden="true" />
              <div>
                <h3>Phone</h3>
                <p><a href="tel:+918925922737">+91 89259 22737</a><br /><a href="tel:+919940100557">+91 99401 00557</a></p>
              </div>
            </article>
            <article>
              <Mail aria-hidden="true" />
              <div>
                <h3>Email</h3>
                <p><a href="mailto:admin@docksideconstructions.com">admin@docksideconstructions.com</a><br /><a href="mailto:projects@docksideconstructions.com">projects@docksideconstructions.com</a></p>
              </div>
            </article>
            <article>
              <Clock3 aria-hidden="true" />
              <div>
                <h3>Office Hours</h3>
                <p>Monday - Saturday<br />9:00 AM - 6:00 PM</p>
              </div>
            </article>
          </div>
        </div>

        <form id="contact-form" action={submitContact} className="shot-contact-form">
          <span>Send us a message</span>
          <h2>We will get back to you</h2>
          <div className="shot-contact-form__grid">
            <input name="name" placeholder="Full Name *" required />
            <input name="email" type="email" placeholder="Email Address *" required />
            <input name="phone" placeholder="Phone Number *" required />
            <input name="company" placeholder="Company Name" />
            <select name="projectType" defaultValue="" required>
              <option value="" disabled>Project Type / Service Required</option>
              <option value="Civil Construction">Civil Construction</option>
              <option value="Road & Highways">Road & Highways</option>
              <option value="Railway Works">Railway Works</option>
              <option value="Electrical Works">Electrical Works</option>
              <option value="Industrial Projects">Industrial Projects</option>
              <option value="Project Management">Project Management</option>
            </select>
            <textarea name="message" placeholder="Your Message *" rows={5} required />
          </div>
          <button type="submit">
            Send Message <ArrowRight aria-hidden="true" />
          </button>
          <p>
            <LockKeyhole aria-hidden="true" />
            Your information is secure and will never be shared.
          </p>
        </form>
      </section>

      <section className="shot-contact-reasons">
        <span>Why connect with us?</span>
        <h2>We&apos;re committed to your success</h2>
        <div>
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <article key={reason.title}>
                <Icon aria-hidden="true" />
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="shot-contact-location">
        <div>
          <span>Our Location</span>
          <h2>Find us here</h2>
          <p>No.56, V.G.P. Nagar East<br />Salamedu, Villupuram - 605401<br />Tamil Nadu, India</p>
          <Link href={directionsUrl} target="_blank" rel="noreferrer" className="shot-button shot-button--outline">
            <MapPin aria-hidden="true" />
            Get Directions <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="shot-contact-map">
          <iframe title="Dockside Constructions map location" loading="lazy" src={mapUrl} />
          <div className="shot-contact-map__pin">
            <MapPin aria-hidden="true" />
            <strong>Dockside Constructions<br />Private Limited</strong>
          </div>
        </div>
      </section>

      <section className="shot-client-strip shot-client-strip--contact">
        <span>Trusted by industrial leaders & public sector organizations</span>
        <ClientLogoMarquee clients={clientRecords} />
      </section>
    </div>
  );
}
