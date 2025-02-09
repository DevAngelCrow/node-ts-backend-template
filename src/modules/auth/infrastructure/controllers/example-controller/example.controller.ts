import { Request, Response } from "express";
import { ServiceContainer } from "../../../../../shared/infrastructure/services-container/ServiceContainer";
export class ExampleController {
    async create(request: Request, response: Response){
        const { example_name } = request.body;

        await ServiceContainer.example.create.run(example_name)
        .then(()=> response.status(201).json({ message: "Example created successfully"}))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}))
    }

    async getAll(request: Request, response: Response){
        await ServiceContainer.example.getAll.run()
        .then((res)=> response.status(200).json(res))
    }
}