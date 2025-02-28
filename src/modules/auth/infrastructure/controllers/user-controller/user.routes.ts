import { Router } from "express";
import { UserController } from "./user.controller";
import { AuthMiddleware } from "../../../../../shared/infrastructure/middleware/authMiddleware";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new UserController();
    const authMiddleware = AuthMiddleware.validateJWT;

    /**
     * @openapi
     * /api/user/create:
     *   post:
     *    tags:
     *      - User
     *    summary: Create user
     *    description: This enpoint is to user person
     *    operationId: createUser
     *    requestBody:
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/User"
     *    responses:
     *      '201':
     *        description: Retorna mensaje
     *      '404':
     *        description: Hola
     *    security:
     *      - bearerAuth: []
     *
     */
    router.post("/create", authMiddleware, controller.createUser );

    /**
     * @openapi
     * /api/user/email/{email}:
     *  get:
     *    tags:
     *      - User
     *    summary: Get user
     *    description: This enpoint is for get the data user by id
     *    operationId: getPeople
     *    responses:
     *      '200':
     *        description: "Data obtained"
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#/components/schemas/User get"
     *      '404':
     *        description: "Person not found"
     *    security:
     *      - bearerAuth: []
     */
    router.get("/email/:email", authMiddleware, controller.findUserByEmail);
    

    return router;
  }
}
