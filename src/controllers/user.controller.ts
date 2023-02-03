import { User } from "@prisma/client";
import config from "config";
import { Request, Response } from "express";
import {
  loginBodyUserSchema,
  registerBodyUserSchema,
} from "../schemas/user.schema";
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUsers,
} from "../services/user.service";
import { exclude } from "../utils/excludeFields.utils";
import { signJwt } from "../utils/jwt.utils";
import {
  comparedPasswordResult,
  hashedPassword,
} from "../utils/passwordEncryption.utils";

export async function getUsersHandler(req: Request, res: Response) {
  const data = await findUsers();
  return res.send(data);
}

export async function getUserHandlerById(
  req: Request<{ id: number }, {}, {}>,
  res: Response
) {
  const userId = Number(req.params.id);
  const data = await findUserById(userId);
  if (!data) {
    return res.status(404).send({ message: "User does not exist" });
  }
  return res.send(data);
}

export async function createUserHandler(
  req: Request<{}, {}, registerBodyUserSchema["body"]>,
  res: Response
) {
  const { name, email, password } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(409).send({ message: "data already exist" });
  }

  const securePassword = await hashedPassword(password);
  const data = await createUser({ name, email, securePassword });

  const user = await findUserByEmail(data.email);
  type PasswordKey = keyof User;
  const userWithoutPassword = await exclude<User, PasswordKey>(user!, [
    "hashedPassword",
  ]);

  return res.send(userWithoutPassword);
}

export async function loginUserHandler(
  req: Request<{}, {}, loginBodyUserSchema["body"]>,
  res: Response
) {
  const { email, password } = req.body;

  const findUser = await findUserByEmail(email);
  if (!findUser) {
    return res.status(404).send({ message: "user not found" });
  }

  const checkedPassword: boolean = await comparedPasswordResult(
    password,
    findUser.hashedPassword
  );

  if (!checkedPassword) {
    return res.status(401).send({ message: "invalid email or password" });
  }

  const accessToken = await signJwt(findUser, {
    expiresIn: config.get("accessTokenTtl"),
  });

  const refreshToken: string = await signJwt(findUser, {
    expiresIn: config.get("refreshTokenTtl"),
  });

  console.log(accessToken);

  return res.send({
    accessToken,
    refreshToken,
  });
}
