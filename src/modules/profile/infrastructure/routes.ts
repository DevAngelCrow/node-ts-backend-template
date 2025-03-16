import { Router } from "express";
import { PeopleRoutes } from "./controllers/people-controller/people.routes";
import { AddressRoutes } from "./controllers/address-controller/address.routes";
import { GenderRoutes } from "./controllers/gender-controller/gender.routes";


export class ProfileRoutes {
    static get routes() : Router {
        const router = Router();
        
        router.use('/people', PeopleRoutes.routes);
        router.use('/address', AddressRoutes.routes);
        router.use('/gender', GenderRoutes.routes);
    
        return router;
    }
}