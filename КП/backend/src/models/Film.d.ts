import { Document, Model, Schema } from 'mongoose'

export interface IFilmDocument extends Document {
    title: string,
    poster: string,
    description: string,
    rating: number,
    genre: string,
    year: number,
    feedbacks: [string]
}

export interface IFilm extends IFilmDocument {
    addFeedback(feedbackId: Schema.Types.ObjectId): Promise<IFilm>
}

export interface IFilmModel extends Model<IFilm> {
    recalculateRating(filmId: Schema.Types.ObjectId): Promise<IFilm>
    removeFeedback(filmId: Schema.Types.ObjectId, feedbackId: Schema.Types.ObjectId): Promise<IFilm>
    getFeedbacks(filmId: Schema.Types.ObjectId): Promise<IFilm>
    getFilms(params: {
        offset?: number,
        limit?: number,
        order?: 'asc' | 'desc',
        sort_field?: string,
        filter?: string,
        filter_value?: any
    }): Promise<IFilm>;
    isExist(filmId: Schema.Types.ObjectId): Promise<boolean>
}
