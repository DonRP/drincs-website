export function handleInputChangeByFieldName(fieldName: string, newVal: any, hook: any, setHook: any, clearFields: string[] = []) {
    let newHook = {
        ...hook,
        [fieldName]: newVal,
    }
    clearFields.forEach(field => {
        newHook[field] = null;
    })

    setHook(newHook);
}

export function handleResetValue(fieldName: string, hook: any, setHook: React.Dispatch<React.SetStateAction<any>>, clearFields: string[] = []) {
    return handleInputChangeByFieldName(fieldName, null, hook, setHook, clearFields)
}

export type IOnChangeGeneric<T> = (fieldName: string, value: T | null) => void

/**
 * return an object with a certain lookupOidProperty from lookup
 * @param lookup 
 * @param fieldName 
 * @param value 
 * @returns 
 */
export function findItemFromLookupByProperty<T>(lookup: T[] | readonly T[], fieldName: string, value: any): T | null | undefined {
    if (value === null) {
        return null;
    }
    if (lookup === null) {
        console.error("findItemFromLookupByProperty lookup is null. idFieldName:" + fieldName)
        return null;
    }
    if (!Array.isArray(lookup)) {
        console.error("findItemFromLookupByProperty lookup not is array")
        return null;
    }
    if (lookup.length > 0 && !lookup[0]?.hasOwnProperty(fieldName)) {
        console.error("findItemFromLookupByProperty lookup not have a property:" + fieldName)
        return null;
    }

    var o = lookup ? lookup.find((item: any) => { return item[fieldName] === value }) : null;
    return o;
}

/**
 * return an object with a certain lookupOidProperty from lookup
 * The difference with findItemFromLookupByProperty is that it compares the values as strings
 * @param lookup 
 * @param fieldName 
 * @param value 
 * @returns 
 */
export function findSimilarItemFromLookupByProperty<T>(lookup: T[] | readonly T[], fieldName: string, value: any): T | null | undefined {
    if (value === null) {
        return null;
    }
    if (lookup === null) {
        console.error("findItemFromLookupByProperty lookup is null. idFieldName:" + fieldName)
        return null;
    }
    if (!Array.isArray(lookup)) {
        console.error("findItemFromLookupByProperty lookup not is array")
        return null;
    }
    if (lookup.length > 0 && !lookup[0]?.hasOwnProperty(fieldName)) {
        console.error("findItemFromLookupByProperty lookup not have a property:" + fieldName)
        return null;
    }

    var o = lookup ? lookup.find((item: any) => { return item[fieldName].toString() === value.toString() }) : null;
    return o;
}