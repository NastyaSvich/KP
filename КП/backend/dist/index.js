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
const HTTPProcessor_1 = __importDefault(require("./app/HTTPProcessor"));
const ConfigController_1 = __importDefault(require("./app/ConfigController"));
const DBProcessor_1 = __importDefault(require("./app/DBProcessor"));
const configController = new ConfigController_1.default();
exports.config = configController.config;
exports.dbProcessor = new DBProcessor_1.default();
exports.server = new HTTPProcessor_1.default(exports.dbProcessor, configController);
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.dbProcessor.importModels(exports.config.env.MODELS_PATH);
        yield exports.server.importRoutes(exports.config.env.ROUTES_PATH);
        exports.server.startServer();
    });
})();
//# sourceMappingURL=index.js.map