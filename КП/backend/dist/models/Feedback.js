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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.FeedbackSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    video: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Video'
    },
    rate: Number,
    feedback: String
});
exports.FeedbackSchema.static('isExist', function (userId, videoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return null !== (yield this.findOne({ user: userId, video: videoId }));
    });
});
exports.FeedbackSchema.static('addFeedback', function (userId, videoId, rate, feedback) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.create({ user: userId, video: videoId, rate, feedback });
    });
});
exports.default = (mongoose) => mongoose.model('Feedback', exports.FeedbackSchema);
//# sourceMappingURL=Feedback.js.map