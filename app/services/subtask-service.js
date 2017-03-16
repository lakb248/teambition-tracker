import SubtaskAPI from '../api/subtask-api';
import Logger from '../utils/logger';
let logger = new Logger('[service/subtask]');

class SubTaskService {
    getOne(id) {
        logger.log(`get subtask ${id}`);
        return SubtaskAPI.getOne(id);
    }
    getList() {
        logger.log('get subtask list');
        return SubtaskAPI.getList();
    }
    updateStatus(id, status) {
        logger.log(`update status of subtask ${id} to ${status}`);
        return SubtaskAPI.updateStatus(id, status);
    }
}

export default new SubTaskService();
