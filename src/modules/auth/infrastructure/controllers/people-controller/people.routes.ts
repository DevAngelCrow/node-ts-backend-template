import { Router } from "express";
import { PeopleController } from "./people.controller";
import upload from "../../../../../shared/infrastructure/config/multer";

export class PeopleRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PeopleController();

    router.post("/create", upload.single("img_path"), controller.createPeople);
    router.get("/", controller.getAllPeople);
    router.get("/email", controller.getPeopleByEmail);
    router.get("/:id", controller.getPeopleById);
    router.put("/:id", upload.single("img_path"), controller.updatePerson );
    router.delete("/:id", controller.deletePerson );

    /**
     * Post track
     * @openapi
     * /api/people/sign-up:
     *   post:
     *    tags:
     *      - user with people
     *    summary: Create user with people
     *    description: This enpoint is to sign up
     *    operationId: userWithPeople
     *    requestBody:
     *        content:
     *          multipart/form-data:
     *            schema:
     *              $ref: "#/components/schemas/people user"
     *    responses:
     *      '200':
     *        description: Retorna mensaje
     *      '404':
     *        description: Hola   
     * 
     */

    router.post('/sign-up', upload.single("img_path"), controller.createPeopleUser)

    return router;
  }
}
