import { Router } from "express";
import { AuthMiddleware } from "../../../../../shared/infrastructure/middleware/authMiddleware";
import { MaritalStatusController } from "./maritalStatus.controller";

export class MaritalStatusRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new MaritalStatusController();
    const authMiddleware = AuthMiddleware.validateJWT;

    /**
     * @openapi
     * /api/profile/marital-status/create:
     *   post:
     *    tags:
     *      - Marital Status
     *    summary: Create marital status
     *    description: This enpoint is to create marital status
     *    operationId: createMaritalStatus
     *    requestBody:
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/Marital status create"
     *    responses:
     *      '201':
     *        description: Retorna mensaje
     *      '404':
     *        description: Hola
     *    security:
     *      - bearerAuth: []
     *
     */
    router.post("/create", controller.createMaritalStatus);

    /**
     * @openapi
     * /api/profile/marital-status/{id}:
     *   put:
     *     tags:
     *       - Marital Status
     *     summary: Update marital status by id
     *     description: This endpoint is for updating a marital status record
     *     operationId: updateMaritalStatus
     *     parameters:
     *       - name: id
     *         in: path
     *         description: Id of the marital status that needs to be updated
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/Marital status create"
     *     responses:
     *       '200':
     *         description: Retorna mensaje
     *       '404':
     *         description: Hola
     *     security:
     *       - bearerAuth: []
     */


    router.put("/:id", controller.updateMaritalStatus);

    /**
     * @openapi
     * /api/profile/marital-status/:
     *  get:
     *    tags:
     *      - Marital Status
     *    summary: Get Marital Status
     *    description: This enpoint is for get the data all marital status
     *    operationId: getMaritalStatus
     *    responses:
     *      '200':
     *        description: "Data obtained"
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#/components/schemas/Marital status get"
     *      '404':
     *        description: "Gender not found"
     *    security:
     *      - bearerAuth: []
     */
    

    router.get("/", controller.getAllMaritalStatus);
    /**
     * @openapi
     * /api/profile/marital-status/{id}:
     *  get:
     *    tags:
     *      - Marital Status
     *    summary: Get marital status by Id
     *    description: This enpoint is for get the data the marital status by id
     *    operationId: getMaritalStatus
     *    parameters:
     *      - name: id
     *        in: path
     *        description: Id of the marital status that needs to be get data
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
     *              $ref: "#/components/schemas/Marital status get"
     *
     *      '404':
     *        description: "Marital status not found"
     *    security:
     *      - bearerAuth: []
     */
    router.get("/:id", controller.getByIdMaritalStatus);

    return router;
  }
}
