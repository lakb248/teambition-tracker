import TBUser from '../teambition/user';
import Cache from '../utils/cache';

class User {
    constructor(request) {
        this._tbUser = new TBUser(request);
    }
    me() {
        if (Cache.get('me')) {
            return Promise.resolve(Cache.get('me'));
        }
        return this._tbUser.me()
            .then(res => {
                let me = res.data;
                let user = {
                    _id: me._id,
                    name: me.name,
                    avatarUrl: me.avatarUrl,
                    snapperToken: me.snapperToken,
                    strikerAuth: me.strikerAuth
                };
                Cache.set('me', user);
                return user;
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
