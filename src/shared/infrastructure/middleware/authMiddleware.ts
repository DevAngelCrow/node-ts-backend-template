import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../services-container/ServiceContainer";
import { JwtPayload } from "jsonwebtoken";

export class AuthMiddleware {
    static validateJWT = async (request: Request, response: Response, next: NextFunction) : Promise<void> => {
        const authorization = request.header("Authorization");
        if(!authorization){response.status(401).json({error: "No token provided"}); return;}
        if(!authorization.startsWith("Bearer ")){response.status(401).json({error: "Invalid Bearer token"}); return}

        const token : string = authorization.split(' ').at(1) || '';

        try {
            const payload = await ServiceContainer.authService.verifyToken.run<JwtPayload>(token);
            if(!payload){ response.status(401).json({error: 'Invalid token - user'}); return ;}

            next();
        } catch (error) {
            response.status(500).json({error: 'Internal server error'});
            return;
        }
        
    }
}