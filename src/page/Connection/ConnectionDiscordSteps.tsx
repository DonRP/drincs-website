import { Typography } from '@mui/joy';
import { Toolbar } from '@mui/material';
import DRSheet from 'components/DRSheet';
import { useTranslation } from 'react-i18next';
import ConnectionDiscordError from './ConnectionDiscordError';
import ConnectionDiscordLoadingPage from './ConnectionDiscordLoadingPage';
import ConnectionDiscordSuccessPage from './ConnectionDiscordSuccessPage';

interface IProps {
    status: "loading" | "error" | "success"
    type?: "connection" | "login"
}

export default function ConnectionDiscordSteps(props: IProps) {
    const { t } = useTranslation(["translation"]);
    const {
        status,
        type = "connection",
    } = props

    function getStepContent() {
        switch (status) {
            case "loading":
                return <ConnectionDiscordLoadingPage type={type} />;
            case "success":
                return <ConnectionDiscordSuccessPage />;
            case "error":
            default:
                return <ConnectionDiscordError />;
        }
    }

    return (
        <DRSheet
            sx={{
                width: { xs: '85%', sm: '80%', md: 720 },
                mx: 'auto', // margin left & right
                my: 4, // margin top & bottom
                py: 3, // padding top & bottom
                px: 3, // padding left & right
                display: 'flex',
                flexDirection: 'column',
            }}
            variant="outlined"
        >
            <Toolbar>
                <Typography
                    textColor="inherit"
                    noWrap
                    fontSize={26}
                    marginLeft={0.5}
                    justifyContent={'center'}
                    sx={{
                        width: '100%',
                        display: 'flex',
                    }}
                >
                    {t('discord_connection')}
                </Typography>
            </Toolbar>
            {getStepContent()}
        </DRSheet>
    );
}
