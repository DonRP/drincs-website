import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import DRChip from 'components/DRChip';
import { DRTextFieldNotEditable } from 'components/DRTextField';
import { UserProfile } from 'model/Auth/UserProfile';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useGetProfileCache } from 'use_query/useGetUser';
import { showToast } from 'utility/ShowToast';
import MyProfileCard from './MyProfileCard';

export default function MyProfile() {
    const { t } = useTranslation(["translation"]);
    const { enqueueSnackbar } = useSnackbar();
    const {
        data: userInfo = new UserProfile(),
    } = useGetProfileCache({
        catch: (err) => {
            showToast(t("get_user_profile_error"), "error", enqueueSnackbar)
        },
    })

    return (
        <MyProfileCard
            title={
                <>
                    <Typography level="title-md">
                        {t("my_profile")}
                    </Typography>
                    <Typography level="body-sm">
                        {t("my_profile_info")}
                    </Typography>
                </>
            }
            body={
                <>
                    <DRTextFieldNotEditable
                        fieldName="displayName"
                        label={t("username")}
                        value={userInfo.displayName}
                        required
                        disabled
                    />
                    <DRTextFieldNotEditable
                        fieldName="email"
                        label={t("email")}
                        value={userInfo.email}
                        type='email'
                        required
                        startDecorator={<EmailRoundedIcon />}
                        disabled
                        endDecorator={
                            userInfo.emailVerified ?
                                <DRChip
                                    ariaLabel={t("verified")}
                                    color="success"
                                >
                                    {t("verified")}
                                </DRChip>
                                :
                                <DRChip
                                    ariaLabel={t("not_verified")}
                                    color="danger"
                                >
                                    {t("not_verified")}
                                </DRChip>
                        }
                    />
                </>
            }
            actions={
                <>
                    <Button size="sm" variant="outlined" color="neutral">
                        Cancel
                    </Button>
                    <Button size="sm" variant="solid">
                        Save
                    </Button>
                </>
            }
        />
    );
}
