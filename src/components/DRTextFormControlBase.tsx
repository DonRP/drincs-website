import { FormControl, FormHelperText, FormLabel, InputSlotsAndSlotProps } from '@mui/joy';
import { ReactNode } from 'react';
import DRErrorComponent from './DRErrorComponent';

export interface IDRTextFormControlBaseProps extends InputSlotsAndSlotProps {
    label?: string;
    helperText?: string;
    required?: boolean;
    children?: ReactNode,
}

function DRTextFormControlBase(props: IDRTextFormControlBaseProps) {
    const {
        label,
        helperText,
        required,
        children,
    } = props;

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
                {children}
            </FormControl>
        )
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRTextFormControlBase"} />
    }
}

export default DRTextFormControlBase;