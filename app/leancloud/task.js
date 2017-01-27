import AV from './leancloud';
class AVTask extends AV.Object {
    constructor() {
        super();
        this._query = new AV.Query('AVTask');
    }
    all() {
        return this._query.find()
            .then(res => {
                if (res.length !== 0) {
                    res = res.map(task => {
                        let newTask = {};
                        newTask.id = task.id;
                        newTask.status = task.attributes.status;
                        newTask.taskId = task.attributes.taskId;
                        newTask.lastStartTime = task.attributes.lastStartTime;
                        return newTask;
                    });
                    return res;
                }
                return res;
            });
    }
    update(task) {
        let newTask = AV.Object.createWithoutData('AVTask', task.leancloudId);
        newTask.set('status', task.status);
        newTask.set('lastStartTime', task.lastStartTime);
        return newTask.save();
    }
    create(task) {
        let newTask = {};
        newTask.taskId = task._id;
        newTask.status = task.status;
        newTask.lastStartTime = task.lastStartTime;
        return this.save(newTask);
    }
}

AV.Object.register(AVTask);

export default AVTask;
