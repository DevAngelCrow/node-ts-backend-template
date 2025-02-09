import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infraestructure/services-container/ServiceContainer";

export class CountryController {
    async getById(request: Request, response: Response){
        const { id } = request.params;

        await ServiceContainer.country.getOneById.run(+id!)
        .then((res) => {
            response.status(200).json(res?.mapToPrimitives())
        })
        .catch((error)=> response.status(error.statusCode).json({message: error.message}))
    }
}