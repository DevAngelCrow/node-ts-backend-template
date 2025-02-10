import { Router } from "express";
import { AuthServiceController } from "./auth.service.controller";

export class AuthServiceRoutes {
    static get routes() : Router {
        const router = Router();
        const controller = new AuthServiceController;

        router.get('/login', controller.login);
        
        return router;
    }
}