import UserModel from '../models/user-model';
import UserFetch from '../fetch/user-fetch';
import Logger from '../utils/logger';

let logger = new Logger('[api/user-api]');

class UserAPI {
    me() {
        logger.log('try to get me from cache');
        let cache = UserModel.me();
        if (cache) {
            return cache;
        }
        logger.log('try to get me from server');
        return UserFetch.me().concatMap(me => UserModel.addMe(me));
    }
    getMembers() {
        logger.log('try to get members from cache');
        let cache = UserModel.getMembers();
        if (cache) {
            return cache;
        }
        logger.log('try to get members from server');
        return UserFetch.getMembers().concatMap(members => UserModel.addMembers(members));
    }
}

export default new UserAPI();
