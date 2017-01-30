import Event from 'events';
class EventEmitter {
    constructor() {
        this._event = new Event();
    }
    on(event, listener) {
        this._event.on(event, listener);
    }
    emit(event, value) {
        this._event.emit(event, value);
    }
}
export default EventEmitter;
