import Joi from 'joi';
import { dbProcessor } from "../index";
import httpError from 'http-errors';
import { IFilm, IFilmModel } from '../models/Film.d';
import Validator from '../util/Validator'
import FilmCollectionResource from "../resources/FilmCollectionResource";
import FilmExtendedResource from "../resources/FilmExtendedResource";
import { Types } from "mongoose";
import FilmResource from "../resources/FilmResource";
import FeedbackResource from "../resources/FeedbackResource";
import FeedbackCollectionResource from "../resources/FeedbackCollectionResource";
import {IUser, IUserModel} from "../models/User.d";
import UserResource from "../resources/UserResource";

const Film = dbProcessor.getModel<IFilm, IFilmModel>('Film');
const User = dbProcessor.getModel<IUser, IUserModel>('User');


export default class FilmController{

    public static filmValidationSchema = {
        title: Joi.string(),
        poster: Joi.string(),
        description: Joi.string(),
        genre: Joi.string(),
        year: Joi.number(),
    };

    public static editFilmValidationSchema = {
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

    public static async getFilms(req: any, res: any, next: any) {
        try {
            const { offset, limit, search_value, order, sort_field, filter, filter_value } = req.query;

            Validator(req.query, FilmController.queryValidationSchema);
            let films: any = await Film.getFilms({
                offset: parseInt(offset, 10),
                limit: parseInt(limit, 10),
                order,
                sort_field,
                filter,
                filter_value
            });
            if(search_value) films = films.filter((film: any) => film.title.match(new RegExp(search_value, 'ig')));

            next(new FilmCollectionResource(films, { offset, limit, order, sort_field, filter, filter_value, search_value }));
        } catch(err) {
            next(err);
        }
    }

    public static async getFilm(req: any, res: any, next: any) {
        try {
            const { id } = req.params;

            if(!Types.ObjectId.isValid(id)) throw new httpError.BadRequest('sent id is not correct');
            const film = await Film.findById(id);
            const feedbacks = await Promise.all((await Film.getFeedbacks(id) as any).map(async (feedback: any) => ({
                    rate: feedback.rate,
                    feedback: feedback.feedback,
                    id: feedback._id,
                    user: new UserResource(await User.findById(feedback.user)).uncover(),
                })
            ));
            if(!film) throw new httpError.NotFound('film with such id was not found');

            next({ ...(new FilmResource(film).uncover()), feedbacks: new FeedbackCollectionResource(feedbacks).uncover() })
        } catch(err) {
            next(err)
        }
    }

    public static async postFilm(req: any, res: any, next: any) {
        try {
            const { title, poster, description, genre, year } = req.body;

            Validator(req.body, FilmController.filmValidationSchema);

            await Film.create({ title, poster, description, genre, year });
            next({ message: 'Film was successfully added!' });
        } catch(err) {
            next(err);
        }
    }

    public static async deleteFilm(req: any, res: any, next: any){
        try {
            const { id } = req.params;

            if(!Types.ObjectId.isValid(id)) throw new httpError.BadRequest('sent id is not correct');
            const film = await Film.findByIdAndDelete(id);
            if(!film) throw new httpError.NotFound('film with such id was not found');

            next('film was successfully deleted')
        } catch(err) {
            next(err);
        }
    }

    public static async editFilm(req: any, res: any, next: any) {
        try {
            const { id } = req.params;
            const { title, poster, description, genre, year } = req.body;
            const query: any = {};

            Validator(req.body, FilmController.editFilmValidationSchema);
            if(!Types.ObjectId.isValid(id)) throw new httpError.BadRequest('sent id is not correct');
            if(title) query.title = title;
            if(poster) query.poster = poster;
            if(description) query.description = description;
            if(genre) query.genre = genre;
            if(year) query.year = year;
            const film = await Film.findByIdAndUpdate(id, query, {new: true});
            if(!film) throw new httpError.NotFound('film with such id was not found');

            next(new FilmResource(film))
        } catch(err) {
            next(err);
        }
    }
}
