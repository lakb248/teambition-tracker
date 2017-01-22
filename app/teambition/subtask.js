import Model from './model';

class TBSubTask extends Model {
    getByTaskId(taskId) {
        return this._http.request({
            url: '/subtasks?_taskId=' + taskId
        });
    }
    me() {
        return this._http.request({
            url: '/v2/tasks/me/subtasks'
        });
    }
}

export default TBSubTask;
