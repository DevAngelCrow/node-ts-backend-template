import { Router } from "express";
import { AuthRoutes } from "../../modules/auth/infrastructure/routes"; 
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "../../shared/infrastructure/swagger/swagger";
import { ProfileRoutes } from "../../modules/profile/infrastructure/routes";
import { LocationRoutes } from "../../modules/location/infrastructure/routes";

export class AppRoutes {
    static get routes() : Router {
        const router = Router();
        
        router.use(AuthRoutes.routes);
        router.use("/profile", ProfileRoutes.routes);
        router.use("/location", LocationRoutes.routes)
        router.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup))
        
        return router;
    }
}