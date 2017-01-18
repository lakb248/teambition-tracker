export default {
    arrayToObject(array, key) {
        array = array || [];
        let obj = {};
        array.forEach(item => {
            obj[item[key]] = item;
        });
        return obj;
    }
};
