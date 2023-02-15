import { TextField, TextFieldProps } from '@mui/material';
import { FocusEventHandler } from 'react';

type IDRTextFieldProps = {
    onChangeValue: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    rows: number;
    fieldsError?: string[];
    fieldName: string;
} & TextFieldProps

function DRTextField(props: IDRTextFieldProps) {
    const { id, onChangeValue, type = "string", variant = "standard", rows = 1, multiline = (rows > 1), fieldsError = [], fieldName, fullWidth, helperText, error, ...rest } = props;

    try {
        return (
            <TextField
                {...rest}
                id={fieldName}
                name={fieldName}
                aria-describedby={fieldName}
                fullWidth={fullWidth === false ? false : true}
                type={type}
                variant={variant}
                onBlur={onChangeValue}
                helperText={helperText || ""}
                rows={rows}
                multiline={multiline}
                error={error || fieldsError.includes(fieldName)}
            />);
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>DRTextField error</div>
    }
}

export default DRTextField;