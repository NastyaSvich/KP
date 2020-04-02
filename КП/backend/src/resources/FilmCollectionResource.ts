import BaseCollectionResource from "./BaseCollectionResource";
import FilmResource from "./FilmResource";

export default class FilmCollectionResource extends BaseCollectionResource {
    protected innerResource = FilmResource;

    uncover() {
        return {
            data: this.uncoverItems(),
            ...this.params
        }
    }
}
