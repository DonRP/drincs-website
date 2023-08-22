import { Button, useTheme } from '@mui/material';
import { logError } from 'utility/Logger';

interface IDRButtonProps {
    onClick?: () => void,
    startIcon?: React.ReactNode,
    children: any,
    disabled?: boolean,
    ariaLabel?: string,
    marginTop?: number,
    marginBottom?: number,
    fullWidth?: boolean
    variant?: 'text' | 'outlined' | 'contained'
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
        fullWidth = true,
        variant = "contained",
    } = props;

    try {
        return (
            <Button
                fullWidth={fullWidth}
                aria-label={ariaLabel}
                title={ariaLabel}
                variant={variant}
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