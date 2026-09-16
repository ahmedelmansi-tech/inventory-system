import colors from "colors";
import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

console.log("I AM RUNNING SEEDS.JS".bgBlue);

async function main() {
  const demoUserId = "8872e94d-20cc-46d7-98e9-79d6dedf3dac";

  // Create sample products
  await prisma.product.createMany({
    data: Array.from({ length: 15 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      price: (Math.random() * 90 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 20),
      lowStock: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    })),
  });

  console.log("Seed data created successfully!".bgGreen);
  console.log(`Created 25 products for user ID: ${demoUserId}`.bgWhite);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// console.log("PRISMA :", prisma);
// console.log("Every thing is going good".bgGreen);
