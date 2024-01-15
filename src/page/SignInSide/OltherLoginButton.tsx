import { Typography } from '@mui/joy';
import { DRButtonSignInSide } from 'components/DRButton';
import DiscordIcon from 'components/Icon/DiscordIcon';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthService from 'services/AuthService';
import { showToastByMyError } from 'utility/ShowToast';

export default function OltherLoginButton() {
    const { t } = useTranslation(["translation"]);
    const [loadinfDiscord, setLoadingDiscord] = useState<boolean>(false)
    const { enqueueSnackbar } = useSnackbar();

    return (
        <>
            <Typography
                level="body-sm"
                sx={{ alignSelf: 'center' }}
            >
                {t("or_with")}
            </Typography>
            <DRButtonSignInSide
                onClick={() => {
                    setLoadingDiscord(true)
                    const authService = new AuthService();
                    authService.redirectLoginDiscord()
                        .then(() => {
                            setLoadingDiscord(false)
                        })
                        .catch((error) => {
                            setLoadingDiscord(false)
                            showToastByMyError(error, enqueueSnackbar, t)
                        })
                }}
                loading={loadinfDiscord}
                startDecorator={<DiscordIcon />}
            >
                {"Discord"}
            </DRButtonSignInSide>
        </>
    );
}
