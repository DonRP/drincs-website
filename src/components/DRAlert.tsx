import { Alert, AlertProps, AlertTypeMap, Typography } from '@mui/joy';
import DRErrorComponent from './DRErrorComponent';

interface IProps extends AlertProps<AlertTypeMap['defaultComponent'], {
    component?: React.ElementType;
}> {
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