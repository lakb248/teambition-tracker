import Model from './model';
import Cache from '../utils/cache';
import Logger from '../utils/logger';
import 'rxjs/add/operator/concatMap';

let logger = new Logger('[models/user-model]');

class UserModel {
    me() {
        let me = Cache.get('me');
        if (me) {
            logger.log('get me from cache');
            return me.get();
        }
        return null;
    }
    members() {
        let members = Cache.get('members');
        if (members) {
            logger.log('get members from cache');
            return members.get();
        }
    }
    addMe(data) {
        logger.log('add me to cache');
        let me = Cache.get('me');
        if (me) {
            return me.update(data).concatMap(() => me.get());
        }
        me = new Model(data, true);
        Cache.set('me', me);
        return me.get();
    }
    addMembers(data) {
        logger.log('add members to cache');
        let members = new Model(data, true);
        Cache.set('members', members);
        return members.get();
    }
}

export default new UserModel();
