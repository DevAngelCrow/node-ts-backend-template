import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";

export class AddressController{
    async addressCreate(request: Request, response: Response){
        const {
        street,
        street_number,
        neighborhood,
        id_district,
        house_number,
        block,
        pathway,
        description,
        id_people,
        active,
        current,
        } = request.body;

        await ServiceContainer.address.create.run(
        street,
        street_number,
        neighborhood,
        +id_district,
        +house_number,
        block,
        pathway,
        description,
        +id_people,
        active,
        current,
        )
        .then(()=> response.status(201).send("Address created successful"))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }

    async addressUpdate(request: Request, response: Response){
        
        const { id } = request.params;
        const {
            street,
            street_number,
            neighborhood,
            id_district,
            house_number,
            block,
            pathway,
            description,
            id_people,
            active,
            current,
            } = request.body;

            await ServiceContainer.address.update.run(
            +id,
            street,
            street_number,
            neighborhood,
            +id_district,
            house_number,
            block,
            pathway,
            description,
            +id_people,
            active,
            current,
            )
            .then(() => response.status(200).send("Address updated successful"))
            .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }
    async addressGetOneById (request: Request, response: Response){

        const {id} = request.params;
        await ServiceContainer.address.getOneById.run(+id)
        .then((res) => {
            return response.status(200).json(res?.mapToPrimitives())
        })
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }

    async addressGetAll (request: Request, response: Response){
        await ServiceContainer.address.getAll.run()
        .then((addresses) => {
            return response.status(200).json(addresses.map((address) => address.mapToPrimitives()))
        })
        .catch((error)=> response.status(error.statusCode).json({message: error.message}))
    }

    async addressDelete(request: Request, response: Response) {
        const { id } = request.params;

        await ServiceContainer.address.delete.run(+id)
        .then(() => response.status(200).send("Address deleted successful"))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }
}