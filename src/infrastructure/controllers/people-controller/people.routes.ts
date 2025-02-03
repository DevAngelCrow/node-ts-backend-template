import { Router } from "express";
import { PeopleController } from "./people.controller";
import upload from "../../config/multer";


export class PeopleRoutes {
    static get routes() : Router {
        const router = Router();
        const controller = new PeopleController();

        router.post('/create', upload.single('img_path'), controller.createPeople );
        
        return router;
    }
}