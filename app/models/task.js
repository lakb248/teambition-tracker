class Task {
    constructor(id, leancloudId, content, subtasks, dueDate,
        created, subtaskCount, priority, involveMembers, status, lastStartTime) {
        this._id = id;
        this._leancloudId = leancloudId;
        this._content = content;
        this._subtasks = subtasks;
        this._dueDate = dueDate;
        this._created = created;
        this._subtaskCount = subtaskCount;
        this._priority = priority;
        this._involveMember = involveMembers;
        this._status = status;
        this._lastStartTime = lastStartTime;
    }

}

export default Task;
