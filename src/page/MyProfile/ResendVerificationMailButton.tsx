import CheckIcon from '@mui/icons-material/Check';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DRButton from '../../components/DRButton';
import AuthService from '../../services/AuthService';
import { showToastByMyError } from '../../utility/ShowToast';

export default function ResendVerificationMailButton() {
    const { t } = useTranslation(["translation"]);
    const { enqueueSnackbar } = useSnackbar();
    const [emailSended, setEmailSended] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <DRButton
            size="sm"
            variant="outlined"
            color={emailSended ? "success" : undefined}
            startDecorator={<ForwardToInboxIcon />}
            disabled={emailSended}
            loading={loading}
            endDecorator={emailSended ? <CheckIcon color="success" /> : undefined}
            onClick={() => {
                let service = new AuthService();
                setLoading(true)
                service.resendEmail().then(() => {
                    setEmailSended(true)
                    setLoading(false)
                }).catch((err) => {
                    showToastByMyError(err, enqueueSnackbar, t)
                    setLoading(false)
                })
            }}
        >
            {emailSended ? t("verification_mail_sent") : t("resend_verification_email")}
        </DRButton>
    );
}
