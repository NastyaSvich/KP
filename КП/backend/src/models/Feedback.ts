import { Mongoose, Schema } from 'mongoose';

export const FeedbackSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    film: {
        type: Schema.Types.ObjectId,
        ref: 'Film'
    },
    rate: Number,
    feedback: String
});

FeedbackSchema.static('isExist', async function(userId: Schema.Types.ObjectId, filmId: Schema.Types.ObjectId){
    return null !== await this.findOne({ user: userId, film: filmId });
});

FeedbackSchema.static('addFeedback', async function(userId: Schema.Types.ObjectId, filmId: Schema.Types.ObjectId, rate: number, feedback: string){
    return await this.create({ user: userId, film: filmId, rate, feedback })
});

export default (mongoose: Mongoose) => mongoose.model('Feedback', FeedbackSchema)
