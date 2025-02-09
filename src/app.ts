import { Server } from "./shared/infrastructure/server";
import { AppRoutes } from "./shared/infrastructure/routes";
import { envs } from "./shared/infrastructure/config/envs";

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