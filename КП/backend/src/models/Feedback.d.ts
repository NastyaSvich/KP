import { Document, Model, Schema } from 'mongoose'

export interface IFeedbackDocument extends Document {
    user: string,
    rate: number,
    feedback: string
}

export interface IFeedback extends IFeedbackDocument {

}

export interface IFeedbackModel extends Model<IFeedback> {
    addFeedback(userId: Schema.Types.ObjectId, rolikId: Schema.Types.ObjectId, rate: number, feedback: string): Promise<IFeedback>
    isExist(userId: Schema.Types.ObjectId, rolikId: Schema.Types.ObjectId): Promise<boolean>
}
