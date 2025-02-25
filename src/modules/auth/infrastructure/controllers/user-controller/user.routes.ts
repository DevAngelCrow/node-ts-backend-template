import { Router } from "express";
import { UserController } from "./user.controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new UserController();

    router.post("/create",  controller.createUser );
    router.get("/email", controller.findUserByEmail);
    

    return router;
  }
}
