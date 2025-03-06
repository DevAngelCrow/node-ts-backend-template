import { Router } from "express";
import { PeopleRoutes } from "./controllers/people-controller/people.routes";


export class ProfileRoutes {
    static get routes() : Router {
        const router = Router();
        
        router.use('/people', PeopleRoutes.routes);
        //router.use('/country', CountryRoutes.routes);
    
        return router;
    }
}