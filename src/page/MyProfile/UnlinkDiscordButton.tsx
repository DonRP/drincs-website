import LinkOffIcon from '@mui/icons-material/LinkOff';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Typography } from '@mui/joy';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DRDialogConfirmation from '../../components/DRDialogConfirmation';
import DRIconButton from '../../components/DRIconButton';
import AuthService, { getAccessToken } from '../../services/AuthService';
import { GET_PROFILE_CACHE_KEY } from '../../use_query/useGetUser';
import { showToast, showToastByMyError } from '../../utility/ShowToast';

export default function UnlinkDiscordButton() {
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false)
    const { t } = useTranslation(["translation"]);
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()

    return (
        <>
            <DRIconButton
                size="sm"
                ariaLabel={t('unlink')}
                variant="outlined"
                color='danger'
                onClick={() => setOpenDeleteConfirm(true)}
                sx={{
                    whitespace: "nowrap",
                    minWidth: "max-content"
                }}
            >
                <LinkOffIcon fontSize='small' />
            </DRIconButton>
            <DRDialogConfirmation
                open={openDeleteConfirm}
                setOpen={setOpenDeleteConfirm}
                confirmText={t('unlink')}
                cancelText={t('cancel')}
                buttonColor='danger'
                head={<>
                    <WarningRoundedIcon />
                    {t('unlink')}
                </>}
                onClickAsync={async () => {
                    let authService = new AuthService()
                    return authService.unlinkDiscord().then((res) => {
                        if (res) {
                            queryClient.invalidateQueries({ queryKey: [GET_PROFILE_CACHE_KEY, getAccessToken()] });
                            showToast(t("delete_success"), 'success', enqueueSnackbar)
                            return true
                        } else {
                            showToast(t("err_generic"), 'error', enqueueSnackbar)
                            return false
                        }
                    }).catch((err) => {
                        showToastByMyError(err, enqueueSnackbar, t)
                        return false
                    })
                }}
            >
                <Typography>
                    {t('unlink_discord_info')}
                </Typography>
            </DRDialogConfirmation >
        </>
    );
}
