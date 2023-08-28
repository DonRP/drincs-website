import { Alert, AlertSlotsAndSlotProps, ColorPaletteProp, Typography } from '@mui/joy';
import { ReactNode } from 'react';
import DRErrorComponent from './DRErrorComponent';

interface IProps extends AlertSlotsAndSlotProps {
    children?: ReactNode,
    startDecorator?: ReactNode,
    color?: ColorPaletteProp
}

function DRAlert(props: IProps) {
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