import EditIcon from '@mui/icons-material/Edit';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import KeyIcon from '@mui/icons-material/Key';
import LaunchIcon from '@mui/icons-material/Launch';
import { Grid } from '@mui/joy';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import DRAlert from 'components/DRAlert';
import { DRButtonFab } from 'components/DRButton';
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
import UnlinkDiscordButton from './UnlinkDiscordButton';
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
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid
                        sm={3}
                    >
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
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        xs={12}
                        sm={9}
                    >
                        <Grid
                            xs={12}
                        >
                            <DRTextFieldNotEditable
                                fieldName="displayName"
                                label={t("username")}
                                value={userInfo.displayName}
                            />
                        </Grid>
                        <Grid
                            xs={12}
                        >
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
                        </Grid>
                        {!isLoading && !userInfo.emailVerified &&
                            <Grid
                                xs={12}
                            >
                                <ResendVerificationMailButton />
                            </Grid>
                        }
                        {userInfo.haveDiscordAccount &&
                            <Grid
                                xs={12}
                            >
                                <DRAlert
                                    startDecorator={<DiscordIcon />}
                                    variant="outlined"
                                    color='success'
                                    endDecorator={<UnlinkDiscordButton />}
                                >
                                    {t("connection_discord_success") + " - " + t("support_development_info") + " "} <a
                                        href={gitHubLink + "/drincs-website/issues/37"}
                                        target={"_blank"} rel="noreferrer"
                                    >GitHub issue</a>
                                </DRAlert>
                            </Grid>
                        }
                        {userInfo.emailVerified && !userInfo.haveDiscordAccount &&
                            <Grid
                                xs={12}
                            >
                                <DRAlert
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
                                </DRAlert>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            }
            actions={
                <>
                    <UserDeleteButton />
                    <DRButtonFab
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
                        bottom={90}
                    >
                        {t("edit_password")}
                    </DRButtonFab>
                    <DRButtonFab
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
                    </DRButtonFab>
                </>
            }
        />
    );
}
