import { Router } from "express";
import { PeopleRoutes } from "./controllers/people-controller/people.routes";
import { AddressRoutes } from "./controllers/address-controller/address.routes";
import { GenderRoutes } from "./controllers/gender-controller/gender.routes";
import { MaritalStatusRoutes } from "./controllers/marital-status-controller/maritalStatus.routes";
import { PeopleStatusRoutes } from "./controllers/people-status-controller/peopleStatus.routes";


export class ProfileRoutes {
    static get routes() : Router {
        const router = Router();
        
        router.use('/people', PeopleRoutes.routes);
        router.use('/address', AddressRoutes.routes);
        router.use('/gender', GenderRoutes.routes);
        router.use('/marital-status', MaritalStatusRoutes.routes);
        router.use('/people-status', PeopleStatusRoutes.routes);
    
        return router;
    }
}