import { dbProcessor } from "../index";
import { IFeedback, IFeedbackModel } from '../models/Feedback.d';
import { IRolik, IRolikModel } from '../models/Rolik.d';
import httpError from 'http-errors';
import { Types } from "mongoose";
import Joi from 'joi';
import Validator from "../util/Validator";
import FeedbackResource from "../resources/FeedbackResource";
import UserResource from "../resources/UserResource";

const Feedback = dbProcessor.getModel<IFeedback, IFeedbackModel>('Feedback');
const Rolik = dbProcessor.getModel<IRolik, IRolikModel>('Rolik');

export default class FeedbackController {

    public static feedbackValidationSchema = {
        rate: Joi.number().min(0).max(10).required(),
        feedback: Joi.string().required(),
        rolikId: Joi.string().required()
    };

    public static editFeedbackValidationSchema = {
        rate: Joi.number().min(0).max(10).optional(),
        feedback: Joi.string().optional(),
        rolikId: Joi.string().required()
    };

    public static async addFeedback(req: any, res: any, next: any){
        try {
            const { _id: userId } = req.user;
            const { rate, feedback, rolikId } = req.body;

            Validator(req.body, FeedbackController.feedbackValidationSchema);
            if(!Types.ObjectId.isValid(rolikId)) throw new httpError.BadRequest('rolik id must be objectId type');
            const rolik = await Rolik.findById(rolikId);
            if(!rolik) throw new httpError.NotFound('Rolik with such id was not found');
            if(await Feedback.isExist(userId, rolikId)) throw new httpError.BadRequest('user left feedback already');
            const {
                _id: feedbackId,
                rate: userRate,
                feedback: userFeedback
            }  = await Feedback.addFeedback(userId, rolikId, rate, feedback);
            await rolik.addFeedback(feedbackId);
            await Rolik.recalculateRating(rolikId);

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

            Validator({ rate, feedback, rolikId: feedbackId }, FeedbackController.editFeedbackValidationSchema);
            if(!Types.ObjectId.isValid(feedbackId)) throw new httpError.BadRequest('feedback id must be objectId type');
            if(rate) queue.rate = rate;
            if(feedback) queue.feedback = feedback;
            const updatedFeedback: any = await Feedback.findByIdAndUpdate(feedbackId, queue, { new: true });
            await Rolik.recalculateRating(updatedFeedback.rolik);

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
            await Rolik.removeFeedback(removed.rolik, feedbackId);

            next('feedback was successfully deleted');
        } catch(err) {
            console.log(err)
            next(err)
        }
    }

}
