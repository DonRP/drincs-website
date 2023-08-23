import { Button, SxProps } from '@mui/material';
import DRErrorComponent from './DRErrorComponent';

interface IDRButtonProps {
    onClick?: () => void,
    startIcon?: React.ReactNode,
    children: any,
    disabled?: boolean,
    ariaLabel?: string,
    marginTop?: number,
    marginBottom?: number,
    marginLeft?: number,
    marginRight?: number,
    fullWidth?: boolean
    variant?: 'text' | 'outlined' | 'contained'
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    endIcon?: React.ReactNode
    sx?: SxProps
    size?: 'small' | 'medium' | 'large'
}

function DRButton(props: IDRButtonProps) {
    const {
        onClick,
        startIcon,
        children,
        disabled,
        ariaLabel,
        marginTop = 20,
        marginBottom = 10,
        marginLeft = 2,
        marginRight = 2,
        fullWidth = true,
        variant = "contained",
        color = "primary",
        endIcon,
        sx,
        size = "large",
    } = props;

    try {
        return (
            <Button
                fullWidth={fullWidth}
                aria-label={ariaLabel}
                title={ariaLabel}
                variant={variant}
                color={color}
                disabled={disabled}
                size={size}
                onClick={onClick}
                startIcon={startIcon}
                sx={{
                    marginTop: marginTop,
                    marginBottom: marginBottom,
                    marginLeft: marginLeft,
                    marginRight: marginRight,
                    ...sx,
                }}
                endIcon={endIcon}
            >
                <strong>
                    {children}
                </strong>
            </Button>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRButton"} />
    }
}

export default DRButton;