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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = require("path");
const fs_1 = require("fs");
class DBProcessor {
    constructor() {
        this.dbConnection = mongoose_1.default;
    }
    connect(address) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection.connect(address);
        });
    }
    importModel(modelPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (path_1.extname(modelPath) === '.js') {
                const { default: model } = yield Promise.resolve().then(() => __importStar(require(modelPath)));
                model(this.dbConnection);
            }
        });
    }
    importModels(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield fs_1.promises.readdir(path);
            yield Promise.all(content.map((fileName) => __awaiter(this, void 0, void 0, function* () {
                const fullName = path_1.resolve(path, fileName);
                const fileStat = yield fs_1.promises.lstat(fullName);
                if (fileStat.isDirectory())
                    yield this.importModels(fullName);
                else
                    yield this.importModel(fullName);
            })));
        });
    }
    getModel(modelName) {
        return this.dbConnection.model(modelName);
    }
}
exports.default = DBProcessor;
//# sourceMappingURL=DBProcessor.js.map