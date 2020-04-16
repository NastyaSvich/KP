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
const joi_1 = __importDefault(require("joi"));
const index_1 = require("../index");
const http_errors_1 = __importDefault(require("http-errors"));
const Validator_1 = __importDefault(require("../util/Validator"));
const VideoCollectionResource_1 = __importDefault(require("../resources/VideoCollectionResource"));
const mongoose_1 = require("mongoose");
const VideoResource_1 = __importDefault(require("../resources/VideoResource"));
const FeedbackCollectionResource_1 = __importDefault(require("../resources/FeedbackCollectionResource"));
const UserResource_1 = __importDefault(require("../resources/UserResource"));
const Video = index_1.dbProcessor.getModel('Video');
const User = index_1.dbProcessor.getModel('User');
class VideoController {
    static getVideos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { offset, limit, search_value, order, sort_field, filter, filter_value } = req.query;
                Validator_1.default(req.query, VideoController.queryValidationSchema);
                let videos = yield Video.getVideos({
                    offset: parseInt(offset, 10),
                    limit: parseInt(limit, 10),
                    order,
                    sort_field,
                    filter,
                    filter_value
                });
                if (search_value)
                    videos = videos.filter((video) => video.title.match(new RegExp(search_value, 'ig')));
                next(new VideoCollectionResource_1.default(videos, { offset, limit, order, sort_field, filter, filter_value, search_value }));
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getVideo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!mongoose_1.Types.ObjectId.isValid(id))
                    throw new http_errors_1.default.BadRequest('sent id is not correct');
                const video = yield Video.findById(id);
                const feedbacks = yield Promise.all((yield Video.getFeedbacks(id)).map((feedback) => __awaiter(this, void 0, void 0, function* () {
                    return ({
                        rate: feedback.rate,
                        feedback: feedback.feedback,
                        id: feedback._id,
                        user: new UserResource_1.default(yield User.findById(feedback.user)).uncover(),
                    });
                })));
                if (!video)
                    throw new http_errors_1.default.NotFound('video with such id was not found');
                next(Object.assign(Object.assign({}, (new VideoResource_1.default(video).uncover())), { feedbacks: new FeedbackCollectionResource_1.default(feedbacks).uncover() }));
            }
            catch (err) {
                next(err);
            }
        });
    }
    static postVideo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, poster, description, genre, year } = req.body;
                Validator_1.default(req.body, VideoController.videoValidationSchema);
                yield Video.create({ title, poster, description, genre, year });
                next({ message: 'Video was successfully added!' });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static deleteVideo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!mongoose_1.Types.ObjectId.isValid(id))
                    throw new http_errors_1.default.BadRequest('sent id is not correct');
                const video = yield Video.findByIdAndDelete(id);
                if (!video)
                    throw new http_errors_1.default.NotFound('video with such id was not found');
                next('video was successfully deleted');
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editVideo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, poster, description, genre, year } = req.body;
                const query = {};
                Validator_1.default(req.body, VideoController.editVideoValidationSchema);
                if (!mongoose_1.Types.ObjectId.isValid(id))
                    throw new http_errors_1.default.BadRequest('sent id is not correct');
                if (title)
                    query.title = title;
                if (poster)
                    query.poster = poster;
                if (description)
                    query.description = description;
                if (genre)
                    query.genre = genre;
                if (year)
                    query.year = year;
                const video = yield Video.findByIdAndUpdate(id, query, { new: true });
                if (!video)
                    throw new http_errors_1.default.NotFound('video with such id was not found');
                next(new VideoResource_1.default(video));
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = VideoController;
VideoController.videoValidationSchema = {
    title: joi_1.default.string(),
    poster: joi_1.default.string(),
    description: joi_1.default.string(),
    genre: joi_1.default.string(),
    year: joi_1.default.number(),
};
VideoController.editVideoValidationSchema = {
    title: joi_1.default.string().optional(),
    poster: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    genre: joi_1.default.string().optional(),
    year: joi_1.default.number().optional(),
};
VideoController.queryValidationSchema = {
    offset: joi_1.default.number().optional(),
    limit: joi_1.default.number().optional(),
    search_value: joi_1.default.string().optional(),
    order: joi_1.default.string().optional(),
    sort_field: joi_1.default.string().optional(),
    filter: joi_1.default.string().optional(),
    filter_value: joi_1.default.optional()
};
//# sourceMappingURL=VideoController.js.map