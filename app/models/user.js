import TBUser from '../teambition/user';

class User {
    constructor(request) {
        this._tbUser = new TBUser(request);
    }
    me() {
        return this._tbUser.me()
            .then(res => {
                let me = res.data;
                return me;
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
