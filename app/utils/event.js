import Event from 'events';
let eventEmitter = new Event();
export default {
    on(event, listener) {
        eventEmitter.on(event, listener);
    },
    emit(event, value) {
        eventEmitter.emit(event, value);
    }
};
