let isArray = obj => {
    if (typeof obj === 'object') {
        var toStr = Object.prototype.toString;
        if (toStr.apply(obj).toLowerCase() === '[object array]') {
            return true;
        }
        return false;
    }
    return false;
};
let arrayToObject = (array, key, alwaysArray = false) => {
    array = array || [];
    let obj = {};
    array.forEach(item => {
        let objKey = item[key];
        if (obj[objKey]) {
            // objKey is exist
            if (isArray(obj[objKey])) {
                // obj[objKey] is array
                obj[objKey].push(item);
            } else {
                let temp = obj[objKey];
                obj[objKey] = [];
                obj[objKey].push(temp);
                obj[objKey].push(item);
            }
        } else if (alwaysArray) {
            obj[objKey] = [];
            obj[objKey].push(item);
        } else {
            obj[objKey] = item;
        }
    });
    return obj;
};
let getObjectByKeyValue = (list, key, value, first = true) => {
    list = list || [];
    let result = [];
    for (let i = 0, l = list.length; i < l; i++) {
        let temp = list[i];
        if (temp[key] && temp[key] === value) {
            result.push(temp);
            if (first) {
                break;
            }
        }
    }
    if (first) {
        return result[0];
    }
    return result;
};
let setAvObjectByPlainObject = (avObject, plainObject) => {
    for (let key in plainObject) {
        if (plainObject.hasOwnProperty(key) && key !== 'objectId') {
            avObject.set(key, plainObject[key]);
        }
    }
};
export {
    isArray,
    arrayToObject,
    getObjectByKeyValue,
    setAvObjectByPlainObject
};
