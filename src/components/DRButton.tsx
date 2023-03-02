import { Button, useTheme } from '@mui/material';

type IDRButtonProps = {
    onClick?: () => void,
    startIcon?: React.ReactNode,
    titleButton: string,
    disabled?: boolean,
}

function DRButton(props: IDRButtonProps) {
    const theme = useTheme();
    const {
        onClick,
        startIcon,
        titleButton,
        disabled
    } = props;

    try {
        return (
            <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={disabled}
                size="large"
                onClick={onClick}
                startIcon={startIcon}
                style={{
                    marginTop: 20,
                    marginBottom: 10,
                    marginLeft: 2,
                    marginRight: 2,
                }}
            >
                {titleButton}
            </Button>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: theme.palette.error.main }}>DRButton error</div>
    }
}

export default DRButton;