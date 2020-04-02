import mongoose, { Document, Model, Mongoose } from 'mongoose'
import { extname, resolve } from "path";
import { promises } from "fs";

export default class DBProcessor{

    public dbConnection: Mongoose;

    constructor(){
        this.dbConnection = mongoose
    }

    public async connect(address: string) {
        await this.dbConnection.connect(address)
    }

    async importModel(modelPath: string) {
        if(extname(modelPath) === '.js') {
            const { default: model } = await import(modelPath);
            model(this.dbConnection)
        }
    }

    public async importModels(path: string){
        const content = await promises.readdir(path);
        await Promise.all(content.map(async (fileName: string) => {
            const fullName = resolve(path, fileName);
            const fileStat = await promises.lstat(fullName);
            if(fileStat.isDirectory()) await this.importModels(fullName);
            else await this.importModel(fullName);
        }));
    }

    public getModel<T extends Document, U extends Model<T>>(modelName: string) {
        return this.dbConnection.model<T, U>(modelName);
    }
}
