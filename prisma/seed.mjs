import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const industrialImages = {
  structure:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=85",
  site:
    "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1600&q=85",
  crane:
    "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=1600&q=85",
  safety:
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85",
  warehouseDusk:
    "https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=1800",
  logisticsAerial:
    "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1800",
  industrialCampus:
    "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1800",
  steelExecution:
    "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1800",
};

const projectImages = {
  whirlpool: "/home-reference/project-whirlpool-facility.jpg",
  lodha: "/home-reference/project-lodha-industrial-park.jpg",
  adani: "/home-reference/project-adani-logistics.jpg",
  chennaiOne: "/home-reference/project-chennai-one-sez.jpg",
  stateHighway: "/home-reference/industry-infrastructure.jpg",
  manufacturingPlant: "/home-reference/industry-manufacturing.jpg",
  waterSupply: "/home-reference/industry-utilities.jpg",
};

const seedClients = [
  {
    id: "client-1",
    name: "Whirlpool of India Ltd",
    slug: "whirlpool-of-india",
    industry: "Industrial manufacturing",
    testimonial:
      "20+ executed works covering warehouse, packaging lab, reliability lab, fire hydrant pipeline, mezzanine, civil, electrical and interior scopes.",
    featured: true,
  },
  {
    id: "client-2",
    name: "Public Works Department, Puducherry",
    slug: "pwd-puducherry",
    industry: "Public infrastructure",
    testimonial:
      "15+ works across road strengthening, renewal, BT and CC road formation, drainage and infrastructure works.",
    featured: true,
  },
  {
    id: "client-3",
    name: "Lodha Industrial Park",
    slug: "lodha-industrial-park",
    industry: "Logistics parks",
    featured: true,
  },
  {
    id: "client-4",
    name: "Adani Logistics Limited",
    slug: "adani-logistics-limited",
    industry: "Logistics",
    featured: true,
  },
  {
    id: "client-5",
    name: "Chennai One IT SEZ",
    slug: "chennai-one-it-sez",
    industry: "Commercial campus",
    featured: true,
  },
  {
    id: "client-6",
    name: "Anabond Limited",
    slug: "anabond-limited",
    industry: "Industrial manufacturing",
    featured: true,
  },
  {
    id: "client-7",
    name: "Akshaya Patra Foundation",
    slug: "akshaya-patra-foundation",
    industry: "Institutional infrastructure",
    featured: true,
  },
  {
    id: "client-8",
    name: "Godrej Consumer Products Ltd",
    slug: "godrej-consumer-products",
    industry: "FMCG manufacturing",
    featured: true,
  },
];

