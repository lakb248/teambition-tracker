import Model from './model';
class User extends Model {
    me() {
        return this._http.request({
            url: '/users/me'
        });
    }
    members() {
        return this._http.request({
            url: '/members/me'
        });
    }
}
export default User;
