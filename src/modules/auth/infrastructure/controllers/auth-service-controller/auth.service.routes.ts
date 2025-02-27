import { Router } from "express";
import { AuthServiceController } from "./auth.service.controller";

export class AuthServiceRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AuthServiceController();

    /**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authenticate user
 *     description: This endpoint is for user login.
 *     operationId: authLogin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *       '401':
 *         description: Invalid credentials
 */


    router.post("/login", controller.login);

    return router;
  }
}
