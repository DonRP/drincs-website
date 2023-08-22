export function isNullOrEmpty(value: any) {
    return (!value || value.toString() === "")
}

export function isObject(obj: any) {
    var type = typeof obj;
    return (type === 'object' && !!obj);
}

export function isBoolean(obj: any) {
    return typeof obj == "boolean";
}