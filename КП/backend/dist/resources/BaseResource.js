"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseResource {
    constructor(data, params) {
        this.data = data;
        this.params = params;
        return new Proxy(this, {
            get(target, prop) {
                if (prop in target.data)
                    return target.data[prop];
                return target[prop];
            }
        });
    }
    uncover() {
        return this.data;
    }
}
exports.default = BaseResource;
//# sourceMappingURL=BaseResource.js.map