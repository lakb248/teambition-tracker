import SubtaskFetch from '../fetch/subtask-fetch';
import SubtaskModel from '../models/subtask-model';

import Logger from '../utils/logger';
let logger = new Logger('[api/subtask-api]');

class SubtaskAPI {
    getOne(id) {
        logger.log(`try to get subtask ${id} from cache`);
        let cache = SubtaskModel.getOne(id);
        if (cache) {
            return cache;
        }
        logger.log(`try to get subtask ${id} from server`);
        return SubtaskFetch.getOne(id).concatMap(subtask => SubtaskModel.addOne(subtask));
    }
    getList() {
        logger.log('try to get subtask list from cache');
        let cache = SubtaskModel.getList();
        if (cache) {
            return cache;
        }
        logger.log('try to get subtask list from server');
        return SubtaskFetch.getList().concatMap(list => SubtaskModel.addList(list));
    }
    updateStatus(id, status) {
        logger.log(`try to update status of subtask ${id} to ${status}`);
        return SubtaskFetch.updateStatus(id, status)
            .concatMap(subtask => SubtaskModel.updateOne(id, subtask));
    }
}

export default new SubtaskAPI();
