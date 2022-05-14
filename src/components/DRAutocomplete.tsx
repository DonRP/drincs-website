import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

type IDRAutocompleteProps = {
    id: string,
    label: string,
    defaultValue: string,
    onChange: (event: any, newVal: string | null) => void,
    options: string[],
}

function DRAutocomplete(props: IDRAutocompleteProps) {
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
        console.error(error)
        return <div style={{ color: "red" }}>DRAutocomplete error</div>
    }
}

export default DRAutocomplete   