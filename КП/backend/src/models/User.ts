import { Document, Mongoose, Schema } from 'mongoose';
import { sha512 } from 'js-sha512';
import jwt from 'jsonwebtoken'
import { config } from '../index'

const UserSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    photoUrl: {
        type: String,
        required: false
    }
});

UserSchema.method('createToken', function() {
    return jwt.sign({ userId: this._id.toString() }, config.env.PRIVATE_KEY)
});

UserSchema.static('registration', async function (login: string, password: string) {
    return await this.create({ login, password: sha512(password), isAdmin: false, photoUrl: config.env.DEFAULT_USER_IMAGE });
});

UserSchema.static('isExist', async function (id: string) {
    return null != await this.findById(id);
});

UserSchema.static('findByToken', async function (token: string) {
    try {
        const decodedToken: any = jwt.verify(token, config.env.PRIVATE_KEY);
        let user: Document | null;

        if(!decodedToken || typeof  decodedToken !== 'object') return false;

        if('userId' in decodedToken) {
            user = await this.findById(decodedToken.userId);
        } else return false;

        if(!user) return false;
        return user;
    } catch(err) {
        return false;
    }
});

export default (mongoose: Mongoose) => mongoose.model('User', UserSchema);

