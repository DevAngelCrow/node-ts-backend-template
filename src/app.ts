import { Server } from "./infrastructure/server";
import { AppRoutes } from "./infrastructure/routes";
import { envs } from "./infrastructure/config/envs";
import { ServiceContainer } from "./shared/infraestructure/ServiceContainer";

(async ()=>{
    main();
})();

async function main(){
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    })
    
    server.start();
}