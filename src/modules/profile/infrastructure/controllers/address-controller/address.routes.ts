import { Router } from "express";
import { AuthMiddleware } from "../../../../../shared/infrastructure/middleware/authMiddleware";
import { AddressController } from "./address.controller";

export class AddressRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AddressController();
    const authMiddleware = AuthMiddleware.validateJWT;

    /**
     * @openapi
     * /api/profile/address/create:
     *   post:
     *    tags:
     *      - Address
     *    summary: Create address
     *    description: This enpoint is to create address
     *    operationId: createAddress
     *    requestBody:
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/Address create"
     *    responses:
     *      '200':
     *        description: Retorna mensaje
     *      '404':
     *        description: Hola
     *    security:
     *      - bearerAuth: []
     *
     */

    router.post("/create", authMiddleware, controller.addressCreate);

    /**
     * @openapi
     * /api/profile/address/{id}:
     *   put:
     *     tags:
     *       - Address
     *     summary: Update address by id
     *     description: This endpoint is for updating a address's record
     *     operationId: updateAddress
     *     parameters:
     *       - name: id
     *         in: path
     *         description: Id of the address that needs to be updated
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/Address update"
     *     responses:
     *       '200':
     *         description: Retorna mensaje
     *       '404':
     *         description: Hola
     *     security:
     *       - bearerAuth: []
     */

    router.put("/:id", authMiddleware, controller.addressUpdate);

    /**
     * @openapi
     * /api/profile/address/:
     *  get:
     *    tags:
     *      - Address
     *    summary: Get addresses
     *    description: This enpoint is for get the data all addresses
     *    operationId: getAddresses
     *    responses:
     *      '200':
     *        description: "Data obtained"
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#/components/schemas/Address get"
     *      '404':
     *        description: "Address not found"
     *    security:
     *      - bearerAuth: []
     */
    router.get("/", authMiddleware, controller.addressGetAll);

    /**
     * @openapi
     * /api/profile/address/{id}:
     *  get:
     *    tags:
     *      - Address
     *    summary: Get address by Id
     *    description: This enpoint is for get the data the address by id
     *    operationId: getAddress
     *    parameters:
     *      - name: id
     *        in: path
     *        description: Id of the address that needs to be get data
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
     *              $ref: "#/components/schemas/Address get"
     *
     *      '404':
     *        description: "Address not found"
     *    security:
     *      - bearerAuth: []
     */

    router.get("/:id", authMiddleware, controller.addressGetOneById);

    /**
     * @openapi
     * /api/profile/address/{id}:
     *  delete:
     *    tags:
     *      - Address
     *    summary: Delete address
     *    description: This enpoint is for logic delete address
     *    operationId: deleteAddress
     *    parameters:
     *      - name: id
     *        in: path
     *        description: ID of the address that needs to be deleted
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
     *        description: Address not found
     *    security:
     *      - bearerAuth: []
     */

    router.delete("/:id", authMiddleware, controller.addressDelete);

    return router;
  }
}
