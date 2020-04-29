"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseResource_1 = __importDefault(require("./BaseResource"));
class FeedbackResource extends BaseResource_1.default {
    uncover() {
        return {
            user: this.user,
            rate: this.rate,
            feedback: this.feedback,
            id: this.id
        };
    }
}
exports.default = FeedbackResource;
//# sourceMappingURL=FeedbackResource.js.map