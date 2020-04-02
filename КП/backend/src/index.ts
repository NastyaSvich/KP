import HTTPProcessor from './app/HTTPProcessor';
import ConfigController from './app/ConfigController';
import DBProcessor from './app/DBProcessor';

const configController = new ConfigController();
export const config = configController.config;
export const dbProcessor = new DBProcessor();
export const server = new HTTPProcessor(dbProcessor, configController);

(async function(){
    await dbProcessor.importModels(config.env.MODELS_PATH);
    await server.importRoutes(config.env.ROUTES_PATH);
    server.startServer();
})();
