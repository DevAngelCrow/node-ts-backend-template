import { Router } from "express";
import { DistrictController } from "./district.controller";

export class DistrictRoutes {
    static get routes() : Router {
        const router = Router();
        const controller = new DistrictController();

        router.post("/create", controller.createDistrict);
        router.put("/:id", controller.updateDistrict);
        router.get("/:id", controller.getOneByIdDistrict);
        router.get("/", controller.getAllDistricts);
        router.delete("/:id", controller.deleteDistrict)

        return router;
    }
}