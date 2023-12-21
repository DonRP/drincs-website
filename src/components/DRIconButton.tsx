import { Box, CircularProgress, IconButton, IconButtonProps, IconButtonTypeMap, Tooltip } from '@mui/joy';
import DRErrorComponent from './DRErrorComponent';

export interface IProps extends IconButtonProps<IconButtonTypeMap['defaultComponent'], {
    component?: React.ElementType;
}> {
    ariaLabel?: string
}

export default function DRIconButton(props: IProps) {
    const {
        children,
        ariaLabel,
        ...rest
    } = props;

    try {
        return (
            <Tooltip
                title={ariaLabel}
            >
                <IconButton
                    {...rest}
                    aria-label={ariaLabel}
                >
                    {children}
                </IconButton>
            </Tooltip>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRIconButton"} />
    }
}

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