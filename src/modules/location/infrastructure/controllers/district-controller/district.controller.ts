import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";

export class DistrictController {
    createDistrict(request: Request, response: Response){
        const { id_municipality, name, description, state } = request.body;
        ServiceContainer.district.create.run(id_municipality, name, description, state)
        .then(() => response.status(201).send("District created successful"))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }

    updateDistrict(request: Request, response: Response){
        const { id_municipality, name, description, state } = request.body;
        const {id} = request.params;

        ServiceContainer.district.update.run(+id, id_municipality, name, description, state)
        .then(()=> response.status(200).send("District updated successful"))
        .catch((error) => response.status(200).json({message: error.message}))
    }
    getOneByIdDistrict(request: Request, response: Response){
        const { id } = request.params;

        ServiceContainer.district.getOneById.run(+id)
        .then((district) => response.status(200).json(district?.mapToPrimitives()))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }
    getAllDistricts(request: Request, response: Response){
        ServiceContainer.district.getAll.run()
        .then((districts) => response.status(200).json(districts.map((district) => district.mapToPrimitives())))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }
    deleteDistrict(request: Request, response: Response){
        const { id } = request.params;

        ServiceContainer.district.delete.run(+id)
        .then(() => response.status(200).send("District deleted successful"))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}))
    }
}