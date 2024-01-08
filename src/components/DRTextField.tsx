import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, Input, InputProps, InputTypeMap, useTheme } from '@mui/joy';
import { FocusEventHandler, useState } from 'react';
import { IOnChangeGeneric } from 'utility/UtilityComponenets';
import DRErrorComponent from './DRErrorComponent';
import DRTextFormControlBase, { IDRTextFormControlBaseProps } from './DRTextFormControlBase';

export type DefaultValueTypeTextField = string | number | ReadonlyArray<string> | undefined

export interface ICTextFieldProps<T extends DefaultValueTypeTextField> extends InputProps<InputTypeMap['defaultComponent'], {
    component?: React.ElementType;
}>, IDRTextFormControlBaseProps {
    fieldName: string;
    onChangeGeneric?: IOnChangeGeneric<T>
    onBlurGeneric?: IOnChangeGeneric<T>
    maxLength?: number
    errorFields?: string[];
}

export default function DRTextField<T extends DefaultValueTypeTextField>(props: ICTextFieldProps<T>) {
    const {
        fieldName,
        label,
        helperText,
        defaultValue,
        onChange,
        onChangeGeneric,
        type = "text",
        fullWidth = true,
        errorFields = [],
        required,
        onBlurGeneric,
        addHelperMarginIfIsHidden,
        disabled,
        error = errorFields.includes(fieldName),
        maxLength = 100,
        slotProps,
        ...rest
    } = props;

    const textFieldOnChange: FocusEventHandler<HTMLInputElement> | undefined = onChangeGeneric ? (event) => {
        onChangeGeneric(fieldName, event.target.value as T)
    } : undefined
    const textFieldOnBlur: FocusEventHandler<HTMLInputElement> = (event) => {
        onBlurGeneric && onBlurGeneric(fieldName, event.target.value as T)
    }

    try {
        return (
            <DRTextFormControlBase
                label={label}
                helperText={helperText}
                required={required}
                error={error}
                addHelperMarginIfIsHidden={addHelperMarginIfIsHidden}
            >
                <Input
                    {...rest}
                    id={fieldName}
                    name={fieldName}
                    onBlur={textFieldOnBlur}
                    onChange={onChange || textFieldOnChange}
                    defaultValue={defaultValue}
                    type={type}
                    fullWidth={fullWidth}
                    error={error}
                    disabled={disabled}
                    slotProps={{
                        input: {
                            maxLength: maxLength,
                        },
                        ...slotProps
                    }}
                />
            </DRTextFormControlBase>
        )
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRTextField"} />
    }
}

export function DRTextFieldNotEditable<T extends DefaultValueTypeTextField>(props: ICTextFieldProps<T>) {
    const {
        disabled = true,
        sx,
        ...rest
    } = props;

    return (
        <DRTextField
            disabled={disabled}
            sx={{
                ".Mui-disabled": {
                    color: useTheme().palette.text.primary,
                }
            }}
            {...rest}
        />
    )
}

export function DRTextFieldPassword<T extends DefaultValueTypeTextField>(props: ICTextFieldProps<T>) {
    const {
        ...rest
    } = props;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <DRTextField
            placeholder="password"
            type={showPassword ? 'text' : 'password'}
            endDecorator={
                <IconButton size="sm"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
            }
            {...rest}
        />
    )
}
