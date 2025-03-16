import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";

export class GenderController{
    async createGender(request: Request, response: Response){
        const { name } = request.body;
        ServiceContainer.gender.create.run(name)
        .then(()=> response.status(201).json("Gender created successful"))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}))
    }
}