import { Express, Request, Response } from "express";
import {
  createUserHandler,
  getUserHandler,
  getUserHandlerById,
} from "./controllers/user.controller";
import { validate } from "./middlewares/validateRequest";
import { bodyUserSchema } from "./schemas/user.schema";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.send("hello"));

  app.get("/api/users", getUserHandler);
  app.get("/api/users/:id", getUserHandlerById);
  app.post("/api/users/", validate(bodyUserSchema), createUserHandler);
}

export default routes;
