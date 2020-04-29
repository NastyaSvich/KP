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
const User = index_1.dbProcessor.getModel('User');
exports.default = (checkAdminRole) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const header = req.header('Authorization');
        if (header) {
            const [bearer, token] = header.split(' ');
            if (bearer === 'Bearer') {
                let user;
                if (token)
                    user = yield User.findByToken(token);
                else
                    throw new http_errors_1.default.Unauthorized('Token was expected');
                if (!user)
                    throw new http_errors_1.default.Unauthorized('Token is not valid');
                if (checkAdminRole && !user.isAdmin)
                    throw new http_errors_1.default.Unauthorized('User have no admin permissions');
                req.user = user;
            }
            else
                throw new http_errors_1.default.Unauthorized('Bearer was expected');
        }
        else
            throw new http_errors_1.default.Unauthorized('Authorization header is required');
        next();
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=Auth.js.map