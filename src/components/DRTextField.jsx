import { TextField } from '@mui/material';
import React from 'react';
function DRTextField(props) {
    const { id, onChange, defaultValue, disabled, type = "string", variant = "standard", rows = 1, multiline = (rows > 1), errorMessage, label, fieldName, fullWidth, tReady, error, helperText, ...rest } = props;

    return (
        <TextField
            id={id}
            label={label || id?.toLowerCase()}
            fullWidth={fullWidth === false ? false : true}
            type={type}
            error={error}
            variant={variant}
            disabled={disabled}
            aria-describedby={id}
            defaultValue={defaultValue}
            name={fieldName || id}
            onBlur={onChange}
            helperText={helperText || ""}
            rows={rows}
            multiline={multiline}
            {...rest}
        />);
}

export default DRTextField;