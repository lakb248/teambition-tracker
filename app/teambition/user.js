import Model from './model';
class TBUser extends Model {
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
export default TBUser;
