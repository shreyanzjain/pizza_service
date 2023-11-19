import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(1);
});

export default prisma;
