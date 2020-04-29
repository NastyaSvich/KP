import BaseResource from "./BaseResource";

export default class RolikResource extends BaseResource{
    uncover() {
        return {
            title: this.title,
            poster: this.poster,
            description: this.description,
            rating: this.rating,
            genre: this.genre,
            year: this.year,
            feedbacks: this.feedbacks,
            id: this._id
        }
    }
}
