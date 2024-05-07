import { Checkbox, CheckboxProps, CheckboxTypeMap } from "@mui/joy";
import { FocusEventHandler } from "react";
import { IOnChangeGeneric } from "../utility/UtilityComponenets";
import DRErrorComponent from "./DRErrorComponent";

interface IProps extends CheckboxProps<CheckboxTypeMap['defaultComponent'], {
    component?: React.ElementType;
}> {
    onChangeGeneric: IOnChangeGeneric<boolean>;
    errorFields?: string[];
    fieldName: string;
    error?: boolean
}

export default function DRCheckBox(props: IProps) {
    const {
        onChangeGeneric,
        fieldName,
        errorFields,
        error = errorFields?.includes(fieldName),
        ...rest
    } = props;

    const checkBoxOnChange: FocusEventHandler<HTMLInputElement> = (event) => {
        onChangeGeneric(fieldName, event.target.checked)
    }

    try {
        return (
            <Checkbox
                {...rest}
                id={fieldName}
                name={fieldName}
                onChange={checkBoxOnChange}
                color={error ? "danger" : "primary"}
            />
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRCheckBox"} />
    }
}
