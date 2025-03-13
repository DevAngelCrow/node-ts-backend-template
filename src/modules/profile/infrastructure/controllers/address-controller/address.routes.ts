import { Router } from "express";
import { AuthMiddleware } from "../../../../../shared/infrastructure/middleware/authMiddleware";
import { AddressController } from "./address.controller";

export class AddressRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AddressController();
    //const authMiddleware = AuthMiddleware.validateJWT;

    router.get("/:id",  controller.addressGetOneById);


    return router;
  }
}
