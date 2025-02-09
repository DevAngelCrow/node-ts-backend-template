import { Router } from "express";
import { CountryController } from "./country.controller";

export class CountryRoutes {
    static get routes() : Router {
        const router = Router();
        const controller = new CountryController;

        router.get('/:id', controller.getById );
        
        return router;
    }
}