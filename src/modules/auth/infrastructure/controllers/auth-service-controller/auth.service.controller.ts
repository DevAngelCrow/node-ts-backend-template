import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";

export class AuthServiceController {
   async login(request: Request, response: Response) {
    const { email, password } = request.body;
     await ServiceContainer.authService.authenticateUser
      .run(email, password)
      .then(({user, token}) => {
        response.status(200).json({ user, token });
      })
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }
}
