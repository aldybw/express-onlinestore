import { Request, Response } from "express";
import { bodyUserSchema } from "../schemas/user.schema";
import {
  createUser,
  findUser,
  findUserByEmail,
  findUserById,
} from "../services/user.service";

export async function getUserHandler(req: Request, res: Response) {
  const data = await findUser();
  return res.send(data);
}

export async function getUserHandlerById(
  req: Request<{ id: number }, {}, {}>,
  res: Response
) {
  const userId = Number(req.params.id);
  const data = await findUserById(userId);
  return res.send(data);
}

export async function createUserHandler(
  req: Request<{}, {}, bodyUserSchema["body"]>,
  res: Response
) {
  const { name, email, password } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(409).send({ message: "data already exist" });
  }

  const data = await createUser({ name, email, password });
  return res.send(data);
}
