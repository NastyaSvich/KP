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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const path_1 = require("path");
const fs_1 = require("fs");
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const ErrorHandler_1 = __importDefault(require("../middlewares/ErrorHandler"));
const ResourceHandler_1 = __importDefault(require("../middlewares/ResourceHandler"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = require("../index");
class HTTPProcessor {
    constructor(dbProcessor, config) {
        this.config = config;
        this.expressServer = express_1.default();
        this.dbProcessor = dbProcessor;
        this.expressRouter = express_1.Router();
        this.httpServer = new http_1.Server(this.expressServer);
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const BasePath = '/';
            const { config: { env: { APP_HOST, APP_PORT } } } = this.config;
            this.expressServer.use(BasePath, cors_1.default());
            this.expressServer.use(BasePath, body_parser_1.default.json());
            this.expressServer.use(BasePath, this.expressRouter);
            this.expressServer.use(BasePath, ResourceHandler_1.default);
            this.expressServer.use(BasePath, ErrorHandler_1.default);
            yield this.dbProcessor.connect(index_1.config.env.DB_ADDRESS);
            this.httpServer.listen(APP_PORT, APP_HOST, () => {
                console.log(`server was started at: http://${APP_HOST}:${APP_PORT}`);
            });
        });
    }
    importRoute(routePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (path_1.extname(routePath) === '.js') {
                const { default: route } = yield Promise.resolve().then(() => __importStar(require(routePath)));
                route.call(this.expressRouter);
            }
        });
    }
    importRoutes(route) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield fs_1.promises.readdir(route);
            yield Promise.all(content.map((fileName) => __awaiter(this, void 0, void 0, function* () {
                const fullName = path_1.resolve(route, fileName);
                const fileStat = yield fs_1.promises.lstat(fullName);
                if (fileStat.isDirectory())
                    yield this.importRoutes(fullName);
                else
                    yield this.importRoute(fullName);
            })));
        });
    }
}
exports.default = HTTPProcessor;
;
//# sourceMappingURL=HTTPProcessor.js.map