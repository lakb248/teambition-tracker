import Model from './model';

class TBSubTask extends Model {
    getOne(taskId) {
        return this._http.request({
            url: '/subtasks?_taskId=' + taskId
        });
    }
    getList() {
        return this._http.request({
            url: '/v2/tasks/me/subtasks'
        });
    }
    addOne(data, unionFlag = '_id') {}
    addList(data, unionFlag = '_id') {}
    updateOne(id, isDone) {
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
