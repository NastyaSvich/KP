import { IUser, IUserModel } from '../models/User.d';
import { dbProcessor } from "../index";
import httpError from 'http-errors';

const User = dbProcessor.getModel<IUser, IUserModel>('User');

export default (checkAdminRole: boolean) => async (req: any, res: any, next: any) => {
    try {
        const header = req.header('Authorization');

        if(header) {
            const [bearer, token] = header.split(' ');
            if(bearer === 'Bearer') {
                let user: any;
                if(token) user = await User.findByToken(token);
                else throw new httpError.Unauthorized('Token was expected');
                if(!user) throw new httpError.Unauthorized('Token is not valid');
                if(checkAdminRole && !user.isAdmin) throw new httpError.Unauthorized('User have no admin permissions');
                req.user = user;
            } else throw new httpError.Unauthorized('Bearer was expected');
        } else throw new httpError.Unauthorized('Authorization header is required');

        next()
    } catch(err) {
        next(err)
    }
}
