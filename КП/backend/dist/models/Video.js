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
exports.VideoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    poster: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    feedbacks: [String]
});
exports.VideoSchema.static('isExist', function (videoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return null !== (yield this.findById(videoId));
    });
});
exports.VideoSchema.static('getVideo', function (params) {
    return __awaiter(this, void 0, void 0, function* () {
        let { offset, limit, order, sort_field, filter, filter_value } = params;
        return yield this.find({ [filter]: filter_value }).sort({ [sort_field]: order }).skip(offset).limit(limit);
    });
});
exports.VideoSchema.method('addFeedback', function (feedbackId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.model('Video').findByIdAndUpdate(this._id, { "$push": { feedbacks: feedbackId } }, { new: true });
    });
});
exports.VideoSchema.static('getFeedbacks', function (videoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Promise.all((yield this.findById(videoId)).feedbacks.map((feedbackId) => __awaiter(this, void 0, void 0, function* () { return yield this.model('Feedback').findById(feedbackId); })));
    });
});
exports.VideoSchema.static('removeFeedback', function (videoId, feedbackId) {
    return __awaiter(this, void 0, void 0, function* () {
        const feedbacks = (yield this.findById(videoId)).feedbacks.filter((feedback) => feedback !== feedbackId);
        yield this.findByIdAndUpdate(videoId, { feedbacks }, { new: true });
        return yield this.recalculateRating(videoId);
    });
});
exports.VideoSchema.static('recalculateRating', function (videoId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rates = (yield this.getFeedbacks(videoId)).map((feedback) => feedback.rate);
        const rating = !!rates.length ? rates.reduce((sum, current) => sum + current, 0) / rates.length : 0;
        return yield this.findByIdAndUpdate(videoId, { rating }, { new: true });
    });
});
exports.default = (mongoose) => mongoose.model('Video', exports.VideoSchema);
//# sourceMappingURL=Video.js.map