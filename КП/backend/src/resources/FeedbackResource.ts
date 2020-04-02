import BaseResource from "./BaseResource";

export default class FeedbackResource extends BaseResource{
    public uncover() {
        return {
            user: this.user,
            rate: this.rate,
            feedback: this.feedback,
            id: this.id
        };
    }
}
