import { InputBaseProps, TextField, TextFieldProps } from '@mui/material';
import { FocusEvent } from 'react';
import DRErrorComponent from './DRErrorComponent';

type IDRTextFieldProps = {
    onChangeValue: (fieldName: string, value: any) => void;
    rows?: number;
    errorFields?: string[];
    fieldName: string;
    defaultValue: string;
} & TextFieldProps

function DRTextField(props: IDRTextFieldProps) {
    const { id, onChangeValue, type = "string", variant = "standard", rows = 1, multiline = (rows > 1), errorFields = [], fieldName, fullWidth, helperText, error, ...rest } = props;
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
        return <DRErrorComponent error={error} text={"DRTextField"} />
    }
}

export default DRTextField;