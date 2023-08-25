import { FormControl, FormHelperText, FormLabel, Input, InputSlotsAndSlotProps, VariantProp } from '@mui/joy';
import { FocusEventHandler } from 'react';
import DRErrorComponent from './DRErrorComponent';

type DefaultValueType = string | number | ReadonlyArray<string> | undefined

interface IDRTextFieldProps<T extends DefaultValueType> extends InputSlotsAndSlotProps {
    fieldName: string;
    label?: string;
    helperText?: string;
    placeholder?: string;
    defaultValue?: T
    onChangeValue: (fieldName: string, value: T | any) => void;
    variant?: VariantProp
    type?: | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    fullWidth?: boolean;
    required?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    errorFields?: string[];
    error?: boolean;
}

function DRTextField<T extends DefaultValueType>(props: IDRTextFieldProps<T>) {
    const {
        fieldName,
        label,
        helperText,
        placeholder,
        defaultValue,
        onChangeValue,
        variant,
        type = "text",
        fullWidth = true,
        errorFields = [],
        required,
        autoComplete,
        autoFocus,
        error,
        ...rest
    } = props;
    const textFieldOnChange: FocusEventHandler<HTMLInputElement> = (event) => {
        event.target.value as T
        onChangeValue(fieldName, event.target.value)
    }

    try {
        return (
            <FormControl
                sx={{
                    marginTop: 0.5,
                    marginBottom: 0.5,
                }}
            >
                <FormLabel>{label}{required ? " *" : ""}</FormLabel>
                <FormHelperText>{helperText}</FormHelperText>
                <Input
                    {...rest}
                    id={fieldName}
                    name={fieldName}
                    placeholder={placeholder}
                    onBlur={textFieldOnChange}
                    defaultValue={defaultValue}
                    variant={variant}
                    type={type}
                    fullWidth={fullWidth}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    error={error || errorFields.includes(fieldName)}
                />
            </FormControl>
        )
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRTextField"} />
    }
}

export default DRTextField;