import DeleteIcon from '@mui/icons-material/Delete';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Typography } from '@mui/joy';
import { useQueryClient } from '@tanstack/react-query';
import DRButton from 'components/DRButton';
import DRDialogConfirmation from 'components/DRDialogConfirmation';
import DRTextField from 'components/DRTextField';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AuthService from 'services/AuthService';
import { GET_PROFILE_CACHE_KEY } from 'use_query/useGetUser';
import { showToast, showToastByMyError } from 'utility/ShowToast';

function UserDeleteButton() {
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false)
    const { t } = useTranslation(["translation"]);
    const [enableDeleteConfirm, setEnableDeleteConfirm] = useState<boolean>(false)
    const deleteAccountConfirmText = t('delete_account')
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    return (
        <>
            <DRButton
                size="sm"
                variant="outlined"
                color='danger'
                onClick={() => setOpenDeleteConfirm(true)}
                startDecorator={<DeleteIcon fontSize='small' />}
                sx={{
                    whitespace: "nowrap",
                    minWidth: "max-content"
                }}
            >
                {t("delete_account")}
            </DRButton>
            <DRDialogConfirmation
                open={openDeleteConfirm}
                setOpen={setOpenDeleteConfirm}
                confirmText={t('delete')}
                cancelText={t('cancel')}
                disabledConfirm={!enableDeleteConfirm}
                buttonColor='danger'
                head={<>
                    <WarningRoundedIcon />
                    {t('delete_account')}
                </>}
                onClickAsync={async () => {
                    let authService = new AuthService()
                    return authService.delteAccount().then((res) => {
                        if (res) {
                            authService.logOut()
                            navigate("/");
                            queryClient.invalidateQueries({ queryKey: [GET_PROFILE_CACHE_KEY] });
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
                    {t('delete_account_info')}
                </Typography>
                <DRTextField
                    fieldName="delete_account"
                    color='danger'
                    helperText={t('delete_account_helper', { confirmText: deleteAccountConfirmText })}
                    onChangeGeneric={(fieldName, value) => {
                        if (value?.toString().toLocaleLowerCase() === deleteAccountConfirmText.toLocaleLowerCase()) {
                            setEnableDeleteConfirm(true)
                        } else {
                            setEnableDeleteConfirm(false)
                        }
                    }}
                />
            </DRDialogConfirmation >
        </>
    );
}

export default UserDeleteButton;
