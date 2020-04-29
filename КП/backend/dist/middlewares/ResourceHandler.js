"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseResource_1 = __importDefault(require("../resources/BaseResource"));
exports.default = (resource, req, res, next) => {
    if (resource instanceof BaseResource_1.default)
        res.status(200).send(resource.uncover());
    else
        res.status(200).send(resource);
};
//# sourceMappingURL=ResourceHandler.js.map