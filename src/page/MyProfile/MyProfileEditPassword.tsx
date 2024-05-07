import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { Box } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DRButton from '../../components/DRButton';
import { DRTextFieldPassword } from '../../components/DRTextField';
import { EditPassword } from '../../model/Auth/EditPasswordBody';
import AuthService from '../../services/AuthService';
import { checkIfIsEqualPassword, checkIfIsValidPassword } from '../../utility/EmailPasswordUtility';
import { showToast, showToastByMyError } from '../../utility/ShowToast';
import { handleInputChangeByFieldName } from '../../utility/UtilityComponenets';
import MyProfileCard from './MyProfileCard';

export default function MyProfileEditPassword() {
    const { t } = useTranslation(["translation"]);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [data, setData] = useState<EditPassword>(new EditPassword())
    const [notValidPassword, setNotValidPassword] = useState<boolean>(false)
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [isChanged, setIsChanged] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [notEqualPassword, setNotEqualPassword] = useState<boolean>(!checkIfIsEqualPassword(data.password, data.repeatPassword))

    const handel = () => {
        setLoading(true)

        let fields = []
        if (!data.password) {
            fields.push("password")
        }
        if (!data.repeatPassword) {
            fields.push("repeatPassword")
        }

        if (fields.length > 0) {
            setErrorFields(fields)
            setLoading(false)
            return
        }

        if (!checkIfIsValidPassword(data.password)) {
            errorFields.push('password')
            setErrorFields(fields)
            setLoading(false)
            return
        }

        if (!checkIfIsEqualPassword(data.password, data.repeatPassword)) {
            errorFields.push("repeatPassword")
            setErrorFields(fields)
            setLoading(false)
            return
        }

        setErrorFields(fields)

        let service = new AuthService()
        return service.changePassword(data).then((res) => {
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
                <Box sx={{ flexGrow: 1 }}>
                    <DRTextFieldPassword
                        fieldName="password"
                        label={t('password')}
                        value={data.password}
                        required
                        error={notValidPassword}
                        errorFields={errorFields}
                        onChangeGeneric={(fieldName, value) => {
                            handleInputChangeByFieldName(fieldName, value, data, setData)
                            setNotEqualPassword(!checkIfIsEqualPassword(value as string, data.repeatPassword))
                            setNotValidPassword(!checkIfIsValidPassword(value as string))
                            setIsChanged(true)
                        }}
                        helperText={t('password_helper')}
                        sx={{ mb: 2 }}
                    />
                    <DRTextFieldPassword
                        fieldName="repeatPassword"
                        label={t('repeat_password')}
                        value={data.repeatPassword}
                        required
                        errorFields={errorFields}
                        onChangeGeneric={(fieldName, value) => {
                            handleInputChangeByFieldName(fieldName, value, data, setData)
                            setNotEqualPassword(!checkIfIsEqualPassword(value as string, data.password))
                            setIsChanged(true)
                        }}
                        helperText={notEqualPassword ? t('password_not_equal') : ""}
                        error={notEqualPassword}
                        addHelperMarginIfIsHidden
                    />
                </Box>
            }
            actions={
                <>
                    <DRButton
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
                        startDecorator={<UndoIcon />}
                    >
                        {t("cancel")}
                    </DRButton>
                    <DRButton
                        size="sm"
                        variant="solid"
                        sx={{
                            whitespace: "nowrap",
                            minWidth: "max-content"
                        }}
                        disabled={!isChanged}
                        onClick={handel}
                        loading={loading}
                        startDecorator={<SaveIcon />}
                    >
                        {t("save")}
                    </DRButton>
                </>
            }
        />
    );
}
