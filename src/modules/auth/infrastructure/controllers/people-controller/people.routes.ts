import { Router } from "express";
import { PeopleController } from "./people.controller";
import upload from "../../../../../shared/infrastructure/config/multer";
import { AuthMiddleware } from "../../../../../shared/infrastructure/middleware/authMiddleware";

export class PeopleRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PeopleController();
    const authMiddleware = AuthMiddleware.validateJWT;
    
    /**
     * Post track
     * @openapi
     * /api/people/create:
     *   post:
     *    tags:
     *      - People
     *    summary: Create person
     *    description: This enpoint is to create person
     *    operationId: createPerson
     *    requestBody:
     *        content:
     *          multipart/form-data:
     *            schema:
     *              $ref: "#/components/schemas/People"
     *    responses:
     *      '200':
     *        description: Retorna mensaje
     *      '404':
     *        description: Hola
     *    security:
     *      - bearerAuth: []
     *
     */


    router.post("/create", authMiddleware, upload.single("img_path"), controller.createPeople);

        /**
     * Post track
     * @openapi
     * /api/people/sign-up:
     *   post:
     *    tags:
     *      - People
     *    summary: Create user with people
     *    description: This enpoint is to sign up
     *    operationId: userWithPeople
     *    requestBody:
     *        content:
     *          multipart/form-data:
     *            schema:
     *              $ref: "#/components/schemas/People user"
     *    responses:
     *      '201':
     *        description: Register created successful
     *      '404':
     *        description: Hola
     *    security:
     *      - bearerAuth: []
     *
     */

    router.post("/sign-up", upload.single("img_path"), controller.createPeopleUser);

    /**
     * @openapi
     * /api/people/:
     *  get:
     *    tags:
     *      - People
     *    summary: Get people
     *    description: This enpoint is for get the data all people
     *    operationId: getPeople
     *    responses:
     *      '200':
     *        description: "Data obtained"
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#/components/schemas/People get"
     *      '404':
     *        description: "Person not found"
     *    security:
     *      - bearerAuth: []
     */

    router.get("/", authMiddleware, controller.getAllPeople);

    /**
     * @openapi
     * /api/people/email/{email}:
     *  get:
     *    tags:
     *      - People
     *    summary: Get person by email
     *    description: This enpoint is for get the data the person by email
     *    operationId: getPersonEmail
     *    parameters:
     *      - name: email
     *        in: path
     *        required: true
     *    responses:
     *      '200':
     *        description: "Data obtained"
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/People get"
     *      '404':
     *        description: "Person not found"
     *    security:
     *      - bearerAuth: []
     */
    
    router.get("/email/:email", authMiddleware, controller.getPeopleByEmail);
    /**
     * @openapi
     * /api/people/{id}:
     *  get:
     *    tags:
     *      - People
     *    summary: Get person by Id
     *    description: This enpoint is for get the data the person by id
     *    operationId: getPerson
     *    parameters:
     *      - name: id
     *        in: path
     *        description: Id of the person that needs to be get data
     *        required: true
     *        schema:
     *          type: integer
     *          format: int64
     *    responses:
     *      '200':
     *        description: "Data obtained"
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/People get"
     *
     *      '404':
     *        description: "Person not found"
     *    security:
     *      - bearerAuth: []
     */

    router.get("/:id", authMiddleware, controller.getPeopleById);

    /**
     * @openapi
     * /api/people/{id}:
     *   put:
     *     tags:
     *       - People
     *     summary: Update person by id
     *     description: This endpoint is for updating a person's record
     *     operationId: updatePerson
     *     parameters:
     *       - name: id
     *         in: path
     *         description: Id of the person that needs to be updated
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     requestBody:
     *       content:
     *         multipart/form-data:
     *           schema:
     *             $ref: "#/components/schemas/People update"
     *     responses:
     *       '200':
     *         description: Retorna mensaje
     *       '404':
     *         description: Hola
     *     security:
     *      - bearerAuth: []
     */

    router.put("/:id", authMiddleware, upload.single("img_path"), controller.updatePerson);

    /**
     * @openapi
     * /api/people/{id}:
     *  delete:
     *    tags:
     *      - People
     *    summary: Delete person
     *    description: This enpoint is for logic delete person
     *    operationId: deletePeople
     *    parameters:
     *      - name: id
     *        in: path
     *        description: ID of the person that needs to be deleted
     *        required: true
     *        schema:
     *          type: integer
     *          format: int64
     *    responses:
     *      '200':
     *        description: Deleted successfull
     *      '400':
     *        description: Invalid id supplied
     *      '404':
     *        description: Person not found
     *    security:
     *      - bearerAuth: []
     */

    router.delete("/:id", authMiddleware, controller.deletePerson);

    return router;
  }
}
