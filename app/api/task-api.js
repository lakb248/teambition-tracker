import TaskModel from '../models/task-model';
import TaskFetch from '../fetch/task-fetch';
import Logger from '../utils/logger';

let logger = new Logger('[api/task-api]');

class TaskAPI {
    getOne(id) {
        logger.log(`try to get task ${id} from cache`);
        let cache = TaskModel.getOne(id);
        if (cache) {
            return cache;
        }
        logger.log(`try to get task ${id} from server`);
        return TaskFetch.getOne(id).concatMap(task => TaskModel.addOne(task));
    }
    getList() {
        logger.log('try to get task list from cache');
        let cache = TaskModel.getList();
        if (cache) {
            return cache;
        }
        logger.log('try to get task list from server');
        return TaskFetch.getList().concatMap(taskList => TaskModel.addList(taskList));
    }
    addOne(data) {}
    addList(data) {}
    updateOne(id, patch) {
        return TaskFetch.updateOne(id, patch)
            .concatMap(task => TaskModel.updateOne(id, task));
    }
}

export default new TaskAPI();
