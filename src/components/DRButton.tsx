import { Button } from '@mui/joy';
import { ColorPaletteProp, SxProps, VariantProp } from '@mui/joy/styles/types';
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
    variant?: VariantProp
    color?: ColorPaletteProp
    endIcon?: React.ReactNode
    sx?: SxProps
    size?: 'sm' | 'md' | 'lg'
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
        variant = "solid",
        color = "primary",
        endIcon,
        sx,
        size = "lg",
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
                sx={{
                    marginTop: marginTop,
                    marginBottom: marginBottom,
                    marginLeft: marginLeft,
                    marginRight: marginRight,
                    ...sx,
                }}
                startDecorator={startIcon}
                endDecorator={endIcon}
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