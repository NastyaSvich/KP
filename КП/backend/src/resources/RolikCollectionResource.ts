import BaseCollectionResource from "./BaseCollectionResource";
import RolikResource from "./RolikResource";

export default class RolikCollectionResource extends BaseCollectionResource {
    protected innerResource = RolikResource;

    uncover() {
        return {
            data: this.uncoverItems(),
            ...this.params
        }
    }
}
