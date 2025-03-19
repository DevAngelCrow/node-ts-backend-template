import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";

export class PeopleStatusController {
    peopleStatusCreate(request: Request, response: Response){
        const { name, description } = request.body;
        ServiceContainer.peopleStatus.create.run(name, description)
        .then(() => response.status(201).send("People status created successful"))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }
    peopleStatusUpdate(request: Request, response: Response){
        const { id } = request.params;
        const { name, description } = request.body;

        ServiceContainer.peopleStatus.update.run(+id, name, description)
        .then(()=> response.status(200).send("People status updated successful"))
        .catch((error) => response.status(200).json({message: error.message}))
    }
    peopleStatusGetOneById(request: Request, response: Response){
        const { id } = request.params;
        ServiceContainer.peopleStatus.getOneById.run(+id)
        .then((peopleStatus) => response.status(200).json(peopleStatus?.mapToPrimitives()))
        .catch((error)=> response.status(200).json({message: error.message}))
    }
    peopleStatusGetAll(request: Request, response: Response){
        ServiceContainer.peopleStatus.getAll.run()
        .then((items) => response.status(200).json(items.map((peopleStatus) => peopleStatus.mapToPrimitives())))
    }
}