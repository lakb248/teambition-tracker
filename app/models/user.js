import Model from './model';
class User extends Model {
    me() {
        return this._http.request({
            url: '/users/me'
        });
    }
}
export default User;
