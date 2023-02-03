import { db } from "../utils/connect";

export async function findUsers() {
  return await db.user.findMany();
}

export async function findUserById(id: number) {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
}

export async function findUserByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
}

export async function createUser({
  name,
  email,
  securePassword,
}: {
  name: string;
  email: string;
  securePassword: string;
}) {
  return await db.user.create({
    data: {
      name,
      email,
      hashedPassword: securePassword,
    },
  });
}
