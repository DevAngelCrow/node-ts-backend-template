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
        console.log("Conexion a la base de datos establecida")
    })
    .catch((error) => console.log("Error en la conexión a la base de datos ", error));

    server.start();
}