const seedProjects = [
  {
    id: "seed-1",
    title: "Whirlpool Industrial Works Program",
    slug: "whirlpool-industrial-works-program",
    clientName: "Whirlpool of India Ltd",
    clientLogo: null,
    featuredImage: projectImages.whirlpool,
    gallery: [projectImages.whirlpool, projectImages.manufacturingPlant, projectImages.waterSupply],
    location: "Puducherry",
    scopeOfWork:
      "Warehouse and packaging lab construction, reliability lab renovation, fire hydrant pipeline work, mezzanine floor construction, civil, electrical and interior works.",
    timeline: "20+ works completed in the last 5 years",
    projectValue: "INR 400+ Lakhs",
    status: "COMPLETED",
    servicesUsed: ["Industrial projects", "Civil construction", "Electrical works", "Interior works"],
    industry: "Industrial manufacturing",
    summary:
      "A multi-scope industrial execution program covering production support buildings, renovation, utilities and civil-electrical works.",
    body:
      "Dockside executed more than 20 works for Whirlpool of India Ltd in Puducherry, including warehouse and packaging lab construction, reliability lab renovation, fire hydrant pipeline work, mezzanine floor construction and coordinated civil, electrical and interior scopes. The program reflects DCPL's ability to work inside active industrial environments with quality controls and timely execution.",
    seoTitle: "Whirlpool Puducherry Industrial Works",
    seoDescription:
      "Dockside Constructions industrial works program for Whirlpool of India Ltd in Puducherry.",
    featured: true,
    published: true,
    testimonial: {
      id: "testimonial-seed-1",
      quote:
        "DCPL's repeat industrial works show reliable site discipline, coordinated execution and practical engineering management.",
      personName: "Client Project Team",
      designation: "Industrial Works",
      company: "Whirlpool of India Ltd",
    },
  },
  {
    id: "seed-2",
    title: "Lodha Industrial Park - Chennai",
    slug: "lodha-industrial-park-chennai",
    clientName: "Lodha Industrial Park",
    clientLogo: null,
    featuredImage: projectImages.lodha,
    gallery: [projectImages.lodha, projectImages.stateHighway, projectImages.manufacturingPlant],
    location: "Eichoor, Chennai",
    scopeOfWork:
      "Earthwork, land grading, material supply, site development and common area development works.",
    timeline: "Program delivery",
    projectValue: "INR 50+ Crores",
    status: "COMPLETED",
    servicesUsed: ["Earthwork", "Land grading", "Site development", "Infrastructure works"],
    industry: "Logistics parks",
    summary:
      "Large-format industrial park development with land grading, site development and common infrastructure scope.",
    body:
      "For Lodha Industrial Park at Eichoor, Chennai, DCPL handled earthwork, land grading, material supply, site development and common area development works. The project showcases large-scale site execution capability for logistics and industrial park environments.",
    seoTitle: "Lodha Industrial Park Chennai Case Study",
    seoDescription:
      "Earthwork, land grading and site development works by Dockside Constructions at Lodha Industrial Park Chennai.",
    featured: true,
    published: true,
    testimonial: {
      id: "testimonial-seed-2",
      quote:
        "The works required reliable equipment deployment, grading discipline and common infrastructure coordination at scale.",
      personName: "Project Controls Team",
      designation: "Industrial Park Development",
      company: "Lodha Industrial Park",
    },
  },
  {
    id: "seed-3",
    title: "Adani Logistics Civil & Structural Works",
    slug: "adani-logistics-civil-structural-works",
    clientName: "Adani Logistics Limited",
    clientLogo: null,
    featuredImage: projectImages.adani,
    gallery: [projectImages.adani, projectImages.waterSupply, projectImages.stateHighway],
    location: "Malur, Karnataka",
    scopeOfWork: "Miscellaneous civil works, RCC works, drainage and structural works.",
    timeline: "Ongoing",
    projectValue: "INR 10 Crores",
    status: "IN_PROGRESS",
    servicesUsed: ["Civil construction", "RCC works", "Structural works"],
    industry: "Logistics",
    summary:
      "Ongoing civil, RCC, drainage and structural works for logistics infrastructure in Karnataka.",
    body:
      "DCPL's Adani Logistics scope at Malur, Karnataka includes miscellaneous civil works, RCC works, drainage and structural works. The ongoing project demonstrates Dockside's ability to coordinate high-utility industrial logistics infrastructure with active project controls.",
    seoTitle: "Adani Logistics Malur Civil Works",
    seoDescription:
      "Ongoing civil, RCC, drainage and structural works by Dockside Constructions for Adani Logistics Limited in Malur, Karnataka.",
    featured: true,
    published: true,
  },
  {
    id: "seed-4",
    title: "Chennai One IT SEZ Land Development",
    slug: "chennai-one-it-sez-land-development",
    clientName: "Chennai One IT SEZ",
    clientLogo: null,
    featuredImage: projectImages.chennaiOne,
    gallery: [projectImages.chennaiOne, projectImages.stateHighway, projectImages.manufacturingPlant],
    location: "Mandra City Project, Chennai",
    scopeOfWork:
      "Large-scale land development, soil filling, site preparation, DGPS and survey works.",
    timeline: "Ongoing",
    projectValue: "INR 300+ Crores overall project value",
    status: "IN_PROGRESS",
    servicesUsed: ["Land development", "Soil filling", "Survey works", "Site preparation"],
    industry: "Commercial campus",
    summary:
      "Large-scale campus land development and site preparation scope for a major Chennai commercial development.",
    body:
      "At Chennai One IT SEZ's Mandra City Project, DCPL supports large-scale land development, soil filling, site preparation, DGPS and survey works. The project highlights Dockside's capacity to bring survey-led precision and execution discipline to early-stage campus infrastructure.",
    seoTitle: "Chennai One IT SEZ Land Development",
    seoDescription:
      "Land development, soil filling, DGPS and survey works by Dockside Constructions for Chennai One IT SEZ.",
    featured: true,
    published: true,
  },
];

function splitId(record) {
  const { id, ...data } = record;
  return { id, data };
}

async function seedAdmin() {
  const email = (process.env.SEED_ADMIN_EMAIL ?? "admin@docksideconstructions.com").toLowerCase();
  const password =
    process.env.SEED_ADMIN_PASSWORD ??
    process.env.FALLBACK_ADMIN_PASSWORD ??
    "DocksideAdmin#2026";
  const passwordHash = await bcrypt.hash(password, 12);

  return prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "SUPER_ADMIN" },
    create: {
      name: "Dockside Super Admin",
      email,
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });
}

async function seedClientsTable() {
  for (const client of seedClients) {
    const { id, data } = splitId(client);
    await prisma.client.upsert({
      where: { slug: client.slug },
      update: data,
      create: { id, ...data },
    });
  }
}

async function seedProjectsTable(authorId) {
  for (const project of seedProjects) {
    const { testimonial, ...projectRecord } = project;
    const { id, data } = splitId(projectRecord);
    const savedProject = await prisma.project.upsert({
      where: { slug: project.slug },
      update: { ...data, authorId },
      create: { id, ...data, authorId },
    });

    if (testimonial) {
      const { id: testimonialId, ...testimonialData } = testimonial;
      await prisma.testimonial.upsert({
        where: { projectId: savedProject.id },
        update: testimonialData,
        create: {
          id: testimonialId,
          ...testimonialData,
          projectId: savedProject.id,
        },
      });
    }
  }
}

async function main() {
  const admin = await seedAdmin();
  await seedClientsTable();
  await seedProjectsTable(admin.id);

  console.log("Seeded Dockside backend data");
  console.log(`Seeded SUPER_ADMIN user: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
