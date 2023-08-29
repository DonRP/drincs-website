import { Box, CircularProgress, ColorPaletteProp, IconButton, Tooltip, VariantProp } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import DRErrorComponent from "./DRErrorComponent";

interface IProps {
    onClick?: () => void,
    icon: any,
    disabled?: boolean,
    ariaLabel?: string,
    variant?: VariantProp
    color?: ColorPaletteProp
    size?: 'sm' | 'md' | 'lg'
    sx?: SxProps
    position?: 'relative' | 'absolute'
}

function DRIconButton(props: IProps) {
    const {
        onClick,
        icon,
        disabled,
        ariaLabel,
        variant,
        color,
        size,
        sx,
    } = props;


    try {
        return (
            <Tooltip
                title={ariaLabel}
            >
                <IconButton
                    aria-label={ariaLabel}
                    disabled={disabled}
                    onClick={onClick}
                    color={color}
                    variant={variant}
                    size={size}
                    sx={sx}
                >
                    {icon}
                </IconButton>
            </Tooltip>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRIconButton"} />
    }
}

export default DRIconButton;

interface ILoadingProps extends IProps {
    loading?: boolean,
}

export function DRIconButtonLoading(props: ILoadingProps) {
    const {
        loading = false,
        ...rest
    } = props;


    try {
        return (
            <>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <DRIconButton
                        {...rest}
                    />
                    {loading && (
                        <CircularProgress
                            size="sm"
                            color="success"
                            sx={{
                                color: "secondary.main",
                                position: 'absolute',
                                top: 7,
                                left: 7,
                                zIndex: 1,
                            }}
                        />
                    )}
                </Box>
            </>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRIconButtonLoading"} />
    }
}