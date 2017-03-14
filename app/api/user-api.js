import UserModel from '../models/user-model';
import UserFetch from '../fetch/user-fetch';
import Logger from '../utils/logger';

let logger = new Logger('[api/user-api]');

class UserAPI {
    me() {
        logger.log('try to get me from cache');
        let cache = UserModel.me();
        if (cache) {
            return cache.get();
        }
        logger.log('try to get me from teambition');
        return UserFetch.me().concatMap(me => UserModel.addMe(me));
    }
    members() {
        logger.log('try to get members from cache');
        let cache = UserModel.members();
        if (cache) {
            return cache.get();
        }
        logger.log('try to get members from teambition');
        return UserFetch.members().concatMap(members => UserModel.addMembers(members));
    }
}

export default new UserAPI();
