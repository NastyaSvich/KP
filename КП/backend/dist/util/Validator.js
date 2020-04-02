"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const joi_1 = __importDefault(require("joi"));
function Validator(data, schema) {
    const validationResult = joi_1.default.validate(data, schema, { abortEarly: false });
    if (validationResult.error) {
        throw new http_errors_1.default.BadRequest({ message: "Validation error", data: validationResult.error.details });
    }
    return validationResult.value;
}
exports.default = Validator;
//# sourceMappingURL=Validator.js.map