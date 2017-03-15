import Fetch from '../fetch';
import Logger from '../../utils/logger';

let logger = new Logger('[fetch/teambition/task]');

class TBTask {
    getList() {
        logger.log('get task list from teambition');
        return Fetch.get('/v2/tasks/me');
    }
    getOne(id) {
        logger.log(`get task ${id} from teabmition`);
        return Fetch.get(`/tasks/${id}`);
    }
    addOne(data, unionFlag = '_id') {}
    addList(data, unionFlag = '_id') {}
    updateOne(id, patch) {}
}

export default new TBTask();
