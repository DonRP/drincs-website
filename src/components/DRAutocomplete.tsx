import { Autocomplete } from '@mui/joy';
import DRErrorComponent from './DRErrorComponent';
import DRTextFormControlBase, { IDRTextFormControlBaseProps } from './DRTextFormControlBase';

interface IDRAutocompleteProps extends IDRTextFormControlBaseProps {
    fieldName: string,
    defaultValue: string,
    onChange: (event: any, newVal: string | null) => void,
    options: string[],
    placeholder?: string;
    errorFields?: string[];
    error?: boolean;
}

function DRAutocomplete(props: IDRAutocompleteProps) {
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
                    onChange={onChange}
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