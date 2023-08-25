import { Alert, AlertSlotsAndSlotProps, ColorPaletteProp, Typography } from '@mui/joy';
import { ReactNode } from 'react';
import DRErrorComponent from './DRErrorComponent';

export interface IDRAlertProps extends AlertSlotsAndSlotProps {
    children?: ReactNode,
    startDecorator?: ReactNode,
    color?: ColorPaletteProp
}

function DRAlert(props: IDRAlertProps) {
    const {
        children,
    } = props;

    try {
        return (
            <Alert
                {...props}
            >
                <Typography>
                    {children}
                </Typography>
            </Alert>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRAlert"} />
    }
}

export default DRAlert;