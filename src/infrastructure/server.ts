import express, { Router } from 'express';
import path from 'path';
import { ServerOptions } from '../domain';

export class Server {
    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: ServerOptions){
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){
        //este middleware nos sirve para que el servidor pueda recibir hasta un maximo de 100mb en cada petición http
        this.app.use(express.json({limit: '100mb'}));

        //este middleware nos sirve para aceptar y enviar en las peticiones https data por medio de x-www-form-urlencoded
        this.app.use(express.urlencoded({extended: true}));

        //public folder
        this.app.use(express.static(this.publicPath));

        //Rutas de cada enpoint
        this.app.use('/api', this.routes);

        this.app.get(/^\/(?!api).*/, (request, response)=>{
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            response.sendFile(indexPath)
        });

        this.serverListener = this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`)
        })
    }

    public close(){
        this.serverListener?.close();
    }

}