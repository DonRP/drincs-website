import { Grid, Link, Typography } from '@mui/joy';
import DRErrorComponent from 'components/DRErrorComponent';
import DRTextField from 'components/DRTextField';
import { LoginAccount } from 'model/Auth/LoginAccount';
import { ISignInSidePageProps } from 'page/SignInSide';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'services/BaseRestService';
import { showToast, showToastByMyError } from 'utility/ShowToast';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';
import { isEmptyOrSpaces } from 'utility/UtilityFunctionts';
import DRCheckBox from '../DRCheckbox';
import DRButtonSignInSide from './DRButtonSignInSide';

function Login(props: ISignInSidePageProps) {
    var validator = require('validator');
    const [account, setAccount] = useState<LoginAccount>(new LoginAccount());
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [rememberMe, setRememberMe] = useState<boolean>(true)
    const [openChangePassword, setOpenChangePassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { authService, enqueueSnackbar, onClose } = props;
    const { t } = useTranslation(["translation"]);

    const validateLogin = (account: LoginAccount): string[] => {
        let fields = [];
        if (isEmptyOrSpaces(account.email)) {
            fields.push("email")
        }
        if (isEmptyOrSpaces(account.password)) {
            fields.push("password")
        }
        if (!validator.isEmail(account.email)) {
            fields.push("email")
            showMessage(enqueueSnackbar, t("invalid_email"), 'error');
        }
        return fields;
    }

    const validateResetPassword = (account: LoginAccount): string[] => {
        let fields = [];
        if (isEmptyOrSpaces(account.email)) {
            fields.push("email")
        }
        if (!validator.isEmail(account.email)) {
            fields.push("email")
            showMessage(enqueueSnackbar, t("invalid_email"), 'error');
        }
        return fields;
    }

    const handelLogin = () => {
        setLoading(true)
        let errorFields = validateLogin(account)
        setErrorFields(errorFields)
        if (errorFields.length === 0) {
            authService.doLogIn(account, rememberMe).then(res => {
                if (res) {
                    onClose()
                }
                setLoading(false)
            }).catch((err) => {
                showToastByMyError(err, enqueueSnackbar, t)
                setLoading(false)
            })
        }
        else {
            setLoading(false)
        }
    };

    const handelResetPassword = () => {
        setLoading(true)
        let errorFields = validateResetPassword(account)
        setErrorFields(errorFields)
        if (errorFields.length === 0) {
            authService.resetPassword(account.email).then(res => {
                if (res) {
                    showToast(t("success_send_mail_for_reset_password"), 'success', enqueueSnackbar)
                    setOpenChangePassword(false)
                }
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                showToastByMyError(err, enqueueSnackbar, t)
            })
        }
        else {
            setLoading(false)
        }
    };

    try {
        return (
            <>
                {!openChangePassword && <>
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid>
                            <Typography
                                component="h1"
                            >
                                {t("sign_in")}
                            </Typography>
                        </Grid>
                    </Grid>
                    <DRTextField
                        fieldName="email"
                        label={t("email")}
                        defaultValue={account.email}
                        onChange={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                        variant="outlined"
                        type='email'
                        required
                        autoFocus
                        errorFields={errorFields}
                    />
                    <DRTextField
                        fieldName="password"
                        label={t("password")}
                        defaultValue={account.password}
                        onChange={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                        variant="outlined"
                        type='password'
                        required
                        errorFields={errorFields}
                    />
                    <DRCheckBox
                        fieldName="rememberMe"
                        label={t("remember_me")}
                        checked={rememberMe}
                        onChangeValue={(fieldName, value) => setRememberMe(value)}
                    />
                    <DRButtonSignInSide
                        label={t("sign_in")}
                        onClick={handelLogin}
                        loading={loading}
                    />
                </>}
                {openChangePassword && <>
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid>
                            <Typography
                                component="h1"
                            >
                                {t("reset_password")}
                            </Typography>
                        </Grid>
                    </Grid>
                    <DRTextField
                        fieldName="email"
                        label={t("email")}
                        defaultValue={account.email}
                        onChange={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                        variant="outlined"
                        type='email'
                        required
                        autoFocus
                        errorFields={errorFields}
                    />
                    <DRButtonSignInSide
                        label={t("send_mail")}
                        onClick={handelResetPassword}
                        loading={loading}
                    />
                </>}
                <Typography
                    mt={0.5}
                    endDecorator={<Link
                        onClick={() => { setOpenChangePassword((value) => !value) }}
                    >
                        {openChangePassword ? t("back_to_sign_in") : t("reset_password")}
                    </Link>}
                    fontSize="sm"
                >
                    {openChangePassword ? t("do_have_account") : t("forgot_password")}
                </Typography>
            </>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"Login"} />
    }
}

export default Login;