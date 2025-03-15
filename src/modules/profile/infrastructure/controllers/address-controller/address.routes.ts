import { Router } from "express";
import { AuthMiddleware } from "../../../../../shared/infrastructure/middleware/authMiddleware";
import { AddressController } from "./address.controller";

export class AddressRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AddressController();
    const authMiddleware = AuthMiddleware.validateJWT;

    /**
     * @openapi
     * /api/profile/address/create:
     *   post:
     *    tags:
     *      - Address
     *    summary: Create address
     *    description: This enpoint is to create address
     *    operationId: createAddress
     *    requestBody:
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/Address create"
     *    responses:
     *      '200':
     *        description: Retorna mensaje
     *      '404':
     *        description: Hola
     *
     */

    router.post("/create", /*authMiddleware*/ controller.addressCreate);
    router.put("/:id", authMiddleware, controller.addressUpdate);
    router.get("/", authMiddleware, controller.addressGetAll);
    router.get("/:id",  authMiddleware, controller.addressGetOneById);
    router.delete("/:id", authMiddleware, controller.addressDelete);
    
    return router;
  }
}
