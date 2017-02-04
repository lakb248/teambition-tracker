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
    update(id, isDone) {
        return this._http.request({
            url: `/subtasks/${id}/isDone`,
            data: {
                isDone: Boolean(isDone)
            },
            method: 'PUT'
        });
    }
}

export default TBSubTask;
