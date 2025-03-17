import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";

export class GenderController{
    async createGender(request: Request, response: Response){
        const { name } = request.body;
        await ServiceContainer.gender.create.run(name)
        .then(()=> response.status(201).json("Gender created successful"))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}))
    }

    async updateGender(request: Request, response: Response){
        const { name } = request.body;
        const { id } = request.params;

        ServiceContainer.gender.update.run(+id, name)
        .then(() => response.status(200).send("Gender updated successful"))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }

    async getOneByIdGender(request: Request, response: Response){
        const { id } = request.params;

        await ServiceContainer.gender.getOneById.run(+id)
        .then((gender) => response.status(200).json(gender?.mapToPrimitives()))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}))
    }
}