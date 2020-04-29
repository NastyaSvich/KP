import { Document, Model, Schema } from 'mongoose'

export interface IRolikDocument extends Document {
    title: string,
    poster: string,
    description: string,
    rating: number,
    genre: string,
    year: number,
    feedbacks: [string]
}

export interface IRolik extends IRolikDocument {
    addFeedback(feedbackId: Schema.Types.ObjectId): Promise<IRolik>
}

export interface IRolikModel extends Model<IRolik> {
    recalculateRating(rolikId: Schema.Types.ObjectId): Promise<IRolik>
    removeFeedback(rolikId: Schema.Types.ObjectId, feedbackId: Schema.Types.ObjectId): Promise<IRolik>
    getFeedbacks(rolikId: Schema.Types.ObjectId): Promise<IRolik>
    getRoliks(params: {
        offset?: number,
        limit?: number,
        order?: 'asc' | 'desc',
        sort_field?: string,
        filter?: string,
        filter_value?: any
    }): Promise<IRolik>;
    isExist(rolikId: Schema.Types.ObjectId): Promise<boolean>
}
