import { Router } from "express";
import { AuthRoutes } from "../../modules/auth/infrastructure/routes"; 


export class AppRoutes {
    static get routes() : Router {
        const router = Router();
        
        router.use(AuthRoutes.routes);
        
        return router;
    }
}