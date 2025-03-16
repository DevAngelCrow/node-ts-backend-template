import { Router } from "express";
import { GenderController } from "./gender.controller";
import { AuthMiddleware } from "../../../../../shared/infrastructure/middleware/authMiddleware";

export class GenderRoutes {
    static get routes() : Router {
        const router = Router();
        const controller = new GenderController();
        const authMiddleware = AuthMiddleware.validateJWT;

        router.post("/create", /*authMiddleware, */controller.createGender);

        return router;
    }
}