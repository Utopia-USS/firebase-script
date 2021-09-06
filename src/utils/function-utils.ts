export function isCollection(key: string): boolean {
    return key.endsWith("/")
}

export function getPathOrElse(path: string, elseValue: string): string {
    return path.length == 0 ? elseValue : path
}

export function buildFieldPath(path: string, fieldName: string): string {
    return path == fieldName ? path : path + "." + fieldName
}
