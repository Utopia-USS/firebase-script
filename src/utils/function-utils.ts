import { readFileSync, writeFileSync } from 'fs';

export function isCollection(key: string): boolean {
    return key.endsWith("/")
}

export function getPathOrElse(path: string, elseValue: string): string {
    return path.length == 0 ? elseValue : path
}

export function buildFieldPath(path: string, fieldName: string): string {
    return path == fieldName ? path : path + "." + fieldName
}

export function readFile(path: string): any {
    return JSON.parse(readFileSync(path, 'utf8'))
}

export function writeFile(path: string, data: Object) {
    writeFileSync(path, JSON.stringify(data))
}
