import { Mongoose, Schema } from 'mongoose';

export const RolikSchema = new Schema({
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

RolikSchema.static('isExist', async function(rolikId: Schema.Types.ObjectId) {
    return null !== await this.findById(rolikId);
});

RolikSchema.static('getRoliks', async function(params: {
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

RolikSchema.method('addFeedback', async function(feedbackId: Schema.Types.ObjectId) {
    return await this.model('Rolik').findByIdAndUpdate(this._id, { "$push": { feedbacks: feedbackId } }, { new: true })
});

RolikSchema.static('getFeedbacks', async function(rolikId: Schema.Types.ObjectId) {
    return await Promise.all((await this.findById(rolikId)).feedbacks.map(async (feedbackId: any) =>
        await this.model('Feedback').findById(feedbackId)
    ));
});

RolikSchema.static('removeFeedback', async function(rolikId: Schema.Types.ObjectId, feedbackId: Schema.Types.ObjectId) {
    const feedbacks = (await this.findById(rolikId)).feedbacks.filter((feedback: any) => feedback !== feedbackId);
    await this.findByIdAndUpdate(rolikId, { feedbacks }, { new: true });
    return await this.recalculateRating(rolikId);
})

RolikSchema.static('recalculateRating', async function(rolikId: Schema.Types.ObjectId) {
    const rates = (await this.getFeedbacks(rolikId)).map((feedback: any) => feedback.rate);
    const rating = !!rates.length ? rates.reduce((sum: number, current: number) => sum + current, 0) / rates.length : 0;
    return await this.findByIdAndUpdate(rolikId, { rating }, { new: true });
});

export default (mongoose: Mongoose) => mongoose.model('Rolik', RolikSchema)
