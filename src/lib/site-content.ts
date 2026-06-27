import {
  employeeBenefits,
  faqs,
  homeReferenceImages,
  industrialImages,
  projectReferenceImages,
  certificationCertificates,
  leadershipProfiles,
  serviceCategories,
  technicalCapabilityCards,
} from "@/lib/content";

export type SitePageItem = {
  title: string;
  text?: string;
  meta?: string;
  href?: string;
  image?: string;
  items?: string[];
};

export type SitePageSection = {
  id: string;
  label: string;
  heading: string;
  body?: string;
  layout?:
    | "grid"
    | "split"
    | "timeline"
    | "gallery"
    | "faq"
    | "cta"
    | "list"
    | "metrics"
    | "intro"
    | "approach"
    | "leadership"
    | "certifications"
    | "industries"
    | "project-exposure"
    | "why-trust"
    | "profile-download"
    | "final-cta";
  media?: string;
  items?: SitePageItem[];
  faqs?: Array<{ question: string; answer: string }>;
  cta?: {
    label: string;
    href: string;
    download?: boolean;
  };
  ctaSecondary?: {
    label: string;
    href: string;
  };
};

export type EditableSitePage = {
  slug: string;
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  sections: SitePageSection[];
  published: boolean;
};

const serviceSectionItems = serviceCategories.map((service) => ({
  title: service.title,
  text: service.shortDescription,
  href: "/services",
  image: service.image,
  meta: "Service line",
  items: [
    `Benefit: ${service.benefits[0]}`,
    `Typical scope: ${service.deliverables.slice(0, 2).join(", ")}`,
    `Example deliverables: ${service.deliverables.slice(2, 4).join(", ")}`,
  ],
}));

