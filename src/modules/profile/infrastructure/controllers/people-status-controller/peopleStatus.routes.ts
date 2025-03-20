import { Router } from "express";
import { PeopleStatusController } from "./peopleStatus.controller";

export class PeopleStatusRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PeopleStatusController();

    /**
     * @openapi
     * /api/profile/people-status/create:
     *   post:
     *    tags:
     *      - People Status
     *    summary: Create people status
     *    description: This enpoint is to create people status
     *    operationId: createPeopleStatus
     *    requestBody:
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/People status create"
     *    responses:
     *      '201':
     *        description: Retorna mensaje
     *      '404':
     *        description: Hola
     *    security:
     *      - bearerAuth: []
     *
     */
    router.post("/create", controller.peopleStatusCreate);

    /**
     * @openapi
     * /api/profile/people-status/{id}:
     *   put:
     *     tags:
     *       - People Status
     *     summary: Update people status by id
     *     description: This endpoint is for updating a people status record
     *     operationId: updatePeopleStatus
     *     parameters:
     *       - name: id
     *         in: path
     *         description: Id of the people status that needs to be updated
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/People status create"
     *     responses:
     *       '200':
     *         description: Retorna mensaje
     *       '404':
     *         description: Hola
     *     security:
     *       - bearerAuth: []
     */

    router.put("/:id", controller.peopleStatusUpdate);

    /**
     * @openapi
     * /api/profile/people-status/{id}:
     *  get:
     *    tags:
     *      - People Status
     *    summary: Get people status by Id
     *    description: This enpoint is for get the data the people status by id
     *    operationId: getPeopleStatus
     *    parameters:
     *      - name: id
     *        in: path
     *        description: Id of the people status that needs to be get data
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
     *              $ref: "#/components/schemas/People status get"
     *
     *      '404':
     *        description: "People status not found"
     *    security:
     *      - bearerAuth: []
     */

    router.get("/:id", controller.peopleStatusGetOneById);

    /**
     * @openapi
     * /api/profile/people-status/:
     *  get:
     *    tags:
     *      - People Status
     *    summary: Get People Status
     *    description: This enpoint is for get the data all people status
     *    operationId: getPeopleStatusById
     *    responses:
     *      '200':
     *        description: "Data obtained"
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#/components/schemas/People status get"
     *      '404':
     *        description: "People not found"
     *    security:
     *      - bearerAuth: []
     */

    router.get("/", controller.peopleStatusGetAll);

    return router;
  }
}
