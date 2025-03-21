import { Router } from "express";
import { DistrictController } from "./district.controller";

export class DistrictRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new DistrictController();

    /**
     * @openapi
     * /api/location/district/create:
     *   post:
     *    tags:
     *      - District
     *    summary: Create district
     *    description: This enpoint is to create district
     *    operationId: createDistrict
     *    requestBody:
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/District create"
     *    responses:
     *      '201':
     *        description: Retorna mensaje
     *      '404':
     *        description: Hola
     *    security:
     *      - bearerAuth: []
     *
     */

    router.post("/create", controller.createDistrict);

    /**
     * @openapi
     * /api/location/district/{id}:
     *   put:
     *     tags:
     *       - District
     *     summary: Update district by id
     *     description: This endpoint is for updating a district record
     *     operationId: updateDistrict
     *     parameters:
     *       - name: id
     *         in: path
     *         description: Id of the district that needs to be updated
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/District create"
     *     responses:
     *       '200':
     *         description: Retorna mensaje
     *       '404':
     *         description: Hola
     *     security:
     *       - bearerAuth: []
     */

    router.put("/:id", controller.updateDistrict);

    /**
     * @openapi
     * /api/location/district/{id}:
     *  get:
     *    tags:
     *      - District
     *    summary: Get district by Id
     *    description: This enpoint is for get the data the district by id
     *    operationId: getDistrict
     *    parameters:
     *      - name: id
     *        in: path
     *        description: Id of the district that needs to be get data
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
     *              $ref: "#/components/schemas/District get"
     *
     *      '404':
     *        description: "District not found"
     *    security:
     *      - bearerAuth: []
     */

    router.get("/:id", controller.getOneByIdDistrict);
    /**
     * @openapi
     * /api/location/district/:
     *  get:
     *    tags:
     *      - District
     *    summary: Get Districts
     *    description: This enpoint is for get the data all districts
     *    operationId: getDistricts
     *    responses:
     *      '200':
     *        description: "Data obtained"
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#/components/schemas/District get"
     *      '404':
     *        description: "District not found"
     *    security:
     *      - bearerAuth: []
     */
    router.get("/", controller.getAllDistricts);

    /**
     * @openapi
     * /api/location/district/{id}:
     *   delete:
     *     tags:
     *       - District
     *     summary: Delete district by ID
     *     description: This endpoint is for delete district by id.
     *     operationId: deleteDistrict
     *     parameters:
     *       - name: id
     *         in: path
     *         description: ID of the district whose data needs to be delete.
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       '200':
     *         description: "Data obtained"
     *       '404':
     *         description: "District not found"
     *     security:
     *     - bearerAuth: []
     */

    router.delete("/:id", controller.deleteDistrict);

    return router;
  }
}
