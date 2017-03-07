import {clone} from './util';
let cache = {};
export default {
    get(key) {
        return clone(cache[key]);
    },
    set(key, value) {
        cache[key] = value;
    }
};
