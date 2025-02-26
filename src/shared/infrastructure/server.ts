import express, { Router } from 'express';
import path from 'path';
import { ServerOptions } from './interfaces/ServerOptionsInterface';

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
        //this middleware is used so that the server can receive a limit of 100mb per http request
        this.app.use(express.json({limit: '100mb'}));
        //this middleware is used to accept and send the http request data from x-www-form-urlencoded
        this.app.use(express.urlencoded({extended: true}));

        //public folder
        this.app.use(express.static(this.publicPath));

        //Enpoint of the routes api
        this.app.use('/api', this.routes);
        this.app.get(/^\/(?!api).*/, (request, response)=>{
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            response.sendFile(indexPath)
        });

        this.serverListener = this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`)
        });

    }

    public close(){
        this.serverListener?.close();
    }

}