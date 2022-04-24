import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
function DRAutocomplete(props) {
    const { id, label, defaultValue, onChange, options } = props;
    return (
        <Autocomplete
            id={id}
            label={label}
            value={defaultValue}
            onChange={onChange}
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
        />
    );
}

export default DRAutocomplete;