import { Mongoose, Schema } from 'mongoose';

export const FeedbackSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rolik: {
        type: Schema.Types.ObjectId,
        ref: 'Rolik'
    },
    rate: Number,
    feedback: String
});

FeedbackSchema.static('isExist', async function(userId: Schema.Types.ObjectId, rolikId: Schema.Types.ObjectId){
    return null !== await this.findOne({ user: userId, rolik: rolikId });
});

FeedbackSchema.static('addFeedback', async function(userId: Schema.Types.ObjectId, rolikId: Schema.Types.ObjectId, rate: number, feedback: string){
    return await this.create({ user: userId, rolik: rolikId, rate, feedback })
});

export default (mongoose: Mongoose) => mongoose.model('Feedback', FeedbackSchema)
