import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";

export class CountryController {
    async create(request: Request, response: Response){
        const { name, abbreviation, code, state } = request.body;
        await ServiceContainer.country.create.run(
            name, abbreviation, code, state
        )
        .then(()=> response.status(201).send({message: "Country created successful"}))
        .catch((error) => {response.status(error.statusCode).json({message: error.message})})
    }
    async getById(request: Request, response: Response){
        const { id } = request.params;

        await ServiceContainer.country.getOneById.run(+id!)
        .then((res) => {
            response.status(200).json(res?.mapToPrimitives())
        })
        .catch((error)=> response.status(error.statusCode).json({message: error.message}))
    }

    async update(request: Request, response: Response){
        const { id } = request.params;
        const { name, abbreviation, code, state } = request.body;
        await ServiceContainer.country.update.run(+id, name, abbreviation, code, state)
        .then(() => response.status(200).send({message: "Update country successful"}))
        .catch((error) => {response.status(error.statusCode).json({message: error.message})})
    }

    async getAll(request: Request, response: Response){
        await ServiceContainer.country.getAll.run()
        .then((res) => response.status(200).json(res.map((country) => country.mapToPrimitives())))
        .catch((error)=> response.status(error.statusCode).json({ message: error.message}))
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;
        await ServiceContainer.country.delete.run(+id)
        .then(() => response.status(200).send({message: "Country record deleted successful"}))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}))
    }
}