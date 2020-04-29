"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseResource_1 = __importDefault(require("./BaseResource"));
class RolikResource extends BaseResource_1.default {
    uncover() {
        return {
            title: this.title,
            poster: this.poster,
            description: this.description,
            rating: this.rating,
            genre: this.genre,
            year: this.year,
            id: this._id
        };
    }
}
exports.default = RolikResource;
//# sourceMappingURL=RolikResource.js.map