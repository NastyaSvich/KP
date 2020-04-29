"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = __importDefault(require("../middlewares/Auth"));
const RolikController_1 = __importDefault(require("../controllers/RolikController"));
function default_1() {
    this.get('/roliks', RolikController_1.default.getRoliks);
    this.post('/rolik', Auth_1.default(true), RolikController_1.default.postRolik);
    this.get('/rolik/:id', RolikController_1.default.getRolik);
    this.delete('/rolik/:id', Auth_1.default(true), RolikController_1.default.deleteRolik);
    this.put('/rolik/:id', Auth_1.default(true), RolikController_1.default.editRolik);
}
exports.default = default_1;
//# sourceMappingURL=Rolik.js.map