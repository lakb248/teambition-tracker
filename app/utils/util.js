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
let millisecondsToObject = milliseconds => {
    milliseconds = milliseconds || 0;
    let totalSeconds = Math.floor(milliseconds / 1000);
    let seconds = totalSeconds % 60;
    totalSeconds = Math.floor(totalSeconds / 60);
    let minutes = totalSeconds % 60;
    totalSeconds = Math.floor(totalSeconds / 60);
    let hours = totalSeconds;
    return {
        hours: (hours >= 10 ? hours : ('0' + hours)),
        minutes: (minutes >= 10 ? minutes : ('0' + minutes)),
        seconds: (seconds >= 10 ? seconds : ('0' + seconds))
    };
};
let getObjectFromAVRes = (avRes, base = {}) => {
    let attributes = avRes.attributes;
    for (var key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            base[key] = attributes[key];
        }
    }
    base.objectId = avRes.id;
    return base;
};
let clone = (base, deep = true) => {
    if (!base) {
        return;
    }
    let result = {};
    if (isArray(base)) {
        result = [];
    }
    for (let key in base) {
        if (base.hasOwnProperty(key)) {
            if (typeof base[key] === 'object') {
                result[key] = clone(base[key]);
            } else {
                result[key] = base[key];
            }
        }
    }
    return result;
};
let patchApply = (data, patch) => {
    if (!data || typeof data !== 'object') {
        return null;
    }
    if (!patch || typeof patch !== 'object') {
        return data;
    }
    Object.keys(patch).forEach(key => {
        data[key] = patch[key];
    });
    return data;
};
export {
    isArray,
    arrayToObject,
    getObjectByKeyValue,
    setAvObjectByPlainObject,
    millisecondsToObject,
    getObjectFromAVRes,
    clone,
    patchApply
};
