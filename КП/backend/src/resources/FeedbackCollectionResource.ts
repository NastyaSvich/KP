import BaseCollectionResource from "./BaseCollectionResource";
import FeedbackResource from "./FeedbackResource";

export default class RolikCollectionResource extends BaseCollectionResource {
    protected innerResource = FeedbackResource;

    uncover() {
        return {
            data: this.uncoverItems(),
        ...this.params
        }
    }
}
