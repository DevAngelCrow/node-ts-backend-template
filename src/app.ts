import { Server } from "./shared/infraestructure/server";
import { AppRoutes } from "./shared/infraestructure/routes";
import { envs } from "./shared/infraestructure/config/envs";

(async ()=>{
    main();
})();

async function main(){
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    });
    
    server.start();
}