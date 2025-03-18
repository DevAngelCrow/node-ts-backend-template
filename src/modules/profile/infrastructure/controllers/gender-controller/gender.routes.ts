import { Router } from "express";
import { GenderController } from "./gender.controller";
import { AuthMiddleware } from "../../../../../shared/infrastructure/middleware/authMiddleware";

export class GenderRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new GenderController();
    const authMiddleware = AuthMiddleware.validateJWT;

    /**
     * @openapi
     * /api/profile/gender/create:
     *   post:
     *    tags:
     *      - Gender
     *    summary: Create gender
     *    description: This enpoint is to create gender
     *    operationId: createGender
     *    requestBody:
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/Gender create"
     *    responses:
     *      '200':
     *        description: Retorna mensaje
     *      '404':
     *        description: Hola
     *    security:
     *      - bearerAuth: []
     *
     */

    router.post("/create", /*authMiddleware, */ controller.createGender);

    /**
     * @openapi
     * /api/profile/gender/{id}:
     *   put:
     *     tags:
     *       - Gender
     *     summary: Update gender by id
     *     description: This endpoint is for updating a gender's record
     *     operationId: updateGender
     *     parameters:
     *       - name: id
     *         in: path
     *         description: Id of the gender that needs to be updated
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/Gender create"
     *     responses:
     *       '200':
     *         description: Retorna mensaje
     *       '404':
     *         description: Hola
     *     security:
     *       - bearerAuth: []
     */

    router.put("/:id", controller.updateGender);

    /**
     * @openapi
     * /api/profile/gender/{id}:
     *  get:
     *    tags:
     *      - Gender
     *    summary: Get gender by Id
     *    description: This enpoint is for get the data the gender by id
     *    operationId: getGender
     *    parameters:
     *      - name: id
     *        in: path
     *        description: Id of the gender that needs to be get data
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
     *              $ref: "#/components/schemas/Gender get"
     *
     *      '404':
     *        description: "Gender not found"
     *    security:
     *      - bearerAuth: []
     */

    router.get("/:id", controller.getOneByIdGender);
    /**
     * @openapi
     * /api/profile/gender/:
     *  get:
     *    tags:
     *      - Gender
     *    summary: Get genders
     *    description: This enpoint is for get the data all genders
     *    operationId: getGenders
     *    responses:
     *      '200':
     *        description: "Data obtained"
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#/components/schemas/Gender get"
     *      '404':
     *        description: "Gender not found"
     *    security:
     *      - bearerAuth: []
     */
    router.get("/", controller.getGenders);
    return router;
  }
}
