export default {
    isArray(obj) {
        if (typeof obj === 'object') {
            var toStr = Object.prototype.toString;
            if (toStr.apply(obj).toLowerCase() === '[object array]') {
                return true;
            }
            return false;
        }
        return false;
    },
    arrayToObject(array, key) {
        array = array || [];
        let obj = {};
        array.forEach(item => {
            let objKey = item[key];
            if (obj[objKey]) {
                // objKey is exist
                if (this.isArray(obj[objKey])) {
                    // obj[objKey] is array
                    obj[objKey].push(item);
                } else {
                    let temp = obj[objKey];
                    obj[objKey] = [];
                    obj[objKey].push(temp);
                    obj[objKey].push(item);
                }
            } else {
                obj[objKey] = item;
            }
        });
        return obj;
    }
};
