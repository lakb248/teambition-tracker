import AV from './leancloud';
class AVTask extends AV.Object {
    constructor() {
        super();
        this._query = new AV.Query('AVTask');
    }
    all() {
        return this._query.find();
    }
}

AV.Object.register(AVTask);

export default AVTask;
