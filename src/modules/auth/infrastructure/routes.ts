import { Router } from "express";
import { CountryRoutes, ExampleRoutes, PeopleRoutes } from "./controllers";


export class AuthRoutes {
    static get routes() : Router {
        const router = Router();
        
    
        router.use('/example', ExampleRoutes.routes);
        router.use('/people', PeopleRoutes.routes);
        router.use('/country', CountryRoutes.routes);
        return router;
    }
}