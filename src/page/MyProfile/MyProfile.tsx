import EditIcon from '@mui/icons-material/Edit';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import KeyIcon from '@mui/icons-material/Key';
import LaunchIcon from '@mui/icons-material/Launch';
import AspectRatio from '@mui/joy/AspectRatio';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import DRAlert from 'components/DRAlert';
import { DRButtonNoMargin } from 'components/DRButton';
import DRChip from 'components/DRChip';
import { DRIconButtonLoading } from 'components/DRIconButton';
import { DRTextFieldNotEditable } from 'components/DRTextField';
import DiscordIcon from 'components/Icon/DiscordIcon';
import { gitHubLink } from 'constant';
import { UserProfile } from 'model/Auth/UserProfile';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AuthService from 'services/AuthService';
import { useGetProfileCache } from 'use_query/useGetUser';
import { showToast, showToastByMyError } from 'utility/ShowToast';
import MyProfileCard from './MyProfileCard';
import ResendVerificationMailButton from './ResendVerificationMailButton';
import UploadPhotoProfile from './UploadPhotoProfile';
import UserDeleteButton from './UserDeleteButton';

export default function MyProfile() {
    const { t } = useTranslation(["translation"]);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [loadinfDiscord, setLoadingDiscord] = useState<boolean>(false)
    const {
        isLoading,
        data = new UserProfile(),
    } = useGetProfileCache({
        then: (data) => {
            setUserInfo(data)
        },
        catch: (err) => {
            showToast(t("get_user_profile_error"), "error", enqueueSnackbar)
        },
    })
    const [userInfo, setUserInfo] = useState<UserProfile>(data)
    useEffect(() => {
        setUserInfo(data)
    }, [data])

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
                        <UploadPhotoProfile
                            afterSave={(image) => {
                                setUserInfo({
                                    ...userInfo,
                                    photoURL: image
                                })
                            }}
                        />
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
                        {userInfo.haveDiscordAccount && <DRAlert
                            startDecorator={<DiscordIcon />}
                            variant="outlined"
                            color='success'
                        >
                            {t("connection_discord_success") + " - " + t("support_development_info") + " "} <a
                                href={gitHubLink + "/drincs-website/issues/37"}
                                target={"_blank"} rel="noreferrer"
                            >GitHub issue</a>
                        </DRAlert>}
                        {userInfo.emailVerified && !userInfo.haveDiscordAccount && <DRAlert
                            startDecorator={<DiscordIcon />}
                            variant="outlined"
                            color="primary"
                            endDecorator={
                                <DRIconButtonLoading
                                    loading={loadinfDiscord}
                                    onClick={() => {
                                        let service = new AuthService();
                                        setLoadingDiscord(true)
                                        service.redirectConnectDiscord()
                                            .then(() => {
                                                setLoadingDiscord(false)
                                            })
                                            .catch((error) => {
                                                setLoadingDiscord(false)
                                                showToastByMyError(error, enqueueSnackbar, t)
                                            })
                                    }}
                                >
                                    <LaunchIcon />
                                </DRIconButtonLoading>
                            }>
                            {t("connect_to_discord") + ": " + t("used_support_rewards")}
                        </DRAlert>}
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
                        startDecorator={<KeyIcon />}
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
                        startDecorator={<EditIcon />}
                    >
                        {t("edit")}
                    </DRButtonNoMargin>
                </>
            }
        />
    );
}
