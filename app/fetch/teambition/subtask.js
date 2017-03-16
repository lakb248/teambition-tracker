import Fetch from '../fetch';
import Logger from '../../utils/logger';
let logger = new Logger('[fetch/teambition/subtask]');

class TBSubTask {
    getOne(id) {
        logger.log(`get subtask ${id} from teambition`);
        return Fetch.get(`/subtasks/${id}`);
    }
    getList() {
        logger.log('get subtask list from teambition');
        return Fetch.get('/v2/tasks/me/subtasks');
    }
    updateStatus(id, status) {
        logger.log(`update status of subtask ${id} to ${status} in teambition`);
        return Fetch.put(`/subtasks/${id}/isDone`, {isDone: Boolean(status)});
    }
}

export default new TBSubTask();
