import TBUser from './teambition/user';
import Logger from '../utils/logger';

let logger = new Logger('[fetch/user-fetch]');

class UserFetch {
    me() {
        logger.log('get me from server');
        return TBUser.me();
    }
    getMembers() {
        logger.log('get members from server');
        return TBUser.members();
    }
}

export default new UserFetch();
