import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../services-container/ServiceContainer";

export class AuthMiddleware {
    static validateJWT = async (request: Request, response: Response, next: NextFunction) => {
        const authorization = request.header("Authorization");
        if(!authorization){return response.status(401).json({error: "No token provided"})}
        if(!authorization.startsWith("Bearer ")){return response.status(401).json({error: "Invalid Bearer token"});}

        const token : string = authorization.split(' ').at(1) || '';

        try {
            const payload = await ServiceContainer.authService.verifyToken.run<{id: "prueba"}>(token);
            if(!payload){ return response.status(401).json({error: 'Invalid token - user'})}

            next();
        } catch (error) {
            response.status(500).json({error: 'Internal server error'})
            return null
        }
        return null
    }
}