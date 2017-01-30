let cache = {};
export default {
    get(key) {
        return cache[key];
    },
    set(key, value) {
        cache[key] = value;
    }
};
