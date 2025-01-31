import { Router } from "express";
import { PeopleController } from "./people.controller";

export class PeopleRoutes {
    static get routes() : Router {
        const router = Router();
        const controller = new PeopleController();

        router.post('/create', controller.createPeople );
        
        return router;
    }
}