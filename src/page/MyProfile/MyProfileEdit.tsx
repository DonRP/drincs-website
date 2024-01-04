import { Stack } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import { useQueryClient } from '@tanstack/react-query';
import { DRButtonNoMargin } from 'components/DRButton';
import DRTextField from 'components/DRTextField';
import { EditProfile } from 'model/Auth/EditProfile';
import { UserProfile } from 'model/Auth/UserProfile';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AuthService from 'services/AuthService';
import { GET_PROFILE_CACHE_KEY, useGetProfileCache } from 'use_query/useGetUser';
import { checkIfIsValidEmail } from 'utility/EmailUtility';
import { showToast, showToastByMyError } from 'utility/ShowToast';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';
import MyProfileCard from './MyProfileCard';

export default function MyProfileEdit() {
    const { t } = useTranslation(["translation"]);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const {
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
    const [notValidEmail, setNotValidEmail] = useState<boolean>(false)
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [isChanged, setIsChanged] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const handel = () => {
        setLoading(true)

        let fields = []
        if (!checkIfIsValidEmail(userInfo.email)) {
            fields.push('email')
        }
        if (!userInfo.displayName) {
            fields.push('displayName')
        }

        setErrorFields(fields)
        if (fields.length > 0) {
            setLoading(false)
            return
        }

        let service = new AuthService()
        let profile: EditProfile = {
            email: userInfo.email,
            displayName: userInfo.displayName,
        }
        return service.editProfile(profile).then((res) => {
            queryClient.invalidateQueries({ queryKey: [GET_PROFILE_CACHE_KEY] });
            setLoading(false)
            showToast(t('edit_success'), "success", enqueueSnackbar)
            navigate("/profile")
        }).catch((err) => {
            showToastByMyError(err, enqueueSnackbar, t)
            setLoading(false)
        })
    };

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
                        errorFields={errorFields}
                        onChangeGeneric={(fieldName, value) => {
                            handleInputChangeByFieldName(fieldName, value, userInfo, setUserInfo)
                            setIsChanged(true)
                        }}
                        required
                    />
                    <DRTextField
                        fieldName="email"
                        label={t("email")}
                        value={userInfo.email}
                        error={notValidEmail}
                        errorFields={errorFields}
                        onChangeGeneric={(fieldName, value) => {
                            handleInputChangeByFieldName(fieldName, value, userInfo, setUserInfo)
                            setIsChanged(true)
                        }}
                        onBlurGeneric={(fieldName, value) => {
                            if (value && !checkIfIsValidEmail(data.email)) {
                                setNotValidEmail(true)
                            }
                            else {
                                setNotValidEmail(false)
                            }
                        }}
                        addHelperMarginIfIsHidden
                        helperText={notValidEmail ? t('invalid_email') : ''}
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
                        disabled={!isChanged}
                        onClick={handel}
                        loading={loading}
                    >
                        {t("save")}
                    </DRButtonNoMargin>
                </>
            }
        />
    );
}
