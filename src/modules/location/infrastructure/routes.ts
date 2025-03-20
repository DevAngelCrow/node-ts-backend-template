import { Router } from "express";
import { CountryRoutes } from "./controllers/country-controller/country.routes";
import { DistrictRoutes } from "./controllers/district-controller/district.routes";

export class LocationRoutes {
    static get routes() : Router {
        const router = Router();

        router.use('/country', CountryRoutes.routes);
        router.use('/district', DistrictRoutes.routes);
        // router.use('/department', DepartmentRoutes.routes);
        
        // router.use('/municipality', Municipality.routes);

        return router;
    }
}