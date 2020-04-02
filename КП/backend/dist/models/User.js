"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const js_sha512_1 = require("js-sha512");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const UserSchema = new mongoose_1.Schema({
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
UserSchema.method('createToken', function () {
    return jsonwebtoken_1.default.sign({ userId: this._id.toString() }, index_1.config.env.PRIVATE_KEY);
});
UserSchema.static('registration', function (login, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.create({ login, password: js_sha512_1.sha512(password), isAdmin: false, photoUrl: index_1.config.env.DEFAULT_USER_IMAGE });
    });
});
UserSchema.static('isExist', function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return null != (yield this.findById(id));
    });
});
UserSchema.static('findByToken', function (token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, index_1.config.env.PRIVATE_KEY);
            let user;
            if (!decodedToken || typeof decodedToken !== 'object')
                return false;
            if ('userId' in decodedToken) {
                user = yield this.findById(decodedToken.userId);
            }
            else
                return false;
            if (!user)
                return false;
            return user;
        }
        catch (err) {
            return false;
        }
    });
});
exports.default = (mongoose) => mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map