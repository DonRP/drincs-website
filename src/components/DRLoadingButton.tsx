import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material';

type IDRLoadingButtonProps = {
    onClick: () => void,
    startIcon?: React.ReactNode,
    titleButton: string,
    disabled?: boolean,
    loading?: boolean,
}

function DRLoadingButton(props: IDRLoadingButtonProps) {
    const theme = useTheme();
    const {
        onClick,
        startIcon,
        titleButton,
        disabled,
        loading = false,
    } = props;

    try {
        return (
            <LoadingButton
                // {...props}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={onClick}
                autoFocus
                startIcon={startIcon}
                disabled={disabled}
                loading={loading}

                style={{
                    marginTop: 20,
                    marginBottom: 10,
                    marginLeft: 2,
                    marginRight: 2,
                }}
            >
                {titleButton}
            </LoadingButton>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: theme.palette.error.main }}>DRLoadingButton error</div>
    }
}

export default DRLoadingButton;