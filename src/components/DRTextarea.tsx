import { Textarea, TextareaSlotsAndSlotProps, VariantProp } from '@mui/joy';
import { FocusEventHandler } from 'react';
import DRErrorComponent from './DRErrorComponent';
import DRTextFormControlBase, { IDRTextFormControlBaseProps } from './DRTextFormControlBase';

type DefaultValueType = string | number | ReadonlyArray<string> | undefined

interface IProps<T extends DefaultValueType> extends TextareaSlotsAndSlotProps, IDRTextFormControlBaseProps {
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
    minRows?: number;
    maxRows?: number;
}

function DRTextarea<T extends DefaultValueType>(props: IProps<T>) {
    const {
        fieldName,
        label,
        helperText,
        placeholder,
        defaultValue,
        onChange,
        variant,
        type = "text",
        fullWidth = true,
        errorFields = [],
        required,
        autoComplete,
        autoFocus,
        error,
        minRows = 2,
        maxRows,
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
                <Textarea
                    {...rest}
                    id={fieldName}
                    name={fieldName}
                    placeholder={placeholder}
                    // onBlur={textFieldOnChange}
                    defaultValue={defaultValue}
                    // variant={variant}
                    // type={type}
                    // fullWidth={fullWidth}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    error={error || errorFields.includes(fieldName)}
                    minRows={minRows}
                    maxRows={maxRows}
                />
            </DRTextFormControlBase>
        )
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRTextarea"} />
    }
}

export default DRTextarea;