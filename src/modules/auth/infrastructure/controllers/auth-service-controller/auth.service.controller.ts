import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infraestructure/services-container/ServiceContainer";

export class AuthServiceController {
    async login(request: Request, response: Response){
        const { email, password } = request.body;
        const { user, token } = await ServiceContainer.authService.verifyToken(email, password)
    }
}