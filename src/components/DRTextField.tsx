import { InputBaseProps, TextField, TextFieldProps, useTheme } from '@mui/material';
import { FocusEvent } from 'react';

type IDRTextFieldProps = {
    onChangeValue: (fieldName: string, value: any) => void;
    rows?: number;
    errorFields?: string[];
    fieldName: string;
    defaultValue: string;
} & TextFieldProps

function DRTextField(props: IDRTextFieldProps) {
    const { id, onChangeValue, type = "string", variant = "standard", rows = 1, multiline = (rows > 1), errorFields = [], fieldName, fullWidth, helperText, error, ...rest } = props;
    const theme = useTheme();
    const drTextFieldOnChange: InputBaseProps['onBlur'] = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        onChangeValue(fieldName, event.target.value)
    }

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
                onBlur={drTextFieldOnChange}
                helperText={helperText || ""}
                rows={rows}
                multiline={multiline}
                error={error || errorFields.includes(fieldName)}
            />);
    } catch (error) {
        console.error(error)
        return <div style={{ color: theme.palette.error.main }}>DRTextField error</div>
    }
}

export default DRTextField;