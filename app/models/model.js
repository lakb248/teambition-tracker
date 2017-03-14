import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {clone, patchApply} from '../utils/util';

class Model {
    constructor(data, isComplete, parents) {
        this.data = data;
        this.parents = parents;
        this.isComplete = isComplete;
        this._subject = new BehaviorSubject(clone(this.data));
    }
    get() {
        if (!this._subject.observers.length) {
            this._subject.next(clone(this.data));
        }
        return this._subject;
    }
    update(patch) {
        return Observable.create(observer => {
            this.data = patchApply(this.data, patch);
            observer.next(this.data);
            this._notify(this.data);
        });
    }
    _notify(data) {
        this._subject.next(clone(data));
    }
}
export default Model;
