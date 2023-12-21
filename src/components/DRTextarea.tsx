import { Textarea, TextareaProps, TextareaTypeMap } from '@mui/joy';
import { FocusEventHandler } from 'react';
import { IOnChangeGeneric } from 'utility/UtilityComponenets';
import DRErrorComponent from './DRErrorComponent';
import DRTextFormControlBase, { IDRTextFormControlBaseProps } from './DRTextFormControlBase';

type DefaultValueType = string | number | ReadonlyArray<string> | undefined

interface IProps<T extends DefaultValueType> extends IDRTextFormControlBaseProps,
    TextareaProps<TextareaTypeMap['defaultComponent'], {
        component?: React.ElementType;
    }> {
    fieldName: string;
    onChangeGeneric: IOnChangeGeneric<T>
    errorFields?: string[];
}

function DRTextarea(props: IProps<string>) {
    const {
        fieldName,
        label,
        helperText,
        onChangeGeneric,
        errorFields = [],
        required,
        error,
        minRows = 2,
        ...rest
    } = props;
    const textFieldOnChange: FocusEventHandler<HTMLTextAreaElement> = (event) => {
        onChangeGeneric && onChangeGeneric(fieldName, event.target.value)
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
                    onBlur={textFieldOnChange}
                    error={error || errorFields.includes(fieldName)}
                    minRows={minRows}
                />
            </DRTextFormControlBase>
        )
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRTextarea"} />
    }
}

export default DRTextarea;