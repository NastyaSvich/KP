"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCollectionResource_1 = __importDefault(require("./BaseCollectionResource"));
const FeedbackResource_1 = __importDefault(require("./FeedbackResource"));
class RolikCollectionResource extends BaseCollectionResource_1.default {
    constructor() {
        super(...arguments);
        this.innerResource = FeedbackResource_1.default;
    }
    uncover() {
        return Object.assign({ data: this.uncoverItems() }, this.params);
    }
}
exports.default = RolikCollectionResource;
//# sourceMappingURL=FeedbackCollectionResource.js.map