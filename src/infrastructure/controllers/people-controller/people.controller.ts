import { Request, Response } from "express";
import DateTimeService from "../../services/date-time/date.time.services";
import { ServiceContainer } from "../../../shared/infraestructure/ServiceContainer";

export class PeopleController {
  async createPeople(request: Request, response: Response) {
    const dt = new DateTimeService().dateTime;
    const {
      first_name,
      middle_name,
      last_name,
      birthdate,
      id_gender,
      email,
      id_marital_status,
      phone,
      has_insurance,
      id_status,
      nationality,
    } = request.body;
    const birthdateFormated = dt.fromISO(birthdate).toJSDate();
    const img_path = request.file!;
    await ServiceContainer.people.create
      .run(
        first_name,
        middle_name,
        last_name,
        birthdateFormated,
        id_gender,
        email,
        id_marital_status,
        img_path,
        phone,
        Boolean(has_insurance),
        id_status,
        nationality
      )
      .then(() =>
        response.status(201).send({ message: "People created successful" })
      )
      .catch((error) => {
        response.status(error.statusCode).json({ message: error.message });
      });
  }

  async getAllPeople(request: Request, response: Response) {
    await ServiceContainer.people.getAll
      .run()
      .then((res) => {
        return response
          .json(res.map((people) => people.mapToPrimitives()))
          .status(200);
      })
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }

  async getPeopleById(request: Request, response: Response) {
    const { id } = request.params;
    await ServiceContainer.people.getOneById
      .run(+id)
      .then((res) => {
        return response.status(200).json(res?.mapToPrimitives());
      })
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }

  async updatePerson(request: Request, response: Response) {
    const dt = new DateTimeService().dateTime;
    const { id } = request.params;
    const img_path = request.file!;
    const {
      first_name,
      middle_name,
      last_name,
      birthdate,
      id_gender,
      email,
      id_marital_status,
      phone,
      has_insurance,
      id_status,
      nationality,
    } = request.body;
    const birthdateFormated = dt.fromISO(birthdate).toJSDate();
    await ServiceContainer.people.update.run(
      +id,
      first_name,
      middle_name,
      last_name,
      birthdateFormated,
      +id_gender,
      email,
      +id_marital_status,
      img_path,
      phone,
      Boolean(has_insurance),
      +id_status,
      nationality
    ).then(() =>
      response.status(200).send({ message: "People updated successful" })
    )
    .catch((error) => {
      response.status(error.statusCode).json({ message: error.message });
    });
  }
}
