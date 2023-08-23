import LoadingButton from '@mui/lab/LoadingButton';
import DRErrorComponent from './DRErrorComponent';

type IDRLoadingButtonProps = {
    onClick: () => void,
    startIcon?: React.ReactNode,
    titleButton: string,
    disabled?: boolean,
    loading?: boolean,
}

function DRLoadingButton(props: IDRLoadingButtonProps) {
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
        return <DRErrorComponent error={error} text={"DRLoadingButton"} />
    }
}

export default DRLoadingButton;