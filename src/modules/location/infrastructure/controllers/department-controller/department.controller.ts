import {Response, Request } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";

export class DepartmentController {
    createDepartment(request: Request, response: Response){
        const { name, description, id_country } = request.body;
        ServiceContainer.department.create.run(name, description, +id_country)
        .then(()=> response.status(201).send("Department created successful"))
        .catch((error)=> response.status(error.statusCode).json({error: error.message}))
    }
    getAllDepartments(request: Request, response: Response){
        ServiceContainer.department.getAll.run()
        .then((departments) => response.status(200).json(departments.map((department)=> department.mapToPrimitives())))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}))
    }
    getDepartment(request: Request, response: Response){
        const { id } = request.params;
        ServiceContainer.department.getOneById.run(+id)
        .then((deparment) => response.status(200).json(deparment?.mapToPrimitives()))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}))
    }
    updateDepartment(request: Request, response: Response){
        const { id } = request.params;
        const { name, description, id_country } = request.body;
        ServiceContainer.department.update.run(+id, name, description, +id_country)
        .then(()=> response.status(200).send("Department updated successful"))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}))
    }
    deleteDepartment(request: Request, response: Response){
        const { id } = request.params;
        ServiceContainer.department.delete.run(+id)
        .then(()=> response.status(200).send("Deparment delete successful"))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}))
    }
}