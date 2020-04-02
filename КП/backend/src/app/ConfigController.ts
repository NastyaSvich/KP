import { config } from 'dotenv';
import { resolve, dirname } from 'path';

export default class ConfigController{
    public config: {
        env?: any
    };

    constructor(initialConfig: object = {}){
        this.config = initialConfig;
        this.config.env = config({ path: resolve(dirname(dirname(__dirname)), '.env') }).parsed;
    }
}