import { FormControl, FormHelperText, FormLabel, useTheme } from '@mui/joy';
import { ReactNode } from 'react';
import { isEmptyOrSpaces } from 'utility/UtilityFunctionts';
import DRErrorComponent from './DRErrorComponent';

export interface IDRTextFormControlBaseProps {
    label?: string;
    helperText?: string;
    required?: boolean;
    addHelperMarginIfIsHidden?: boolean;
    error?: boolean;
}

interface IProps extends IDRTextFormControlBaseProps {
    children?: ReactNode,
}

function DRTextFormControlBase(props: IProps) {
    const {
        label,
        helperText,
        required,
        children,
        error,
        addHelperMarginIfIsHidden,
    } = props;
    const theme = useTheme();

    try {
        return (
            <FormControl
                sx={{
                    marginTop: 0.5,
                    marginBottom: isEmptyOrSpaces(helperText) && addHelperMarginIfIsHidden ? 2.8 : 0.5
                }}
            >
                <FormLabel
                    sx={{
                        color: error ? theme.palette.danger[500] : undefined
                    }}
                >{label}{required ? " *" : ""}</FormLabel>
                {children}
                <FormHelperText
                    sx={{
                        color: error ? theme.palette.danger[500] : undefined,
                        fontSize: 13,
                    }}
                >{helperText}</FormHelperText>
            </FormControl>
        )
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRTextFormControlBase"} />
    }
}

export default DRTextFormControlBase;