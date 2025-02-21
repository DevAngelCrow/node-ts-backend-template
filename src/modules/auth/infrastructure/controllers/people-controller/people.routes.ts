import { Router } from "express";
import { PeopleController } from "./people.controller";
import upload from "../../../../../shared/infrastructure/config/multer";

export class PeopleRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PeopleController();

    router.post("/create", upload.single("img_path"), controller.createPeople);
    router.get("/", controller.getAllPeople);
    //router.get("/:id", controller.getPeopleById);
    router.get("/email", controller.getPeopleByEmail);
    router.put("/:id", upload.single("img_path"), controller.updatePerson );
    router.delete("/:id", controller.deletePerson );
    router.post('/sign-up', upload.single("img_path"), controller.createPeopleUser)

    return router;
  }
}
