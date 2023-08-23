import { Checkbox, CheckboxProps, FormControlLabel, Typography } from "@mui/material";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
import { myUseTheme } from "theme";
import DRErrorComponent from "./DRErrorComponent";

type IDRCheckBoxProps = {
    onChangeValue: (fieldName: string, value: boolean) => void;
    errorFields?: string[];
    fieldName: string;
    label: string;
    error?: boolean
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
    position?: 'left' | 'center';
} & CheckboxProps

function DRCheckBox(props: IDRCheckBoxProps) {
    const theme = myUseTheme()
    const { onChangeValue, errorFields, fieldName, label, error, labelPlacement, position = "left", ...rest } = props;
    const drCheckBoxOnChange: SwitchBaseProps['onChange'] = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeValue(fieldName, event.target.checked)
    }

    try {
        return (
            <FormControlLabel
                id={fieldName}
                labelPlacement={labelPlacement || "end"}
                sx={{
                    width: position === "left" ? "-webkit-fill-available" : ""
                }}
                control={<Checkbox
                    {...rest}
                    id={fieldName}
                    name={fieldName}
                    onChange={drCheckBoxOnChange}
                />}
                label={<Typography color={(error || errorFields?.includes(fieldName)) ? theme.palette.danger[500] : ""}>
                    {label}
                </Typography>}
            />
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRCheckBox"} />
    }
}

export default DRCheckBox;