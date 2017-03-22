/* global describe, it, expect */
import {
    isArray,
    arrayToObject,
    getObjectByKeyValue,
    setAvObjectByPlainObject,
    millisecondsToObject,
    getObjectFromAVRes,
    clone,
    patchApply
} from '../../app/utils/util';

// isArray
describe('utils/util.js === isArray', () => {
    it('should return false if input is {}', () => {
        expect(isArray({})).toBe(false);
    });
    it('should return true if input is []', () => {
        expect(isArray([])).toBe(true);
    });
    it('should return false if input is undefined', () => {
        expect(isArray()).toBe(false);
    });
    it('should return false if input is null', () => {
        expect(isArray(null)).toBe(false);
    });
    it('should return false if input is not object', () => {
        expect(isArray(1)).toBe(false);
    });
});

// arrayToObject
describe('utils/util.js === arrayToObject', () => {
    it('should return empty object if input is empty array or undefined', () => {
        expect(arrayToObject([])).toEqual({});
        expect(arrayToObject()).toEqual({});
    });
    it('should return object if input is not empty', () => {
        let array = [{id: 1, name: 'a'}, {id: 2, name: 'b'}];
        let obj = {
            1: {id: 1, name: 'a'},
            2: {id: 2, name: 'b'}
        };
        expect(arrayToObject(array, 'id')).toEqual(obj);
    });
    it('should return object that contain array if input has multiple same key', () => {
        let array = [{id: 1, name: 'a'}, {id: 1, name: 'b'}, {id: 1, name: 'c'}];
        expect(arrayToObject(array, 'id')['1'].length).toBe(3);
    });
    it('should return object that always contain array if alwaysArray is true', () => {
        let array = [{id: 1, name: 'a'}, {id: 2, name: 'b'}];
        expect(arrayToObject(array, 'id', true)['1'].length).toEqual(1);
        expect(arrayToObject(array, 'id', true)['2'].length).toEqual(1);
    });
});

// getObjectByKeyValue
describe('utils/util.js === getObjectByKeyValue', () => {
    it('should return undefined if no item found', () => {
        let array = [{id: 1, name: 'a'}, {id: 1, name: 'b'}, {id: 1, name: 'c'}];
        expect(getObjectByKeyValue(array, 'name', 'd')).toEqual(undefined);
    });
    it('should return correct item if item found', () => {
        let array = [{id: 1, name: 'a'}, {id: 1, name: 'b'}, {id: 1, name: 'c'}];
        expect(getObjectByKeyValue(array, 'name', 'b')).toEqual({id: 1, name: 'b'});
    });
    it('should return multiple items if multiple items found and first is false', () => {
        let array = [{id: 1, name: 'a'}, {id: 1, name: 'b'}, {id: 1, name: 'b'}];
        expect(getObjectByKeyValue(array, 'name', 'b', false)).toEqual([
            {id: 1, name: 'b'},
            {id: 1, name: 'b'}
        ]);
    });
    it('should return the first item if multiple items found and first is true', () => {
        let array = [{id: 1, name: 'a'}, {id: 1, name: 'b'}, {id: 1, name: 'b'}];
        expect(getObjectByKeyValue(array, 'name', 'b', true)).toEqual({id: 1, name: 'b'});
    });
});

// setAvObjectByPlainObject
describe('utils/util.js === setAvObjectByPlainObject', () => {
    it('should set property of avObject to the plainObject', () => {
        let mockAvObject = {
            set: function() {}
        };
        expect(setAvObjectByPlainObject(mockAvObject, {objectId: 1})).toBe(undefined);
        expect(setAvObjectByPlainObject(mockAvObject, {id: 1})).toBe(undefined);
    });
});

// millisecondsToObject
describe('utils/utils.js === millisecondsToObject', () => {
    it('should return correct result', () => {
        expect(millisecondsToObject(1000)).toEqual({
            hours: '00',
            minutes: '00',
            seconds: '01'
        });
        expect(millisecondsToObject(10000)).toEqual({
            hours: '00',
            minutes: '00',
            seconds: 10
        });
        expect(millisecondsToObject(10 * 60000 + 10000)).toEqual({
            hours: '00',
            minutes: 10,
            seconds: 10
        });
        expect(millisecondsToObject(10 * 60 * 60000 + 10 * 60000 + 10000)).toEqual({
            hours: 10,
            minutes: 10,
            seconds: 10
        });
    });
});

// getObjectFromAVRes
describe('utils/util.js === getObjectFromAVRes', () => {
    it('should return correct result', () => {
        expect(getObjectFromAVRes({
            id: '1',
            attributes: {
                name: 'a'
            }
        })).toEqual({
            objectId: '1',
            name: 'a'
        });
        expect(getObjectFromAVRes({id: '1'})).toEqual({objectId: '1'});
    });
});

// clone
describe('utils/util.js === clone', () => {
    it('should return undefined if no input', () => {
        expect(clone()).toBe(undefined);
    });
    it('should return a new array if input is an array', () => {
        let input = [1, 2, 3];
        expect(clone(input)).toEqual(input);
        expect(clone(input)).not.toBe(input);
    });
    it('should return a new object if input is an object', () => {
        let input = {
            a: {
                name: 'a'
            },
            b: 1
        };
        expect(clone(input)).toEqual(input);
        expect(clone(input)).not.toBe(input);
    });
});

// patchApply
describe('utils/util.js === patchApply', () => {
    it('should return null if no input', () => {
        expect(patchApply()).toEqual(null);
    });
    it('should return the origin data if patch is undefined', () => {
        let data = {a: 1};
        expect(patchApply(data)).toBe(data);
    });
    it('should return the data after apply the patch', () => {
        let data = {a: 1};
        let patch = {b: 2};
        expect(patchApply(data, patch)).toEqual({
            a: 1,
            b: 2
        });
    });
});
