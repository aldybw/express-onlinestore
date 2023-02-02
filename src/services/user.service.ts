import { db } from "../utils/connect";

export async function findUser() {
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
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  return await db.user.create({
    data: {
      name,
      email,
      hashedPassword: password,
    },
  });
}
