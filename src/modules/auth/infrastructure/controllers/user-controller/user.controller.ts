import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";
import DateTimeService from "../../../../../shared/infrastructure/services/date-time/date.time.services";

export class UserController {
  async createUser(request: Request, response: Response) {
    const dt = new DateTimeService().dateTime;
    const { id_people, user_name, password, id_status, last_access } =
      request.body;
    const hashedPassword = await ServiceContainer.authService.hashPassword.run(
      password
    );
    const lastAccessFormated = dt.fromISO(last_access).toJSDate();
    await ServiceContainer.user.create
      .run(
        id_people,
        user_name,
        hashedPassword.value,
        id_status,
        lastAccessFormated
      )
      .then(() => {
        response.status(201).json({ message: "User created successful" });
      })
      .catch((error) => {
        response.status(error.statusCode).json({ message: error.message });
      });
  }

  async findUserByEmail(request: Request, response: Response) {
    const { email } = request.body;

    await ServiceContainer.user.getOneByEmail
      .run(email)
      .then((res) => {
        response.status(200).json(res?.mapToPrimitivesLogin());
      })
      .catch((error) => {
        response.status(error.statusCode).json({ message: error.message });
      });
  }
}
