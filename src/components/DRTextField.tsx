import { Input, InputSlotsAndSlotProps, VariantProp } from '@mui/joy';
import { FocusEventHandler } from 'react';
import DRErrorComponent from './DRErrorComponent';
import DRTextFormControlBase, { IDRTextFormControlBaseProps } from './DRTextFormControlBase';

type DefaultValueType = string | number | ReadonlyArray<string> | undefined

interface IProps<T extends DefaultValueType> extends InputSlotsAndSlotProps, IDRTextFormControlBaseProps {
    fieldName: string;
    placeholder?: string;
    defaultValue?: T
    onChange: (fieldName: string, value: T | any) => void;
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
    autoComplete?: string;
    autoFocus?: boolean;
    errorFields?: string[];
    error?: boolean;
}

function DRTextField<T extends DefaultValueType>(props: IProps<T>) {
    const {
        fieldName,
        label,
        helperText,
        defaultValue,
        onChange,
        type = "text",
        fullWidth = true,
        errorFields = [],
        required,
        error,
        ...rest
    } = props;
    const textFieldOnChange: FocusEventHandler<HTMLInputElement> = (event) => {
        event.target.value as T
        onChange(fieldName, event.target.value)
    }

    try {
        return (
            <DRTextFormControlBase
                label={label}
                helperText={helperText}
                required={required}
            >
                <Input
                    {...rest}
                    id={fieldName}
                    name={fieldName}
                    onBlur={textFieldOnChange}
                    defaultValue={defaultValue}
                    type={type}
                    fullWidth={fullWidth}
                    error={error || errorFields.includes(fieldName)}
                />
            </DRTextFormControlBase>
        )
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRTextField"} />
    }
}

export default DRTextField;