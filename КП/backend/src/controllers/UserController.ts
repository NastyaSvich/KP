import {IUser, IUserModel} from '../models/User.d';
import { dbProcessor } from "../index";
import httpError from 'http-errors';
import Joi from 'joi';
import Validator from '../util/Validator';
import UserResource from "../resources/UserResource";
import { sha512 } from "js-sha512";

const User = dbProcessor.getModel<IUser, IUserModel>('User');

export default class UserController {
    public static UserRegistrationSchema = {
        login: Joi.string().alphanum().required(),
        password: Joi.string().min(6).required(),
    };

    public static UserUpdateSchema = {
        login: Joi.string().alphanum().optional(),
        password: Joi.string().min(6).optional(),
        photoUrl: Joi.string().optional()
    };

    public static async registerUser(req: any, res: any, next: any) {
        try {
            const { login, password } = req.body;

            Validator(req.body, UserController.UserRegistrationSchema);

            const isUserExist = await User.findOne({ login });
            if (isUserExist) throw new httpError.BadRequest('such user already exist');

            const newUser = await User.registration(login, password);
            const token = newUser.createToken();

            next({ token, user: new UserResource(newUser).uncover() })
        } catch(err) {
          next(err)
        }
    }

    public static async loginUser(req: any, res: any, next: any) {
        try {
            const { login, password } = req.body;

            Validator(req.body, UserController.UserRegistrationSchema);
            const user = await User.findOne({ login });

            if(user) {
                if(user.password !== sha512(password)) throw new httpError.Unauthorized('password is incorrect');
                const token = user.createToken();
                next({ token, user: new UserResource(user).uncover() })
            } else {
                throw new httpError.Unauthorized('such user is not exist');
            }
        } catch(err) {
            next(err)
        }
    }

    public static async editUser(req: any, res: any, next: any) {
        try {
            const { login, password, photoUrl } = req.body;
            const { _id: id } = req.user;
            const query: any = {};

            Validator(req.body, UserController.UserUpdateSchema );
            if(login) query.login = login;
            if(password) query.password = sha512(password);
            if(photoUrl) query.photoUrl = photoUrl;
            const user = await User.findByIdAndUpdate(id, query, { new: true });

            next(new UserResource(user))
        } catch(err) {
            next(err)
        }
    }
}
