import { Mongoose, Schema } from 'mongoose';

export const FilmSchema = new Schema({
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

FilmSchema.static('isExist', async function(filmId: Schema.Types.ObjectId) {
    return null !== await this.findById(filmId);
});

FilmSchema.static('getFilms', async function(params: {
    offset?: number,
    limit?: number,
    order?: 'asc' | 'desc',
    sort_field?: any,
    filter?: any,
    filter_value?: any
}) {
    let { offset, limit, order, sort_field, filter, filter_value } = params;
    return await this.find({[filter]: filter_value}).sort({ [sort_field]: order }).skip(offset).limit(limit)
});

FilmSchema.method('addFeedback', async function(feedbackId: Schema.Types.ObjectId) {
    return await this.model('Film').findByIdAndUpdate(this._id, { "$push": { feedbacks: feedbackId } }, { new: true })
});

FilmSchema.static('getFeedbacks', async function(filmId: Schema.Types.ObjectId) {
    return await Promise.all((await this.findById(filmId)).feedbacks.map(async (feedbackId: any) =>
        await this.model('Feedback').findById(feedbackId)
    ));
});

FilmSchema.static('removeFeedback', async function(filmId: Schema.Types.ObjectId, feedbackId: Schema.Types.ObjectId) {
    const feedbacks = (await this.findById(filmId)).feedbacks.filter((feedback: any) => feedback !== feedbackId);
    await this.findByIdAndUpdate(filmId, { feedbacks }, { new: true });
    return await this.recalculateRating(filmId);
})

FilmSchema.static('recalculateRating', async function(filmId: Schema.Types.ObjectId) {
    const rates = (await this.getFeedbacks(filmId)).map((feedback: any) => feedback.rate);
    const rating = !!rates.length ? rates.reduce((sum: number, current: number) => sum + current, 0) / rates.length : 0;
    return await this.findByIdAndUpdate(filmId, { rating }, { new: true });
});

export default (mongoose: Mongoose) => mongoose.model('Film', FilmSchema)
