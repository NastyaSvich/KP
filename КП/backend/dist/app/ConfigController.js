"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
class ConfigController {
    constructor(initialConfig = {}) {
        this.config = initialConfig;
        this.config.env = dotenv_1.config({ path: path_1.resolve(path_1.dirname(path_1.dirname(__dirname)), '.env') }).parsed;
    }
}
exports.default = ConfigController;
//# sourceMappingURL=ConfigController.js.map