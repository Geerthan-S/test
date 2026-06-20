"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface ContactFormProps {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  mapsUrl: string;
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="contact-form-success">
        <CheckCircle2 className="size-10" aria-hidden="true" />
        <h3>Message sent!</h3>
        <p>We will get back to you within 24 hours.</p>
        <button
          type="button"
          className="studio-button studio-button--outline"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label htmlFor="contact-name">Full Name *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your full name"
            required
            autoComplete="name"
          />
        </div>
        <div className="contact-form__field">
          <label htmlFor="contact-email">Email Address *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            autoComplete="email"
          />
        </div>
      </div>
      <div className="contact-form__field">
        <label htmlFor="contact-phone">Phone Number</label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder="+91 98765 43210"
          autoComplete="tel"
        />
      </div>
      <div className="contact-form__field">
        <label htmlFor="contact-message">Message *</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Describe your project requirement or enquiry..."
          required
        />
      </div>
      {status === "error" && (
        <p className="contact-form__error" role="alert">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        className="studio-button studio-button--fill contact-form__submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            Send Message <ArrowRight className="size-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

export function ContactSection({
  phone,
  email,
  address,
  workingHours,
  mapsUrl,
}: ContactFormProps) {
  return (
    <section id="contact" className="contact-section" aria-label="Contact Dockside">
      <div className="contact-section__inner">
        <div className="contact-section__head">
          <span className="contact-section__eyebrow">Get In Touch</span>
          <h2>Contact Us</h2>
          <p>
            Ready to discuss your next project? Reach out and our team will respond within 24 hours.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left — Contact Details */}
          <div className="contact-details">
            <dl>
              <div className="contact-detail-item">
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                </dd>
              </div>
              <div className="contact-detail-item">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${email}`}>{email}</a>
                </dd>
              </div>
              <div className="contact-detail-item">
                <dt>Office Address</dt>
                <dd>{address}</dd>
              </div>
              <div className="contact-detail-item">
                <dt>Working Hours</dt>
                <dd>{workingHours}</dd>
              </div>
            </dl>

            {/* Google Map */}
            {mapsUrl ? (
              <div className="contact-map">
                <iframe
                  src={mapsUrl}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dockside Constructions office location"
                />
              </div>
            ) : (
              <div className="contact-map contact-map--placeholder">
                <p>Map location coming soon</p>
              </div>
            )}
          </div>

          {/* Right — Contact Form */}
          <div className="contact-form-wrapper">
            <h3>Send Us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
