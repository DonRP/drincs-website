import { Autocomplete, TextField, useTheme } from '@mui/material';
import { logError } from 'utility/Logger';

type IDRAutocompleteProps = {
    id: string,
    label: string,
    defaultValue: string,
    onChange: (event: any, newVal: string | null) => void,
    options: string[],
}

function DRAutocomplete(props: IDRAutocompleteProps) {
    const theme = useTheme();
    const { id, label, defaultValue, onChange, options } = props

    try {
        return (
            <Autocomplete
                id={id}
                value={defaultValue}
                onChange={onChange}
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField
                    label={label}
                    {...params}
                />
                }
            />
        )
    } catch (error) {
        logError("DRAutocomplete", error)
        return <div style={{ color: theme.palette.error.main }}>DRAutocomplete error</div>
    }
}

export default DRAutocomplete   