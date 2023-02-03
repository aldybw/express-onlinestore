import { Express, Request, Response } from "express";
import {
  createUserHandler,
  getUserHandlerById,
  getUsersHandler,
  loginUserHandler,
} from "./controllers/user.controller";
import { validate } from "./middlewares/validateRequest";
import {
  loginBodyUserSchema,
  registerBodyUserSchema,
} from "./schemas/user.schema";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.send("hello"));

  app.get("/api/users", getUsersHandler);
  app.get("/api/users/:id", getUserHandlerById);
  app.post(
    "/api/users/register",
    validate(registerBodyUserSchema),
    createUserHandler
  );
  app.post("/api/users/login", validate(loginBodyUserSchema), loginUserHandler);
}

export default routes;
