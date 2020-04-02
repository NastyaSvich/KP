export default class BaseResource {
    [key: string]: any
    protected data: any;
    protected params: any;

    constructor(data: any, params?: any) {
        this.data = data;
        this.params = params;
        return new Proxy(this, {
            get(target: any, prop: string) {
                if (prop in target.data) return target.data[prop];
                return target[prop];
            }
        })
    }

    public uncover() {
        return this.data
    }
}
