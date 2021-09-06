"use strict";
exports.__esModule = true;
exports.isValueObjectArray = exports.isValueArray = exports.isValueObject = exports.isCollection = exports.objectToMap = void 0;
var arrayConstructor = [{}].constructor;
var objectConstructor = ({}).constructor;
function objectToMap(o) {
    var m = new Map();
    for (var _i = 0, _a = Object.keys(o); _i < _a.length; _i++) {
        var k = _a[_i];
        if (o[k] instanceof Object) {
            m.set(k, objectToMap(o[k]));
        }
        else {
            m.set(k, o[k]);
        }
    }
    return m;
}
exports.objectToMap = objectToMap;
function isCollection(key) {
    return key.endsWith("/");
}
exports.isCollection = isCollection;
function isValueObject(value) {
    return value.constructor === objectConstructor;
}
exports.isValueObject = isValueObject;
function isValueArray(value) {
    return value.constructor === arrayConstructor;
}
exports.isValueArray = isValueArray;
function isValueObjectArray(value) {
    return isValueArray(value) && Array(value).filter(function (it) { return isValueObject(it); }).length == Array(value).length;
}
exports.isValueObjectArray = isValueObjectArray;
