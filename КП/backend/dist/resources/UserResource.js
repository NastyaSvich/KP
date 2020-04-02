"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseResource_1 = __importDefault(require("./BaseResource"));
class UserResource extends BaseResource_1.default {
    uncover() {
        return {
            login: this.login,
            photoUrl: this.photoUrl,
            isAdmin: this.isAdmin,
            id: this._id
        };
    }
}
exports.default = UserResource;
//# sourceMappingURL=UserResource.js.map