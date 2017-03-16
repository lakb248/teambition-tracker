import TBSubtask from './teambition/subtask';
import Logger from '../utils/logger';

let logger = new Logger('[fetch/subtask-fetch]');

class SubtaskFetch {
    getList() {
        logger.log('get subtask list from server');
        return TBSubtask.getList();
    }
    getOne(id) {
        logger.log(`get subtask ${id} from server`);
        return TBSubtask.getOne(id);
    }
    updateStatus(id, status) {
        logger.log(`update status of subtask ${id} to ${status} in server`);
        return TBSubtask.updateStatus(id, status);
    }
}

export default new SubtaskFetch();
