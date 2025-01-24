import { Router } from "express";
import { ExampleRoutes } from "./controllers";

export class AppRoutes {
    static get routes() : Router {
        const router = Router();
        
        router.use('/example', ExampleRoutes.routes);
        return router;
    }
}