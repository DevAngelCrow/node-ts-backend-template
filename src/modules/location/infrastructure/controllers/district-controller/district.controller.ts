import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";
import { HttpStatusCode } from "../../../../../shared/infrastructure/config/httpCodes";

export class DistrictController {
  createDistrict(request: Request, response: Response) {
    const { id_municipality, name, description, state } = request.body;
    ServiceContainer.district.create
      .run(id_municipality, name, description, state)
      .then(() => response.status(HttpStatusCode.HTTP_CREATED).send("District created successful"))
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }

  updateDistrict(request: Request, response: Response) {
    const { id_municipality, name, description, state } = request.body;
    const { id } = request.params;

    ServiceContainer.district.update
      .run(+id, id_municipality, name, description, state)
      .then(() => response.status(HttpStatusCode.HTTP_OK).send("District updated successful"))
      .catch((error) => response.status(error.statusCode).json({ message: error.message }));
  }
  getOneByIdDistrict(request: Request, response: Response) {
    const { id } = request.params;

    ServiceContainer.district.getOneById
      .run(+id)
      .then((district) =>
        response.status(HttpStatusCode.HTTP_OK).json(district?.mapToPrimitives())
      )
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }
  getAllDistricts(request: Request, response: Response) {
    let { page, limit, filter } = request.query;
    let pageNumber: number = 0;
    let limitNumber: number = 0;
    if (request.query) {
      pageNumber = +page!;
      limitNumber = +limit!;
    }

    const params: { page: number; limit: number; filter?: string } = {
      page: pageNumber,
      limit: limitNumber,
    };

    if (filter) {
      params.filter =
        typeof filter === "string" ? filter.toString() : undefined;
    }

    ServiceContainer.district.getAll
      .run(params)
      .then((districts) =>
        response
          .status(HttpStatusCode.HTTP_OK)
          .json(
            Array.isArray(districts.data)
              ? districts.data.map((district) => district.mapToPrimitives())
              : []
          )
      )
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }
  deleteDistrict(request: Request, response: Response) {
    const { id } = request.params;

    ServiceContainer.district.delete
      .run(+id)
      .then(() => response.status(200).send("District deleted successful"))
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }
}
