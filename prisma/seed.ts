import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Protein Powder",
        price: 49.99,
        imageUrl: "",
        description: "High-quality whey protein.",
      },
      {
        name: "Creatine Monohydrate",
        price: 29.99,
        imageUrl: "",
        description: "Boost strength and performance.",
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
