import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";

export class AddressController{
    async addressGetOneById (request: Request, response: Response){

        const {id} = request.params;
        await ServiceContainer.address.getOneById.run(+id)
        .then((res) => {
            return response.status(200).json(res?.mapToPrimitives())
        })
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }
}