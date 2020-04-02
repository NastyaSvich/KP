import { Model, Document } from 'mongoose';

export interface IUserDocument extends Document {
    login: string,
    password: string,
    isAdmin: boolean,
    photoUrl: string
}

export interface IUser extends IUserDocument {
    createToken(): Promise<string>
}

export interface IUserModel extends Model<IUser> {
    registration(login: string, password: string): Promise<IUser>
    isExist(id: string): Promise<boolean>
    findByToken(token: string): Promise<IUser> | Promise<boolean>
}
