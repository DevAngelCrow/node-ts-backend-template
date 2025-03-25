import { Router } from "express";
import { DepartmentController } from "./department.controller";

export class DepartmentRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new DepartmentController();

    /**
     * @openapi
     * /api/location/department/create:
     *   post:
     *    tags:
     *      - Department
     *    summary: Create department
     *    description: This enpoint is to create department
     *    operationId: createDepartment
     *    requestBody:
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/Department create"
     *    responses:
     *      '201':
     *        description: Retorna mensaje
     *      '404':
     *        description: Hola
     *    security:
     *      - bearerAuth: []
     *
     */
    router.post("/create", controller.createDepartment);

    /**
     * @openapi
     * /api/location/department/{id}:
     *   put:
     *     tags:
     *       - Department
     *     summary: Update department by id
     *     description: This endpoint is for updating a department record
     *     operationId: updateDepartment
     *     parameters:
     *       - name: id
     *         in: path
     *         description: Id of the department that needs to be updated
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/Department create"
     *     responses:
     *       '200':
     *         description: Retorna mensaje
     *       '404':
     *         description: Hola
     *     security:
     *       - bearerAuth: []
     */

    router.put("/:id", controller.updateDepartment);

    /**
     * @openapi
     * /api/location/department/:
     *  get:
     *    tags:
     *      - Department
     *    summary: Get Departments
     *    description: This enpoint is for get the data all departments
     *    operationId: getDepartments
     *    responses:
     *      '200':
     *        description: "Data obtained"
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#/components/schemas/Department get"
     *      '404':
     *        description: "Department not found"
     *    security:
     *      - bearerAuth: []
     */

    router.get("/", controller.getAllDepartments);

    /**
     * @openapi
     * /api/location/department/{id}:
     *  get:
     *    tags:
     *      - Department
     *    summary: Get department by Id
     *    description: This enpoint is for get the data the department by id
     *    operationId: getDepartment
     *    parameters:
     *      - name: id
     *        in: path
     *        description: Id of the department that needs to be get data
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
     *              $ref: "#/components/schemas/Department get"
     *
     *      '404':
     *        description: "Deparment not found"
     *    security:
     *      - bearerAuth: []
     */

    router.get("/:id", controller.getDepartment);

    /**
     * @openapi
     * /api/location/department/{id}:
     *   delete:
     *     tags:
     *       - Department
     *     summary: Delete department by ID
     *     description: This endpoint is for delete department by id.
     *     operationId: deleteDepartment
     *     parameters:
     *       - name: id
     *         in: path
     *         description: ID of the department whose data needs to be delete.
     *         required: true
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       '200':
     *         description: "Data obtained"
     *       '404':
     *         description: "Department not found"
     *     security:
     *     - bearerAuth: []
     */
    router.delete("/:id", controller.deleteDepartment);

    return router;
  }
}
