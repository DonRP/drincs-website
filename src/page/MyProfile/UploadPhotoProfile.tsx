import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { AspectRatio } from '@mui/joy';
import { styled } from '@mui/material/styles';
import DRDialogConfirmation from 'components/DRDialogConfirmation';
import DRIconButton from 'components/DRIconButton';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthService from 'services/AuthService';
import { showToast, showToastByMyError } from 'utility/ShowToast';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

type IProps = {
    afterSave: (image: string) => void
}

export default function UploadPhotoProfile(props: IProps) {
    const [image, setImage] = useState({ preview: '', data: '', name: '' })
    const { t } = useTranslation(["translation"]);
    const { enqueueSnackbar } = useSnackbar();
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false)
    const { afterSave } = props

    const handleFileChange = (e: any) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
            name: e.target.files[0].name
        }
        if (img.data.size > 1000000) {
            showToast(t("file_size_must_be_less_than_1mb"), 'warning', enqueueSnackbar)
            return
        }
        setImage(img)
        setOpenDeleteConfirm(true)
    }
    return (
        <>
            <DRIconButton
                ariaLabel={t("edit")}
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                    bgcolor: 'background.body',
                    position: 'absolute',
                    zIndex: 2,
                    borderRadius: '50%',
                    left: 100,
                    top: 170,
                    boxShadow: 'sm',
                }}
                component="label"
            >
                <EditRoundedIcon />
                <VisuallyHiddenInput
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={handleFileChange}
                />
            </DRIconButton>
            <DRDialogConfirmation
                open={openDeleteConfirm}
                setOpen={setOpenDeleteConfirm}
                confirmText={t('upload')}
                cancelText={t('cancel')}
                head={<>
                    {t('upload_image')}
                </>}
                onClickAsync={async () => {
                    let authService = new AuthService()
                    return authService.updateProfileImage(image.data, image.name).then((res) => {
                        if (res) {
                            showToast(t("edit_success"), 'success', enqueueSnackbar)
                            afterSave(res)
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
                <AspectRatio
                    ratio="1"
                    minHeight={120}
                    maxHeight={200}
                    sx={{ flex: 1, maxWidth: 200, minWidth: 120, borderRadius: '100%' }}
                >
                    <img
                        src={image?.preview}
                        alt=""
                    />
                </AspectRatio>
            </DRDialogConfirmation >
        </>
    );
}
