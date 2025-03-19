import { Router } from "express";
import { PeopleStatusController } from "./peopleStatus.controller";

export class PeopleStatusRoutes {
    static get routes() : Router {
        const router = Router();
        const controller = new PeopleStatusController(); 

        router.post("/create", controller.peopleStatusCreate);
        router.put("/:id", controller.peopleStatusUpdate);
        router.get("/:id", controller.peopleStatusGetOneById);
        router.get("/", controller.peopleStatusGetAll);

        return router;
    }
}