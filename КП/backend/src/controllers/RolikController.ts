import Joi from 'joi';
import { dbProcessor } from "../index";
import httpError from 'http-errors';
import { IRolik, IRolikModel } from '../models/Rolik.d';
import Validator from '../util/Validator'
import RolikCollectionResource from "../resources/RolikCollectionResource";
import RolikExtendedResource from "../resources/RolikExtendedResource";
import { Types } from "mongoose";
import RolikResource from "../resources/RolikResource";
import FeedbackResource from "../resources/FeedbackResource";
import FeedbackCollectionResource from "../resources/FeedbackCollectionResource";
import {IUser, IUserModel} from "../models/User.d";
import UserResource from "../resources/UserResource";

const Rolik = dbProcessor.getModel<IRolik, IRolikModel>('Rolik');
const User = dbProcessor.getModel<IUser, IUserModel>('User');


export default class RolikController{

    public static rolikValidationSchema = {
        title: Joi.string(),
        poster: Joi.string(),
        description: Joi.string(),
        genre: Joi.string(),
        year: Joi.number(),
    };

    public static editRolikValidationSchema = {
        title: Joi.string().optional(),
        poster: Joi.string().optional(),
        description: Joi.string().optional(),
        genre: Joi.string().optional(),
        year: Joi.number().optional(),
    };

    public static queryValidationSchema = {
        offset: Joi.number().optional(),
        limit: Joi.number().optional(),
        search_value: Joi.string().optional(),
        order: Joi.string().optional(),
        sort_field: Joi.string().optional(),
        filter: Joi.string().optional(),
        filter_value: Joi.optional()
    };

    public static async getRoliks(req: any, res: any, next: any) {
        try {
            const { offset, limit, search_value, order, sort_field, filter, filter_value } = req.query;

            Validator(req.query, RolikController.queryValidationSchema);
            let roliks: any = await Rolik.getRoliks({
                offset: parseInt(offset, 10),
                limit: parseInt(limit, 10),
                order,
                sort_field,
                filter,
                filter_value
            });
            if(search_value) roliks = roliks.filter((rolik: any) => rolik.title.match(new RegExp(search_value, 'ig')));

            next(new RolikCollectionResource(roliks, { offset, limit, order, sort_field, filter, filter_value, search_value }));
        } catch(err) {
            next(err);
        }
    }

    public static async getRolik(req: any, res: any, next: any) {
        try {
            const { id } = req.params;

            if(!Types.ObjectId.isValid(id)) throw new httpError.BadRequest('sent id is not correct');
            const rolik = await Rolik.findById(id);
            const feedbacks = await Promise.all((await Rolik.getFeedbacks(id) as any).map(async (feedback: any) => ({
                    rate: feedback.rate,
                    feedback: feedback.feedback,
                    id: feedback._id,
                    user: new UserResource(await User.findById(feedback.user)).uncover(),
                })
            ));
            if(!rolik) throw new httpError.NotFound('rolik with such id was not found');

            next({ ...(new RolikResource(rolik).uncover()), feedbacks: new FeedbackCollectionResource(feedbacks).uncover() })
        } catch(err) {
            next(err)
        }
    }

    public static async postRolik(req: any, res: any, next: any) {
        try {
            const { title, poster, description, genre, year } = req.body;

            Validator(req.body, RolikController.rolikValidationSchema);

            await Rolik.create({ title, poster, description, genre, year });
            next({ message: 'Rolik was successfully added!' });
        } catch(err) {
            next(err);
        }
    }

    public static async deleteRolik(req: any, res: any, next: any){
        try {
            const { id } = req.params;

            if(!Types.ObjectId.isValid(id)) throw new httpError.BadRequest('sent id is not correct');
            const rolik = await Rolik.findByIdAndDelete(id);
            if(!rolik) throw new httpError.NotFound('rolik with such id was not found');

            next('rolik was successfully deleted')
        } catch(err) {
            next(err);
        }
    }

    public static async editRolik(req: any, res: any, next: any) {
        try {
            const { id } = req.params;
            const { title, poster, description, genre, year } = req.body;
            const query: any = {};

            Validator(req.body, RolikController.editRolikValidationSchema);
            if(!Types.ObjectId.isValid(id)) throw new httpError.BadRequest('sent id is not correct');
            if(title) query.title = title;
            if(poster) query.poster = poster;
            if(description) query.description = description;
            if(genre) query.genre = genre;
            if(year) query.year = year;
            const rolik = await Rolik.findByIdAndUpdate(id, query, {new: true});
            if(!rolik) throw new httpError.NotFound('rolik with such id was not found');

            next(new RolikResource(rolik))
        } catch(err) {
            next(err);
        }
    }
}
