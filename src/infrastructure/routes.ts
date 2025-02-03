import { Router } from "express";
import { CountryRoutes, ExampleRoutes, PeopleRoutes } from "./controllers";


export class AppRoutes {
    static get routes() : Router {
        const router = Router();
        
    
        router.use('/example', ExampleRoutes.routes);
        router.use('/people', PeopleRoutes.routes);
        router.use('/country', CountryRoutes.routes);
        return router;
    }
}