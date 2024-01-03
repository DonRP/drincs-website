import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import DRTextField from 'components/DRTextField';
import { UserProfile } from 'model/Auth/UserProfile';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetProfileCache } from 'use_query/useGetUser';
import { showToastByMyError } from 'utility/ShowToast';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';

export default function MyProfile() {
    const { t } = useTranslation(["translation"]);
    const { enqueueSnackbar } = useSnackbar();
    const [errorFields, setErrorFields] = useState<string[]>([])
    const {
        isLoading,
        data: userInfo = new UserProfile(),
    } = useGetProfileCache({
        then: (res) => {
            if (res) {
                setUserInfo(res)
            }
        },
        catch: (err) => {
            showToastByMyError(t("get_user_profile_error"), enqueueSnackbar, t)
        },
    })
    const [_, setUserInfo] = useState<UserProfile>(userInfo)

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <Card>
                    <Box sx={{ mb: 1 }}>
                        <Typography level="title-md">Personal info</Typography>
                        <Typography level="body-sm">
                            Customize how your profile information will apper to the networks.
                        </Typography>
                    </Box>
                    <Divider />
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{ my: 1 }}
                    >
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
                            <IconButton
                                aria-label="upload new picture"
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
                            </IconButton>
                        </Stack>
                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                            <DRTextField
                                fieldName="displayName"
                                label={t("username")}
                                value={userInfo.displayName}
                                onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, userInfo, setUserInfo)}
                                variant="outlined"
                                required
                                errorFields={errorFields}
                                disabled={isLoading}
                            />
                            <DRTextField
                                fieldName="email"
                                label={t("email")}
                                value={userInfo.email}
                                onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, userInfo, setUserInfo)}
                                variant="outlined"
                                type='email'
                                required
                                errorFields={errorFields}
                                startDecorator={<EmailRoundedIcon />}
                                disabled={isLoading}
                            />
                        </Stack>
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button size="sm" variant="outlined" color="neutral">
                                Cancel
                            </Button>
                            <Button size="sm" variant="solid">
                                Save
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Stack>
        </Box>
    );
}
