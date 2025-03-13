import { Router } from "express";
import { CountryController } from "./country.controller";
import { AuthMiddleware } from "../../../../../shared/infrastructure/middleware/authMiddleware";

export class CountryRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new CountryController();
    const authMiddleware = AuthMiddleware.validateJWT;

    /**
     * @openapi
     * /api/location/country/create:
     *   post:
     *     tags:
     *       - Country
     *     summary: Create country
     *     description: This endpoint is for create a country.
     *     operationId: postCountry
     *     requestBody:
     *        content:
     *          application/json:
     *              schema:
     *                $ref: "#/components/schemas/Country create"
     *     responses:
     *       '201':
     *         description: "Country updated successful"
     *       '404':
     *         description: "Country not found"
     *     security:
     *     - bearerAuth: []
     */

    router.post("/create", authMiddleware, controller.create);

    /**
     * @openapi
     * /api/location/country/{id}:
     *   get:
     *     tags:
     *       - Country
     *     summary: Get country by ID
     *     description: This endpoint is for retrieving the data of a country by its ID.
     *     operationId: getCountry
     *     parameters:
     *       - name: id
     *         in: path
     *         description: ID of the country whose data needs to be retrieved.
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       '200':
     *         description: "Data obtained"
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Country"
     *       '404':
     *         description: "Country not found"
     *     security:
     *     - bearerAuth: []
     */

    router.get("/:id", authMiddleware, controller.getById);
    /**
     * @openapi
     * /api/location/country/:
     *   get:
     *     tags:
     *       - Country
     *     summary: Get all countries
     *     description: This endpoint is for retrieving the data of all countries.
     *     operationId: getCountries
     *     responses:
     *       '200':
     *         description: "Data obtained"
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: "#/components/schemas/Country"
     *       '404':
     *         description: "Country not found"
     *     security:
     *     - bearerAuth: []
     */

    router.get("/", authMiddleware, controller.getAll);
    /**
     * @openapi
     * /api/location/country/{id}:
     *   put:
     *     tags:
     *       - Country
     *     summary: Update country by ID
     *     description: This endpoint is for update the data of a country by its ID.
     *     operationId: putCountry
     *     parameters:
     *       - name: id
     *         in: path
     *         description: ID of the country whose data needs to be update.
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     requestBody:
     *        content:
     *          application/json:
     *              schema:
     *                $ref: "#/components/schemas/Country update"
     *     responses:
     *       '200':
     *         description: "Country updated successful"
     *       '404':
     *         description: "Country not found"
     *     security:
     *     - bearerAuth: []
     */

    router.put("/:id", authMiddleware, controller.update);

    /**
     * @openapi
     * /api/location/country/{id}:
     *   delete:
     *     tags:
     *       - Country
     *     summary: Delete country by ID
     *     description: This endpoint is for delete country by id.
     *     operationId: deleteCountry
     *     parameters:
     *       - name: id
     *         in: path
     *         description: ID of the country whose data needs to be delete.
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       '200':
     *         description: "Data obtained"
     *       '404':
     *         description: "Country not found"
     *     security:
     *     - bearerAuth: []
     */

    router.delete("/:id", authMiddleware, controller.delete);



    return router;
  }
}
