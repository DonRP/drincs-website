import { Checkbox, CheckboxProps, FormControlLabel, Typography, useTheme } from "@mui/material";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
import { logError } from "utility/Logger";

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
    const { onChangeValue, errorFields, fieldName, label, error, labelPlacement, position = "left", ...rest } = props;
    const theme = useTheme();
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
                label={<Typography color={(error || errorFields?.includes(fieldName)) ? theme.palette.error.main : ""}>
                    {label}
                </Typography>}
            />
        );
    } catch (error) {
        logError("DRCheckBox", error)
        return <div style={{ color: theme.palette.error.main }}>DRCheckBox error</div>
    }
}

export default DRCheckBox;