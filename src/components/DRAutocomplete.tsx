import { Autocomplete } from '@mui/joy';
import DRErrorComponent from './DRErrorComponent';
import DRTextFormControlBase, { IDRTextFormControlBaseProps } from './DRTextFormControlBase';

interface IDRAutocompleteProps extends IDRTextFormControlBaseProps {
    id: string,
    defaultValue: string,
    onChange: (event: any, newVal: string | null) => void,
    options: string[],
}

function DRAutocomplete(props: IDRAutocompleteProps) {
    const {
        id,
        label,
        defaultValue,
        onChange,
        options,
        helperText,
        required,
    } = props

    try {
        return (
            <DRTextFormControlBase
                label={label}
                helperText={helperText}
                required={required}
            >
                <Autocomplete
                    id={id}
                    value={defaultValue}
                    onChange={onChange}
                    options={options}
                    sx={{ width: 300 }}
                />
            </DRTextFormControlBase>
        )
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRAutocomplete"} />
    }
}

export default DRAutocomplete   