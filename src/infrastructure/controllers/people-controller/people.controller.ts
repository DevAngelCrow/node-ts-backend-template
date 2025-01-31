import { Request, Response } from "express";
import DateTimeService from "../../services/date-time/date.time.services";
import { ServiceContainer } from "../../../shared/infraestructure/ServiceContainer";
//import { DateTime } from "luxon";

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
      img_path,
      phone,
      has_insurance,
      id_status,
      nationality
    } = request.body;
    
    const birthdateFormated = dt.fromISO(birthdate).toJSDate();
    
    await ServiceContainer.people.create.run(
      first_name,
      middle_name,
      last_name,
      birthdateFormated,
      id_gender,
      email,
      id_marital_status,
      img_path,
      phone,
      has_insurance,
      id_status,
      nationality,
    ).then(()=> response.status(201).send({message: "People created successful"}))
    .catch((error)=> {response.status(error.statusCode).json({message: error.message})})
  }
}
