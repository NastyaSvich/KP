import { dbProcessor } from "../index";
import { IFeedback, IFeedbackModel } from '../models/Feedback.d';
import { IFilm, IFilmModel } from '../models/Film.d';
import httpError from 'http-errors';
import { Types } from "mongoose";
import Joi from 'joi';
import Validator from "../util/Validator";
import FeedbackResource from "../resources/FeedbackResource";
import UserResource from "../resources/UserResource";

const Feedback = dbProcessor.getModel<IFeedback, IFeedbackModel>('Feedback');
const Film = dbProcessor.getModel<IFilm, IFilmModel>('Film');

export default class FeedbackController {

    public static feedbackValidationSchema = {
        rate: Joi.number().min(0).max(10).required(),
        feedback: Joi.string().required(),
        filmId: Joi.string().required()
    };

    public static editFeedbackValidationSchema = {
        rate: Joi.number().min(0).max(10).optional(),
        feedback: Joi.string().optional(),
        filmId: Joi.string().required()
    };

    public static async addFeedback(req: any, res: any, next: any){
        try {
            const { _id: userId } = req.user;
            const { rate, feedback, filmId } = req.body;

            Validator(req.body, FeedbackController.feedbackValidationSchema);
            if(!Types.ObjectId.isValid(filmId)) throw new httpError.BadRequest('film id must be objectId type');
            const film = await Film.findById(filmId);
            if(!film) throw new httpError.NotFound('Film with such id was not found');
            if(await Feedback.isExist(userId, filmId)) throw new httpError.BadRequest('user left feedback already');
            const {
                _id: feedbackId,
                rate: userRate,
                feedback: userFeedback
            }  = await Feedback.addFeedback(userId, filmId, rate, feedback);
            await film.addFeedback(feedbackId);
            await Film.recalculateRating(filmId);

            next(new FeedbackResource({
                id: feedbackId,
                rate: userRate,
                feedback: userFeedback,
                user: new UserResource(req.user).uncover()
            }))
        } catch(err) {
            next(err)
        }
    }

    public static async editFeedback(req: any, res: any, next: any) {
        try {
            const { rate, feedback } = req.body;
            const { id: feedbackId } = req.params;
            const queue: any = {}

            Validator({ rate, feedback, filmId: feedbackId }, FeedbackController.editFeedbackValidationSchema);
            if(!Types.ObjectId.isValid(feedbackId)) throw new httpError.BadRequest('feedback id must be objectId type');
            if(rate) queue.rate = rate;
            if(feedback) queue.feedback = feedback;
            const updatedFeedback: any = await Feedback.findByIdAndUpdate(feedbackId, queue, { new: true });
            await Film.recalculateRating(updatedFeedback.film);

            next(new FeedbackResource(updatedFeedback))
        } catch(err) {
            next(err)
        }
    }

    public static async deleteFeedback(req: any, res: any, next: any) {
        try {
            const { id: feedbackId } = req.params;
            const { _id: userId } = req.user;

            if(!Types.ObjectId.isValid(feedbackId)) throw new httpError.BadRequest('feedback id must be objectId type');
            const removed: any = await Feedback.findOneAndDelete({ _id: feedbackId, user: userId });
            if(!removed) throw new httpError.NotFound('feedback with such id was not found');
            await Film.removeFeedback(removed.film, feedbackId);

            next('feedback was successfully deleted');
        } catch(err) {
            console.log(err)
            next(err)
        }
    }

}
