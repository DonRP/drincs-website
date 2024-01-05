import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AspectRatio from '@mui/joy/AspectRatio';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { DRButtonNoMargin } from 'components/DRButton';
import DRChip from 'components/DRChip';
import DRIconButton from 'components/DRIconButton';
import { DRTextFieldNotEditable } from 'components/DRTextField';
import { UserProfile } from 'model/Auth/UserProfile';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetProfileCache } from 'use_query/useGetUser';
import { showToast } from 'utility/ShowToast';
import MyProfileCard from './MyProfileCard';
import ResendVerificationMailButton from './ResendVerificationMailButton';
import UserDeleteButton from './UserDeleteButton';

export default function MyProfile() {
    const { t } = useTranslation(["translation"]);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const {
        isLoading,
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
                    <Stack direction="column" spacing={1}>
                        <AspectRatio
                            ratio="1"
                            maxHeight={200}
                            sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                        >
                            <img
                                src={userInfo.photoURL}
                                loading="lazy"
                                alt=""
                            />
                        </AspectRatio>
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
                        >
                            <EditRoundedIcon />
                        </DRIconButton>
                    </Stack>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                        <DRTextFieldNotEditable
                            fieldName="displayName"
                            label={t("username")}
                            value={userInfo.displayName}
                        />
                        <DRTextFieldNotEditable
                            fieldName="email"
                            label={t("email")}
                            value={userInfo.email}
                            type='email'
                            startDecorator={<EmailRoundedIcon />}
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
                        {!isLoading && !userInfo.emailVerified &&
                            <ResendVerificationMailButton />
                        }
                    </Stack>
                </>
            }
            actions={
                <>
                    <UserDeleteButton />
                    <DRButtonNoMargin
                        size="sm"
                        disabled={isLoading}
                        sx={{
                            whitespace: "nowrap",
                            minWidth: "max-content"
                        }}
                        onClick={() => {
                            navigate("/profile/change-password");
                        }}
                    >
                        {t("edit_password")}
                    </DRButtonNoMargin>
                    <DRButtonNoMargin
                        size="sm"
                        variant="solid"
                        disabled={isLoading}
                        sx={{
                            whitespace: "nowrap",
                            minWidth: "max-content"
                        }}
                        onClick={() => {
                            navigate("/profile/edit");
                        }}
                    >
                        {t("edit")}
                    </DRButtonNoMargin>
                </>
            }
        />
    );
}
