import { Router } from "express";
import { DepartmentController } from "./department.controller";

export class DepartmentRoutes{
    static get routes () : Router {
        const router = Router();
        const controller = new DepartmentController();

        router.post("/create", controller.createDepartment);
        router.put("/:id", controller.updateDepartment);
        router.get("/", controller.getAllDepartments);
        router.get("/:id", controller.getDepartment);
        router.delete("/:id", controller.deleteDepartment);


        return router;
    }
}