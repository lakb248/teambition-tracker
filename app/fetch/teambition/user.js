import Fetch from '../fetch';
import Logger from '../../utils/logger';

let logger = new Logger('[fetch/teambition/user]');

class TBUser {
    me() {
        logger.log('get me from teambition');
        return Fetch.get('/users/me');
    }
    members() {
        logger.log('get members from teambition');
        return Fetch.get('/members/me');
    }
}
export default new TBUser();
