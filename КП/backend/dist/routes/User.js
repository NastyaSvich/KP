"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../controllers/UserController"));
function default_1() {
    this.post('/registration', UserController_1.default.registerUser);
    this.post('/login', UserController_1.default.loginUser);
    this.put('/user', Auth_1.default(false), UserController_1.default.editUser);
}
exports.default = default_1;
//# sourceMappingURL=User.js.map