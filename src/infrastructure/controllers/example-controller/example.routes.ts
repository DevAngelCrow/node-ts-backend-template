import { Router } from "express";
import { ExampleController } from "./example.controller";

export class ExampleRoutes {
    static get routes() : Router {
        const router = Router();
        const controller = new ExampleController();

        router.post('/create', controller.create);
        router.get('/', controller.getAll);

        return router;
    }
}