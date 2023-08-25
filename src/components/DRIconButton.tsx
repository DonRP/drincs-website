import { Box, CircularProgress, ColorPaletteProp, IconButton, Tooltip, VariantProp } from "@mui/joy";
import DRErrorComponent from "./DRErrorComponent";

type IDRIconButtonProps = {
    onClick?: () => void,
    icon: any,
    disabled?: boolean,
    ariaLabel?: string,
    loading?: boolean,
    variant?: VariantProp
    color?: ColorPaletteProp
}

function DRIconButton(props: IDRIconButtonProps) {
    const {
        onClick,
        icon,
        disabled,
        ariaLabel,
        loading = false,
        variant,
        color,
    } = props;


    try {
        return (
            <>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Tooltip
                        title={ariaLabel}
                    >
                        <IconButton
                            aria-label={ariaLabel}
                            disabled={disabled}
                            onClick={onClick}
                            color={color}
                            variant={variant}
                        >
                            {icon}
                        </IconButton>
                    </Tooltip>
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
        return <DRErrorComponent error={error} text={"DRIconButton"} />
    }
}

export default DRIconButton;