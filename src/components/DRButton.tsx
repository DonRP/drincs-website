import { Button, useTheme } from '@mui/material';
import { logError } from 'utility/Logger';

type IDRButtonProps = {
    onClick?: () => void,
    startIcon?: React.ReactNode,
    children: any,
    disabled?: boolean,
    ariaLabel?: string,
    marginTop?: number,
    marginBottom?: number,
}

function DRButton(props: IDRButtonProps) {
    const theme = useTheme();
    const {
        onClick,
        startIcon,
        children,
        disabled,
        ariaLabel,
        marginTop = 20,
        marginBottom = 10,
    } = props;

    try {
        return (
            <Button
                fullWidth
                aria-label={ariaLabel}
                title={ariaLabel}
                variant="contained"
                color="primary"
                disabled={disabled}
                size="large"
                onClick={onClick}
                startIcon={startIcon}
                style={{
                    marginTop: marginTop,
                    marginBottom: marginBottom,
                    marginLeft: 2,
                    marginRight: 2,
                }}
            >
                <strong>
                    {children}
                </strong>
            </Button>
        );
    } catch (error) {
        logError("DRButton", error)
        return <div style={{ color: theme.palette.error.main }}>DRButton error</div>
    }
}

export default DRButton;