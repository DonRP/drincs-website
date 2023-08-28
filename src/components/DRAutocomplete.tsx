import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteValue, TextField } from '@mui/material';
import DRErrorComponent from './DRErrorComponent';
import DRTextFormControlBase, { IDRTextFormControlBaseProps } from './DRTextFormControlBase';

interface IProps extends IDRTextFormControlBaseProps {
    fieldName: string,
    label: string,
    defaultValue: string,
    onChange: (event: any, newVal: number | null) => void,
    options: string[],
    errorFields?: string[];
    error?: boolean;
    disableClearable?: boolean;
}

function DRAutocomplete(props: IProps) {
    const {
        fieldName,
        label,
        defaultValue,
        onChange,
        options,
        helperText,
        required,
        errorFields = [],
        error,
        disableClearable,
    } = props

    const autocompleteOnChange:
        (
            event: React.SyntheticEvent,
            value: AutocompleteValue<any, any, any, any>,
            reason: AutocompleteChangeReason,
            details?: AutocompleteChangeDetails<any>,
        ) => void
        = (event, value: any) => {
            event.target as any
            onChange(fieldName, value)
        }

    try {
        return (
            <DRTextFormControlBase
                label={label}
                helperText={helperText}
                required={required}
            >
                <Autocomplete
                    id={fieldName}
                    value={defaultValue}
                    onChange={autocompleteOnChange}
                    options={options}
                    disableClearable={disableClearable}
                    renderInput={(params) => <TextField
                        error={error || errorFields.includes(fieldName)}
                        {...params}
                    />}
                />
            </DRTextFormControlBase>
        )
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRAutocomplete"} />
    }
}

export default DRAutocomplete   