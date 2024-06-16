require("dotenv").config({ path: ".env.local" });

const { PrismaClient } = require("@prisma/client");
const data = require("../assets/mock-data.json");
const prisma = new PrismaClient();

async function main() {
  const clerkId = process.env.USER_ID;
  const jobs = data.map((job) => {
    return {
      ...job,
      clerkId,
    };
  });
  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
