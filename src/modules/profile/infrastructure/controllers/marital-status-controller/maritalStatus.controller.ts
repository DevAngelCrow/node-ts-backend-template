import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";

export class MaritalStatusController {
  createMaritalStatus(request: Request, response: Response) {
    const { name } = request.body;
    ServiceContainer.maritalStatus.create
      .run(name)
      .then(() =>
        response.status(201).send("Marital status created successful")
      )
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }

  updateMaritalStatus(request: Request, response: Response) {
    const { name } = request.body;
    const { id } = request.params;

    ServiceContainer.maritalStatus.update
      .run(+id, name)
      .then(() =>
        response.status(200).send("Marital status updated successful")
      )
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }
  getAllMaritalStatus(request: Request, response: Response) {
    ServiceContainer.maritalStatus.getAll
      .run()
      .then((items) =>
        response
          .status(200)
          .json(items.map((maritalStatus) => maritalStatus.mapToPrimitives()))
      )
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }
  getByIdMaritalStatus(request: Request, response: Response){
    const { id } = request.params;
    ServiceContainer.maritalStatus.getOneById.run(+id)
    .then((item) => response.status(200).json(item?.mapToPrimitives()))
    .catch((error)=> response.status(error.statusCode).json({message: error.message}))
  }
}
