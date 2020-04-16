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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const Validator_1 = __importDefault(require("../util/Validator"));
const FeedbackResource_1 = __importDefault(require("../resources/FeedbackResource"));
const UserResource_1 = __importDefault(require("../resources/UserResource"));
const Feedback = index_1.dbProcessor.getModel('Feedback');
const Video = index_1.dbProcessor.getModel('Video');
class FeedbackController {
    static addFeedback(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id: userId } = req.user;
                const { rate, feedback, videoId } = req.body;
                Validator_1.default(req.body, FeedbackController.feedbackValidationSchema);
                if (!mongoose_1.Types.ObjectId.isValid(videoId))
                    throw new http_errors_1.default.BadRequest('video id must be objectId type');
                const video = yield Video.findById(videoId);
                if (!video)
                    throw new http_errors_1.default.NotFound('Video with such id was not found');
                if (yield Feedback.isExist(userId, videoId))
                    throw new http_errors_1.default.BadRequest('user left feedback already');
                const { _id: feedbackId, rate: userRate, feedback: userFeedback } = yield Feedback.addFeedback(userId, videoId, rate, feedback);
                yield video.addFeedback(feedbackId);
                yield Video.recalculateRating(videoId);
                next(new FeedbackResource_1.default({
                    id: feedbackId,
                    rate: userRate,
                    feedback: userFeedback,
                    user: new UserResource_1.default(req.user).uncover()
                }));
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editFeedback(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rate, feedback } = req.body;
                const { id: feedbackId } = req.params;
                const queue = {};
                Validator_1.default({ rate, feedback, videoId: feedbackId }, FeedbackController.editFeedbackValidationSchema);
                if (!mongoose_1.Types.ObjectId.isValid(feedbackId))
                    throw new http_errors_1.default.BadRequest('feedback id must be objectId type');
                if (rate)
                    queue.rate = rate;
                if (feedback)
                    queue.feedback = feedback;
                const updatedFeedback = yield Feedback.findByIdAndUpdate(feedbackId, queue, { new: true });
                yield Video.recalculateRating(updatedFeedback.video);
                next(new FeedbackResource_1.default(updatedFeedback));
            }
            catch (err) {
                next(err);
            }
        });
    }
    static deleteFeedback(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: feedbackId } = req.params;
                const { _id: userId } = req.user;
                if (!mongoose_1.Types.ObjectId.isValid(feedbackId))
                    throw new http_errors_1.default.BadRequest('feedback id must be objectId type');
                const removed = yield Feedback.findOneAndDelete({ _id: feedbackId, user: userId });
                if (!removed)
                    throw new http_errors_1.default.NotFound('feedback with such id was not found');
                yield Video.removeFeedback(removed.video, feedbackId);
                next('feedback was successfully deleted');
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
}
exports.default = FeedbackController;
FeedbackController.feedbackValidationSchema = {
    rate: joi_1.default.number().min(0).max(10).required(),
    feedback: joi_1.default.string().required(),
    videoId: joi_1.default.string().required()
};
FeedbackController.editFeedbackValidationSchema = {
    rate: joi_1.default.number().min(0).max(10).optional(),
    feedback: joi_1.default.string().optional(),
    videoId: joi_1.default.string().required()
};
//# sourceMappingURL=FeedbackController.js.map