const defaultTopLevelPages: EditableSitePage[] = [
  {
    slug: "home",
    title: "Home",
    description:
      "Premium enterprise homepage for Dockside Constructions Private Limited.",
    heroTitle: "ENGINEERING-LED|INFRASTRUCTURE|DELIVERED WITH|DISCIPLINE.",
    heroDescription:
      "Industrial, commercial and infrastructure projects executed through engineering expertise, structured planning and proven delivery systems.",
    heroImage: homeReferenceImages.hero,
    published: true,
    sections: [
      {
        id: "company-introduction",
        label: "About Dockside",
        heading: "PRECISION IN ENGINEERING. CONFIDENCE IN DELIVERY.",
        body:
          "Dockside Constructions helps owners move from scope to handover with disciplined planning, documented systems and accountable site execution.",
        layout: "split",
        media: homeReferenceImages.about,
        cta: { label: "ABOUT US", href: "/about" },
        items: [
          { title: "Engineering-led planning" },
          { title: "ISO-certified processes" },
          { title: "Dedicated project controls" },
          { title: "On-time delivery culture" },
          { title: "Experienced site teams" },
          { title: "Transparent reporting" },
        ],
      },
      {
        id: "core-services-overview",
        label: "Core Services Overview",
        heading: "OUR CORE CAPABILITIES",
        body:
          "Civil construction, roads, railway siding support, electrical works, industrial projects, project management, drainage and road safety systems.",
        layout: "grid",
        items: serviceSectionItems,
      },
      {
        id: "why-choose-us",
        label: "Why Dockside",
        heading: "WHY CLIENTS CHOOSE DOCKSIDE.",
        body:
          "Dockside is built for clients who expect engineering leadership, disciplined safety and dependable delivery.",
        layout: "why-trust",
        items: [
          {
            title: "ENGINEERING",
            text: "Technical planning, design coordination and execution control.",
          },
          {
            title: "SAFETY",
            text: "ISO-compliant systems with disciplined site practices.",
          },
          {
            title: "DELIVERY",
            text: "Milestone-driven execution with transparent reporting.",
          },
        ],
      },
      {
        id: "faqs",
        label: "FAQs",
        heading: "Common questions before engaging Dockside.",
        layout: "faq",
        faqs,
      },
      {
        id: "get-a-quote-cta",
        label: "Final CTA",
        heading: "READY TO DISCUSS YOUR NEXT PROJECT?",
        body:
          "Connect with Dockside's engineering and project delivery teams.",
        layout: "cta",
        media: industrialImages.crane,
        cta: { label: "GET A QUOTE", href: "/contact" },
      },
    ],
  },
  {
    slug: "about",
    title: "About",
    description:
      "Engineering-led company profile, leadership, certifications, project exposure and trust proof.",
    heroTitle: "An Engineering-Led|Company Built For|Reliable Project Delivery.",
    heroDescription:
      "Dockside Constructions delivers industrial, commercial and infrastructure projects through engineering expertise, disciplined execution and long-term client commitment.",
    heroImage: industrialImages.aboutHero,
    published: true,
    sections: [
      {
        id: "company-snapshot",
        label: "Company Snapshot",
        heading: "At a glance",
        layout: "metrics",
        items: [
          { title: "65+", text: "Works Delivered" },
          { title: "8", text: "Core Service Lines" },
          { title: "10", text: "Key References" },
          { title: "20+", text: "Industrial Works" },
          { title: "3", text: "ISO Certifications" },
        ],
      },
      {
        id: "who-we-are",
        label: "Who We Are",
        heading: "Built on discipline. Driven by engineering.",
        body:
          "Dockside Constructions is a professionally driven construction and infrastructure company focused on delivering industrial, commercial and public-sector projects.\n\nThrough structured planning, technical expertise and quality-focused execution, we help clients transform concepts into dependable long-term assets.",
        layout: "intro",
        media: industrialImages.planning,
        cta: { label: "Download company profile", href: "/Dockside%20Business%20Profile.pdf", download: true },
      },
      {
        id: "our-approach",
        label: "Our Approach",
        heading: "How we think",
        layout: "approach",
        items: [
          {
            title: "Engineering First",
            text: "Every decision is guided by technical expertise and practical execution.",
          },
          {
            title: "Execution Discipline",
            text: "Structured planning and controlled delivery drive project success.",
          },
          {
            title: "Long-Term Value",
            text: "Projects are built for performance, durability and reliability.",
          },
        ],
      },
      {
        id: "leadership-team",
        label: "Leadership Team",
        heading: "Leadership that drives project success",
        layout: "leadership",
        items: leadershipProfiles.map((profile, index) => ({
          ...profile,
          image: [
            industrialImages.planning,
            industrialImages.site,
            industrialImages.foundation,
            industrialImages.structure,
          ][index],
          text: "",
        })),
      },
      {
        id: "certifications",
        label: "Certifications",
        heading: "Certified systems. Consistent standards.",
        layout: "certifications",
        items: certificationCertificates.map((certificate) => ({
          title: certificate.code.split(":")[0],
          text: `${certificate.code} ${certificate.title} - Certificate ${certificate.certificateNo}`,
          image: certificate.image,
        })),
      },
      {
        id: "industries-we-serve",
        label: "Industries We Serve",
        heading: "Industries we support",
        layout: "industries",
        items: [
          { title: "Industrial Manufacturing", text: "Factories, production facilities and industrial support infrastructure." },
          { title: "Logistics & Warehousing", text: "Distribution centers, industrial parks and logistics developments." },
          { title: "Commercial Development", text: "Office spaces, commercial complexes and mixed-use developments." },
          { title: "Government Infrastructure", text: "Roads, drainage systems, public works and civic infrastructure." },
          { title: "Residential Development", text: "Housing projects, structural construction and community developments." },
          { title: "Institutional Projects", text: "Educational, public-service and community-oriented facilities." },
        ],
      },
      {
        id: "project-exposure",
        label: "Project Exposure",
        heading: "Proven through project experience",
        layout: "project-exposure",
        cta: { label: "View project portfolio", href: "/projects" },
        items: [
          { title: "Whirlpool India", meta: "20+ Works", text: "INR 400+ Lakhs" },
          { title: "PWD & DRDA", meta: "15+ Works", text: "INR 400+ Lakhs" },
          { title: "Lodha Industrial Park", meta: "INR 5000+ Lakhs (INR 50+ Crores)" },
          { title: "Adani Logistics", meta: "INR 10 Crores" },
          { title: "Chennai One IT SEZ", meta: "INR 300+ Crores Overall Project Value" },
        ],
      },
      {
        id: "why-dockside",
        label: "Why Dockside",
        heading: "Why clients trust Dockside",
        layout: "why-trust",
        items: [
          { title: "Engineering Leadership" },
          { title: "Industrial Expertise" },
          { title: "ISO-Certified Systems" },
          { title: "Infrastructure Capability" },
          { title: "Safety Culture" },
          { title: "Reliable Delivery" },
        ],
      },
      {
        id: "corporate-profile",
        label: "Corporate Profile",
        heading: "Explore our capabilities",
        body:
          "Learn more about Dockside's services, project portfolio and engineering expertise.",
        layout: "profile-download",
        media: industrialImages.site,
        cta: { label: "Download profile", href: "/Dockside%20Business%20Profile.pdf", download: true },
      },
      {
        id: "about-final-cta",
        label: "Next Step",
        heading: "Ready to discuss your next project?",
        body:
          "Connect directly with Dockside's engineering and project delivery teams.",
        layout: "final-cta",
        media: industrialImages.crane,
        cta: { label: "Get a quote", href: "/contact" },
        ctaSecondary: { label: "View projects", href: "/projects" },
      },
    ],
  },
  {
    slug: "services",
    title: "Services",
    description:
      "Core services for civil construction, roads, railway works, electrical works, industrial projects, project management, drainage and road safety systems.",
    heroTitle: "Core Construction And Infrastructure Services From Planning To Handover",
    heroDescription:
      "Civil construction, BT and CC roads, railway siding infrastructure, HT/LT electrical works, industrial projects, project management, water infrastructure, drainage and traffic safety systems.",
    heroImage: industrialImages.servicesHero,
    published: true,
    sections: [
      {
        id: "service-selection",
        label: "Service Selection",
        heading: "Choose the service line that matches your project context.",
        body:
          "Each service page explains scope, deliverables, execution process, owner benefits and common questions so visitors can understand exactly where Dockside can support their project.",
        layout: "grid",
        items: serviceSectionItems,
      },
      {
        id: "technical-capabilities",
        label: "Additional Technical Capabilities",
        heading: "Specialized capabilities connected to service delivery.",
        body:
          "These supporting cards summarize the technical execution areas that often sit inside larger civil, infrastructure and industrial scopes.",
        layout: "grid",
        items: technicalCapabilityCards,
      },
    ],
  },
  {
    slug: "projects",
    title: "Projects",
    description:
      "Portfolio overview and client success stories.",
    heroTitle: "Project Proof Across Industrial, Commercial And Infrastructure Work",
    heroDescription:
      "Selected programs for Whirlpool, Lodha Industrial Park, Adani Logistics, Chennai One IT SEZ and public infrastructure clients.",
    heroImage: industrialImages.heroCinematic,
    published: true,
    sections: [
      {
        id: "portfolio-overview",
        label: "Portfolio Overview",
        heading: "A portfolio shaped by repeat industrial works and large-format site development.",
        body:
          "The project library highlights execution across active facilities, logistics assets, commercial campus development, public works and civil infrastructure.",
        layout: "split",
        media: projectReferenceImages.lodha,
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    description:
      "Contact form, phone number, email, office location, maps, social links and WhatsApp.",
    heroTitle: "Speak With Dockside About Your Next Project",
    heroDescription:
      "Connect with DCPL for civil construction, roads, railway works, electrical works, industrial projects, project management, drainage and road safety inquiries.",
    heroImage: industrialImages.hero,
    published: true,
    sections: [
      {
        id: "office-information",
        label: "Office Location",
        heading: "Registered office, response promise and direct contact channels.",
        body: "No.56, V.G.P. Nagar East, Salamedu, Villupuram - 605401",
        layout: "grid",
        items: [
          { title: "Phone Number", text: "+91 89259 22737", href: "tel:+918925922737" },
          { title: "Email Address", text: "admin@docksideconstructions.com", href: "mailto:admin@docksideconstructions.com" },
          { title: "Response Time Promise", text: "Every serious project enquiry is reviewed by the appropriate engineering or delivery team." },
          { title: "Business Hours", text: "Monday to Saturday, 9:30 AM to 6:30 PM IST." },
          { title: "WhatsApp Chat", text: "+91 89259 22737", href: "https://wa.me/918925922737" },
          { title: "Google Maps", text: "Open Dockside's registered office location.", href: "https://www.google.com/maps/search/?api=1&query=No.56%20V.G.P.%20Nagar%20East%20Salamedu%20Villupuram%20605401" },
          { title: "Social Media Links", text: "LinkedIn, Instagram and corporate updates." },
        ],
      },
      {
        id: "department-contacts",
        label: "Direct Department Contacts",
        heading: "Route your enquiry to the right team faster.",
        layout: "grid",
        items: [
          { title: "Project Enquiries", text: "Industrial, commercial, infrastructure and site-development discussions.", href: "mailto:admin@docksideconstructions.com" },
          { title: "Engineering Review", text: "Drawings, quantities, technical scope and feasibility clarifications.", href: "mailto:admin@docksideconstructions.com" },
        ],
      },
    ],
  },
  {
    slug: "clients",
    title: "Clients",
    description:
      "Client proof and sector experience for Dockside Constructions across industrial, public sector, logistics, commercial and institutional environments.",
    heroTitle: "CLIENTS WHO TRUST|DISCIPLINED|CONSTRUCTION DELIVERY.",
    heroDescription:
      "A focused view of organizations and sectors supported by Dockside's civil, infrastructure, industrial and project delivery teams.",
    heroImage: projectReferenceImages.whirlpool,
    published: true,
    sections: [
      {
        id: "client-proof",
        label: "Client Proof",
        heading: "Trusted by industrial leaders, public-sector teams and infrastructure owners.",
        body:
          "Dockside's client base spans industrial manufacturing, logistics parks, public works, commercial campuses and institutional infrastructure.",
        layout: "grid",
        items: [
          { title: "Industrial manufacturing", text: "Repeat facility works, utility interfaces and production-support buildings." },
          { title: "Public infrastructure", text: "Roads, drainage, civic works and accountable delivery for public-sector environments." },
          { title: "Logistics and commercial campuses", text: "Large-format site development, civil works and operating-ready project support." },
        ],
      },
    ],
  },
];

export const defaultSitePages = defaultTopLevelPages;

export const sitePageRouteBySlug = new Map<string, string>([
  ["home", "/"],
  ["about", "/about"],
  ["services", "/services"],
  ["projects", "/projects"],
  ["clients", "/clients"],
  ["contact", "/contact"],
]);

export function getDefaultSitePage(slug: string) {
  return defaultSitePages.find((page) => page.slug === slug) ?? null;
}

export function getSitePageRoute(slug: string) {
  return sitePageRouteBySlug.get(slug) ?? `/${slug}`;
}
