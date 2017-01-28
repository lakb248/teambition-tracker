class Activity {
    constructor(id, start, end, taskId, userId, location) {
        this._id = id;
        this._start = start;
        this._end = end;
        this._taskId = taskId;
        this._location = location;
        this._userId = userId;
    }
}

export default Activity;
