import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { DRButtonNoMargin } from 'components/DRButton';
import { useTranslation } from 'react-i18next';

export default function ResendVerificationMailButton() {
    const { t } = useTranslation(["translation"]);

    return (
        <DRButtonNoMargin
            size="sm"
            variant="outlined"
            startDecorator={<ForwardToInboxIcon />}
        >
            {t("resend_verification_email")}
        </DRButtonNoMargin>
    );
}
