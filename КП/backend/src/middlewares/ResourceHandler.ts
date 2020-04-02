import BaseResource from "../resources/BaseResource";

export default (resource: any, req: any, res: any, next: any) => {
    if(resource instanceof BaseResource) res.status(200).send(resource.uncover());
    else res.status(200).send(resource)
}
