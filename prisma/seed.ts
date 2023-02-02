import { db } from "../src/utils/connect";

async function main() {
  // user
  const alice = await db.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      hashedPassword: "randomPassword",
    },
  });
  const bob = await db.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      hashedPassword: "randomPassword",
    },
  });
  console.log({ alice, bob });

  // category
  const smartphone = await db.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "smartphone",
      products: {
        create: [
          {
            name: "Iphone 11",
            price: 12.0,
          },
          {
            name: "Oppo A 2020",
            price: 5.99,
          },
        ],
      },
    },
  });
  const tv = await db.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "television",
    },
  });

  console.log({ tv, smartphone });

  // product
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
