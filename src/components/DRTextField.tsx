import { TextField, TextFieldProps } from '@mui/material';
import { FocusEventHandler } from 'react';

type IDRTextFieldProps = {
    onChangeValue: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    rows: number;
    errorMessage: boolean;
    fieldName: string;
} & TextFieldProps

function DRTextField(props: IDRTextFieldProps) {
    const { id, onChangeValue, type = "string", variant = "standard", rows = 1, multiline = (rows > 1), errorMessage, fieldName, fullWidth, helperText, ...rest } = props;

    try {
        return (
            <TextField
                fullWidth={fullWidth === false ? false : true}
                type={type}
                variant={variant}
                aria-describedby={id}
                name={fieldName || id}
                onBlur={onChangeValue}
                helperText={helperText || ""}
                rows={rows}
                multiline={multiline}
                {...rest}
            />);
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>DRTextField error</div>
    }
}

export default DRTextField;