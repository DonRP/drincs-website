import { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/joy';
import { AutocompleteValue } from '@mui/material';
import DRErrorComponent from './DRErrorComponent';
import DRTextFormControlBase, { IDRTextFormControlBaseProps } from './DRTextFormControlBase';

interface IProps extends IDRTextFormControlBaseProps {
    fieldName: string,
    defaultValue: string,
    onChange: (fieldName: string, value: any) => void;
    options: string[],
    placeholder?: string;
    errorFields?: string[];
    error?: boolean;
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
        placeholder,
        errorFields = [],
        error,
    } = props

    const autoCompleteOnChange: (
        event: React.SyntheticEvent,
        value: AutocompleteValue<any, any, any, any>,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails,
    ) => void = (event) => {
        onChange(fieldName, "event.target.value")
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
                    onChange={autoCompleteOnChange}
                    options={options}
                    placeholder={placeholder}
                    error={error || errorFields.includes(fieldName)}
                    sx={{ width: 300 }}
                />
            </DRTextFormControlBase>
        )
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRAutocomplete"} />
    }
}

export default DRAutocomplete   