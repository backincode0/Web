import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  {
    name: "Programming",
    slug: "programming",
    icon: "code",
    description: "Full-stack development, APIs, automations, serverless, and platform integrations.",
    examples: "SaaS MVPs, microservices, internal tools.",
    price: 1200
  },
  {
    name: "Video Editing",
    slug: "video-editing",
    icon: "play-circle",
    description: "Editorial cuts, motion design, subtitles, and multi-cam timelines.",
    examples: "Product launches, ads, tutorials.",
    price: 950
  },
  {
    name: "Thumbnails",
    slug: "thumbnails",
    icon: "image",
    description: "High-converting thumbnails with layered assets and brand consistency.",
    examples: "YouTube, courses, social shorts.",
    price: 260
  },
  {
    name: "Website Design",
    slug: "website-design",
    icon: "layout",
    description: "Responsive layouts, copy-safe wireframes, and CMS prep.",
    examples: "Landing pages, dashboards, marketing sites.",
    price: 1800
  }
];

async function main() {
  await prisma.service.createMany({
    skipDuplicates: true,
    data: services
  });

  const adminEmail = process.env.ADMIN_EMAIL ?? "hello@wfereger.studio";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin123!";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: await bcrypt.hash(adminPassword, 10),
      role: "ADMIN",
      isVerified: true
    },
    create: {
      email: adminEmail,
      name: "Founder",
      password: await bcrypt.hash(adminPassword, 10),
      role: "ADMIN",
      isVerified: true
    }
  });

  console.log("Seed completed");
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
