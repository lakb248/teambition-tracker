import TBUser from '../teambition/user';

class User {
    constructor(request) {
        this._tbUser = new TBUser(request);
    }
    me() {
        return this._tbUser.me()
            .then(res => {
                let me = res.data;
                return {
                    _id: me._id,
                    name: me.name,
                    avatarUrl: me.avatarUrl,
                    snapperToken: me.snapperToken,
                    strikerAuth: me.strikerAuth
                };
            });
    }
    members() {
        return this._tbUser().members()
            .then(res => {
                return res.data;
            });
    }
}
export default User;
