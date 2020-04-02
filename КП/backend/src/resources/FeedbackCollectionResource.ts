import BaseCollectionResource from "./BaseCollectionResource";
import FeedbackResource from "./FeedbackResource";

export default class FilmCollectionResource extends BaseCollectionResource {
    protected innerResource = FeedbackResource;

    uncover() {
        return {
            data: this.uncoverItems(),
        ...this.params
        }
    }
}
