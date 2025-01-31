import { Router } from "express";
import { ExampleRoutes, PeopleRoutes } from "./controllers";


export class AppRoutes {
    static get routes() : Router {
        const router = Router();
        
    
        router.use('/example', ExampleRoutes.routes);
        router.use('/people', PeopleRoutes.routes);
        return router;
    }
}