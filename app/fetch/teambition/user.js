import Fetch from '../fetch';

class TBUser {
    me() {
        return Fetch.get('/users/me');
    }
    members() {
        return Fetch.get('/members/me');
    }
}
export default new TBUser();
