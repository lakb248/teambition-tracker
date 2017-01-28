import AV from './leancloud';

class AVActivity extends AV.Object {
    constructor() {
        super();
        this._query = new AV.Query('AVActivity');
    }
    all() {
        return this._query.find()
            .then(res => {});
    }
    create(activity) {
        let newActivity = {};
        newActivity.start = activity.start;
        newActivity.end = activity.end;
        newActivity.taskId = activity.taskId;
        newActivity.location = activity.location;
        return this.save(newActivity);
    }
    update(activity) {
        let newActivity = AV.Object.createWithoutData('AVActivity', activity.id);
        newActivity.set('start', activity.start);
        newActivity.set('end', activity.end);
        newActivity.set('taskId', activity.taskId);
        newActivity.set('location', activity.location);
        return newActivity.save();
    }
}

AV.Object.register(AVActivity);

export default AVActivity;
