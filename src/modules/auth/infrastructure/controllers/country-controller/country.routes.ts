import { Router } from "express";
import { CountryController } from "./country.controller";

export class CountryRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new CountryController();

    /**
 * @openapi
 * /api/country/{id}:
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
 */

 
    router.get("/:id", controller.getById);

    return router;
  }
}
