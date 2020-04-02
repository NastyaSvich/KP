import BaseResource from "./BaseResource";

export default class BaseCollectionResource extends BaseResource {

    protected innerResource = BaseResource;

    uncover() {
        return {
            data: this.uncoverItems()
        }
    }

    uncoverItems(){
        return this.data.map((item: any) => new this.innerResource(item).uncover())
    }
}
