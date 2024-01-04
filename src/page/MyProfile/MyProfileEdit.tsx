import { Stack } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import { DRButtonNoMargin } from 'components/DRButton';
import DRTextField from 'components/DRTextField';
import { UserProfile } from 'model/Auth/UserProfile';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetProfileCache } from 'use_query/useGetUser';
import { showToast } from 'utility/ShowToast';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';
import MyProfileCard from './MyProfileCard';

export default function MyProfileEdit() {
    const { t } = useTranslation(["translation"]);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const {
        data = new UserProfile(),
    } = useGetProfileCache({
        catch: (err) => {
            showToast(t("get_user_profile_error"), "error", enqueueSnackbar)
        },
    })
    const [userInfo, setUserInfo] = useState<UserProfile>(data)

    return (
        <MyProfileCard
            title={
                <>
                    <Typography level="title-md">
                        {t("edit")}
                    </Typography>
                    <Typography level="body-sm">
                        {t("my_profile_info")}
                    </Typography>
                </>
            }
            body={
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <DRTextField
                        fieldName="displayName"
                        label={t("username")}
                        value={userInfo.displayName}
                        onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, userInfo, setUserInfo)}
                        required
                    />
                    <DRTextField
                        fieldName="email"
                        label={t("email")}
                        value={userInfo.email}
                        onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, userInfo, setUserInfo)}
                        type='email'
                        required
                    />
                </Stack>
            }
            actions={
                <>
                    <DRButtonNoMargin
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        sx={{
                            whitespace: "nowrap",
                            minWidth: "max-content"
                        }}
                        onClick={() => {
                            navigate("/profile");
                        }}
                    >
                        {t("cancel")}
                    </DRButtonNoMargin>
                    <DRButtonNoMargin
                        size="sm"
                        variant="solid"
                        sx={{
                            whitespace: "nowrap",
                            minWidth: "max-content"
                        }}
                    >
                        {t("save")}
                    </DRButtonNoMargin>
                </>
            }
        />
    );
}
