import { Server } from "./infrastructure/server";
import { AppRoutes } from "./infrastructure/routes";

(async ()=>{
    main();
})();

async function main(){
    const server = new Server({
        port: Number(process.env.PORT),
        routes: AppRoutes.routes,
    })

    server.start();
}