import UserAPI from '../api/user-api';

class UserService {
    me() {
        return UserAPI.me();
    }
    members() {
        return UserAPI.getMembers();
    }
}
export default new UserService();
