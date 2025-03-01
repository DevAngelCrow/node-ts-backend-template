import { Server } from "./shared/infrastructure/server";
import { AppRoutes } from "./shared/infrastructure/routes";
import { envs } from "./shared/infrastructure/config/envs";
import AppDataSource from "./shared/infrastructure/db/TypeOrmConfig";


(async ()=>{
    main();
})();

async function main(){
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    });
     AppDataSource.dataSource.initialize()
    .then(()=>{
        console.log("Database connection successfully established.")
    })
    .catch((error) => console.log("Failed to connect to the database: ", error));

    server.start();
}