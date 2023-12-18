import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteProps, createFilterOptions } from '@mui/joy';
import { AutocompleteValue } from '@mui/material';
import { IOnChangeGeneric, findSimilarItemFromLookupByProperty } from 'utility/UtilityComponenets';
import DRErrorComponent from './DRErrorComponent';
import DRTextFormControlBase, { IDRTextFormControlBaseProps } from './DRTextFormControlBase';

interface IProps<T> extends AutocompleteProps<T, any, any, any>, IDRTextFormControlBaseProps {
    fieldName: string
    onChangeGeneric?: IOnChangeGeneric<T>
    descriptionFieldName?: string
    oidFieldName?: string
    errorFields?: string[];
}

/**
 * TODO: genera un console log di errore della MUI se use default value
 * MUI: A component is changing the default value state of an uncontrolled Autocomplete after being initialized. To suppress this warning opt to use a controlled Autocomplete.
 * https://legacy.reactjs.org/docs/forms.html#controlled-components
 * @param props 
 * @returns 
 */
function DRAutocomplete<T extends object>(props: IProps<T>) {
    const {
        fieldName,
        label,
        onChangeGeneric,
        options,
        helperText,
        required,
        descriptionFieldName = "description",
        oidFieldName = "oid",
        addHelperMarginIfIsHidden,
        errorFields = [],
        error,
        ...rest
    } = props;

    const autocompleteOnChange = (event: React.SyntheticEvent,
        value: AutocompleteValue<T, any, any, any>,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<T>) => {
        onChangeGeneric && onChangeGeneric(fieldName, value as T)
    }

    /**
     * TODO option non dovrebbe essere any, ma T
     * @param option 
     * @returns 
     */
    const getDescription = (option: any | undefined, descriptionFieldName: string): string => {
        if (!option) {
            return ""
        }
        try {
            if (option && option.hasOwnProperty(descriptionFieldName)) {
                if (option[descriptionFieldName] !== null && option[descriptionFieldName] !== undefined) {
                    return option[descriptionFieldName]
                }
            }
        }
        catch (error) {
            console.error("filterOptions catch, id: " + fieldName, error)
        }
        console.error("Autocomplete descriptionFieldName is invalid, id: " + fieldName)
        return ""
    }

    const getOptionLabel = (option: string | T): string => {
        if (typeof option === "string") {
            // passa di qui quando gli viene passato un default value
            let res = findSimilarItemFromLookupByProperty(options, oidFieldName, option)
            if (res) {
                return getDescription(res, descriptionFieldName)
            }
            return option
        }
        return getDescription(option, descriptionFieldName)
    }
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option: T) => {
            return getDescription(option, descriptionFieldName)
        },
    });
    const isOptionEqualToValue = (option: T, value: T | string | undefined) => {
        if (typeof value === "string") {
            // passa di qui quando gli viene passato un default value
            return getDescription(option, oidFieldName).toString() === value
        }
        if (option && option.hasOwnProperty(oidFieldName)) {
            return getDescription(option, oidFieldName) === getDescription(value, oidFieldName)
        }
        console.warn("warn isOptionEqualToValue oidFieldName is invalid, id: " + fieldName, option, value)
        return getDescription(option, descriptionFieldName) === getDescription(value, descriptionFieldName)
    }


    try {
        return (
            <DRTextFormControlBase
                label={label}
                helperText={helperText}
                required={required}
                error={error || errorFields.includes(fieldName)}
                addHelperMarginIfIsHidden={addHelperMarginIfIsHidden}
            >
                <Autocomplete
                    {...rest}
                    placeholder="Type something"
                    getOptionLabel={getOptionLabel}
                    filterOptions={filterOptions}
                    onChange={autocompleteOnChange}
                    options={options}
                    error={error || errorFields.includes(fieldName)}
                    isOptionEqualToValue={isOptionEqualToValue}
                />
            </DRTextFormControlBase>
        )
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRAutocomplete"} />
    }
}

export default DRAutocomplete