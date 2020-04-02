import BaseResource from "./BaseResource";

export default class FilmResource extends BaseResource{
    uncover() {
        return {
            title: this.title,
            poster: this.poster,
            description: this.description,
            rating: this.rating,
            genre: this.genre,
            year: this.year,
            id: this._id
        }
    }
}
