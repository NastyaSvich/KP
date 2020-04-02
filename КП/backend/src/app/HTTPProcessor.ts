import ConfigController from './ConfigController';
import express, {Express, Router} from 'express';
import { extname, resolve } from "path";
import { promises } from "fs";
import { Server } from 'http';
import cors from 'cors';
import DBProcessor from './DBProcessor';
import ErrorHandler from '../middlewares/ErrorHandler';
import ResourceHandler from '../middlewares/ResourceHandler';
import bodyParser from 'body-parser';
import {config} from "../index";

export default class HTTPProcessor {

    protected config: ConfigController;
    protected expressServer: Express;
    protected expressRouter: Router;
    protected dbProcessor: DBProcessor;
    protected httpServer: Server;

    constructor(dbProcessor: DBProcessor, config: ConfigController){
        this.config = config;
        this.expressServer = express();
        this.dbProcessor = dbProcessor;
        this.expressRouter = Router();
        this.httpServer = new Server(this.expressServer);
    }

    public async startServer(){
        const BasePath = '/';

        const { config: { env: { APP_HOST, APP_PORT } } } = this.config;
        this.expressServer.use(BasePath, cors());
        this.expressServer.use(BasePath, bodyParser.json());
        this.expressServer.use(BasePath, this.expressRouter);
        this.expressServer.use(BasePath, ResourceHandler);
        this.expressServer.use(BasePath, ErrorHandler);

        await this.dbProcessor.connect(config.env.DB_ADDRESS);
        this.httpServer.listen(APP_PORT, APP_HOST, () => {
            console.log(`server was started at: http://${APP_HOST}:${APP_PORT}`);
        });
    }

    public async importRoute(routePath: string){
        if(extname(routePath) === '.js') {
            const { default: route } = await import(routePath);
            route.call(this.expressRouter)
        }
    }

    public async importRoutes(route: string){
        const content = await promises.readdir(route);
        await Promise.all(content.map(async (fileName: string) => {
            const fullName = resolve(route, fileName);
            const fileStat = await promises.lstat(fullName);
            if(fileStat.isDirectory()) await this.importRoutes(fullName);
            else await this.importRoute(fullName);
        }));
    }
};
