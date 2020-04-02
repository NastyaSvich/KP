"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseResource_1 = __importDefault(require("./BaseResource"));
class BaseCollectionResource extends BaseResource_1.default {
    constructor() {
        super(...arguments);
        this.innerResource = BaseResource_1.default;
    }
    uncover() {
        return {
            data: this.uncoverItems()
        };
    }
    uncoverItems() {
        return this.data.map((item) => new this.innerResource(item).uncover());
    }
}
exports.default = BaseCollectionResource;
//# sourceMappingURL=BaseCollectionResource.js.map