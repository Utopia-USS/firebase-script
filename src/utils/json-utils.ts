const arrayConstructor = [{}].constructor;
const objectConstructor = ({}).constructor;

export function objectToMap(o: any) {
    let m = new Map()
    for(let k of Object.keys(o)) {
        if(o[k] instanceof Object) {
            m.set(k, objectToMap(o[k]))
        }
        else {
            m.set(k, o[k])
        }
    }
    return m
}

export function isCollection(key: string): boolean {
    return key.endsWith("/")
}

export function isValueObject(value: any): boolean {
    return value.constructor === objectConstructor
}

export function isValueArray(value: any): boolean {
    return value.constructor === arrayConstructor
}

export function isValueObjectArray(value: any): boolean {
    return isValueArray(value) && Array(value).filter(it => isValueObject(it)).length == Array(value).length
}
