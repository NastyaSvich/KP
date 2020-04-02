import BaseResource from "./BaseResource";

export default class UserResource extends BaseResource{
    public uncover() {
        return {
            login: this.login,
            photoUrl: this.photoUrl,
            isAdmin: this.isAdmin,
            id: this._id
        };
    }
}
