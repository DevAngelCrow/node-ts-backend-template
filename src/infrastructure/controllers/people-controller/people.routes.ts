import { Router } from "express";
import { PeopleController } from "./people.controller";

export class ExampleRoutes {
    static get routes() : Router {
        const router = Router();
        const controller = new PeopleController();

        
        return router;
    }
}