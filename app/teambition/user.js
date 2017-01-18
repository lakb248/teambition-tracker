import Model from './model';
class User extends Model {
    me() {
        return this._http.request({
            url: '/users/me'
        });
    }
    member() {
        return this._http.request({
            url: '/members/me'
        });
    }
}
export default User;
