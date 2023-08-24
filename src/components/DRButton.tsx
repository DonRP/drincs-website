import { Button } from '@mui/joy';
import { ColorPaletteProp, SxProps, VariantProp } from '@mui/joy/styles/types';
import { ReactNode } from 'react';
import DRErrorComponent from './DRErrorComponent';

export interface IDRButtonProps {
    title: string,
    onClick?: () => void,
    startIcon?: React.ReactNode,
    children?: ReactNode,
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
    loading?: boolean
    autoFocus?: boolean
}

function DRButton(props: IDRButtonProps) {
    const {
        title,
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
        loading,
        autoFocus,
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
                loading={loading}
                autoFocus={autoFocus}
            >
                <strong>
                    {title}
                    {children}
                </strong>
            </Button>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRButton"} />
    }
}

export function DRButtonNoMargin(props: IDRButtonProps) {
    return (
        <DRButton
            marginBottom={0}
            marginLeft={0}
            marginRight={0}
            marginTop={0}
            {...props}
        />
    );
}


export default DRButton;