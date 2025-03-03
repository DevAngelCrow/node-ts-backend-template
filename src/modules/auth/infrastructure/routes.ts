import { Router } from "express";
import { AuthServiceRoutes, ExampleRoutes, UserRoutes } from "./controllers";


export class AuthRoutes {
    static get routes() : Router {
        const router = Router();
        
    
        router.use('/example', ExampleRoutes.routes);
        //router.use('/people', PeopleRoutes.routes);
        //router.use('/country', CountryRoutes.routes);
        router.use('/auth', AuthServiceRoutes.routes );
        router.use('/user', UserRoutes.routes);

        return router;
    }
}