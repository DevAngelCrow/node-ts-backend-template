import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";

export class MunicipalityController {
  createMunicipality(request: Request, response: Response) {
    const { id_department, name, description } = request.body;
    ServiceContainer.municipality.create
      .run(+id_department, name, description)
      .then(() => response.status(201).send("Municipality created successful"))
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }
  updateMunicipality(request: Request, response: Response) {
    const { id_department, name, description } = request.body;
    const { id } = request.params;
    ServiceContainer.municipality.update
      .run(+id, +id_department, name, description)
      .then(() => response.status(200).send("Municipality updated successful"))
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }
  getMunicipalities(request: Request, response: Response) {
    ServiceContainer.municipality.getAll
      .run()
      .then((municipalities) =>
        response
          .status(200)
          .json(
            municipalities.map((municipality) => municipality.mapToPrimitives())
          )
      )
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }
  getMunicipality(request: Request, response: Response) {
    const { id } = request.params;

    ServiceContainer.municipality.getOneById
      .run(+id)
      .then((municipality) =>
        response.status(200).json(municipality?.mapToPrimitives())
      )
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }
}
