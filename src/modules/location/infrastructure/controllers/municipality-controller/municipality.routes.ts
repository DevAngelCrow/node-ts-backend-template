import { Router } from "express";
import { MunicipalityController } from "./municipality.controller";

export class MunicipalityRoutes {
    static get routes () : Router {
        const router = Router();
        const controller = new MunicipalityController();

        router.post("/create", controller.createMunicipality);
        router.put("/:id", controller.updateMunicipality);
        router.get("/", controller.getMunicipalities);
        router.get("/:id", controller.getMunicipality);

        return router;
    }
}