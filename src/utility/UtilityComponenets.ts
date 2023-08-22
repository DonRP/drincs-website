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
