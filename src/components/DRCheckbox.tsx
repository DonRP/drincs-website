import { Checkbox, CheckboxSlotsAndSlotProps } from "@mui/joy";
import DRErrorComponent from "./DRErrorComponent";

interface IProps extends CheckboxSlotsAndSlotProps {
    onChangeValue: (fieldName: string, value: boolean) => void;
    errorFields?: string[];
    fieldName: string;
    label: string;
    error?: boolean
    checked?: boolean;
}

function DRCheckBox(props: IProps) {
    const { onChangeValue, errorFields, fieldName, error, ...rest } = props;
    let internalError = error || errorFields?.includes(fieldName)
    const drCheckBoxOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeValue(fieldName, event.target.checked)
    }

    try {
        return (
            <Checkbox
                {...rest}
                id={fieldName}
                name={fieldName}
                onChange={drCheckBoxOnChange}
                color={internalError ? "danger" : "primary"}
            />
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRCheckBox"} />
    }
}

export default DRCheckBox;