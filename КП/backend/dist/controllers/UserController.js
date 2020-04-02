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
const index_1 = require("../index");
const http_errors_1 = __importDefault(require("http-errors"));
const joi_1 = __importDefault(require("joi"));
const Validator_1 = __importDefault(require("../util/Validator"));
const UserResource_1 = __importDefault(require("../resources/UserResource"));
const js_sha512_1 = require("js-sha512");
const User = index_1.dbProcessor.getModel('User');
class UserController {
    static registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                Validator_1.default(req.body, UserController.UserRegistrationSchema);
                const isUserExist = yield User.findOne({ login });
                if (isUserExist)
                    throw new http_errors_1.default.BadRequest('such user already exist');
                const newUser = yield User.registration(login, password);
                const token = newUser.createToken();
                next({ token, user: new UserResource_1.default(newUser).uncover() });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                Validator_1.default(req.body, UserController.UserRegistrationSchema);
                const user = yield User.findOne({ login });
                if (user) {
                    if (user.password !== js_sha512_1.sha512(password))
                        throw new http_errors_1.default.Unauthorized('password is incorrect');
                    const token = user.createToken();
                    next({ token, user: new UserResource_1.default(user).uncover() });
                }
                else {
                    throw new http_errors_1.default.Unauthorized('such user is not exist');
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password, photoUrl } = req.body;
                const { _id: id } = req.user;
                const query = {};
                Validator_1.default(req.body, UserController.UserUpdateSchema);
                if (login)
                    query.login = login;
                if (password)
                    query.password = js_sha512_1.sha512(password);
                if (photoUrl)
                    query.photoUrl = photoUrl;
                const user = yield User.findByIdAndUpdate(id, query, { new: true });
                next(new UserResource_1.default(user));
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = UserController;
UserController.UserRegistrationSchema = {
    login: joi_1.default.string().alphanum().required(),
    password: joi_1.default.string().min(6).required(),
};
UserController.UserUpdateSchema = {
    login: joi_1.default.string().alphanum().optional(),
    password: joi_1.default.string().min(6).optional(),
    photoUrl: joi_1.default.string().optional()
};
//# sourceMappingURL=UserController.js.map