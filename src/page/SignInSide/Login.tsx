import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import KeyIcon from '@mui/icons-material/Key';
import { Grid, Link, Typography } from '@mui/joy';
import { DRButtonSignInSide } from 'components/DRButton';
import DRErrorComponent from 'components/DRErrorComponent';
import DRTextField, { DRTextFieldPassword } from 'components/DRTextField';
import HomeFunctionContext from 'contexts/HomeFunctionContext';
import { LoginAccount } from 'model/Auth/LoginAccount';
import { ISignInSidePageProps } from 'page/SignInSide';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { checkIfIsValidEmail } from 'utility/EmailPasswordUtility';
import { showToast, showToastByMyError } from 'utility/ShowToast';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';
import { isEmptyOrSpaces } from 'utility/UtilityFunctionts';
import DRCheckBox from '../../components/DRCheckbox';
import OltherLoginButton from './OltherLoginButton';

function Login(props: ISignInSidePageProps) {
    const [account, setAccount] = useState<LoginAccount>(new LoginAccount());
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [rememberMe, setRememberMe] = useState<boolean>(true)
    const [openChangePassword, setOpenChangePassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { authService, enqueueSnackbar, onClose } = props;
    const { t } = useTranslation(["translation"]);
    const [notValidEmail, setNotValidEmail] = useState<boolean>(false)
    const homeFunction = useContext(HomeFunctionContext)

    const validateLogin = (account: LoginAccount): string[] => {
        let fields = [];
        if (!account.email || notValidEmail) {
            fields.push('email')
            setNotValidEmail(true)
        }
        if (isEmptyOrSpaces(account.password)) {
            fields.push("password")
        }
        return fields;
    }

    const validateForgotPassword = (account: LoginAccount): string[] => {
        let fields = [];
        if (!account.email || notValidEmail) {
            fields.push('email')
            setNotValidEmail(true)
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
                homeFunction.updateAccountEvent()
            }).catch((err) => {
                showToastByMyError(err, enqueueSnackbar, t)
                setLoading(false)
            })
        }
        else {
            setLoading(false)
        }
    };

    const handelForgotPassword = () => {
        setLoading(true)
        let errorFields = validateForgotPassword(account)
        setErrorFields(errorFields)
        if (errorFields.length === 0) {
            authService.forgotPassword(account.email).then(res => {
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
                        onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                        variant="outlined"
                        type='email'
                        required
                        autoFocus
                        errorFields={errorFields}
                        startDecorator={<EmailRoundedIcon />}
                        addHelperMarginIfIsHidden
                        helperText={notValidEmail ? t('invalid_email') : ''}
                        error={notValidEmail}
                        onBlurGeneric={(fieldName, value) => {
                            if (value && !checkIfIsValidEmail(account.email)) {
                                setNotValidEmail(true)
                            }
                            else {
                                setNotValidEmail(false)
                            }
                        }}
                    />
                    <DRTextFieldPassword
                        fieldName="password"
                        label={t("password")}
                        defaultValue={account.password}
                        onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                        variant="outlined"
                        required
                        errorFields={errorFields}
                        startDecorator={<KeyIcon />}
                        addHelperMarginIfIsHidden
                        onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                handelLogin()
                            }
                        }}
                    />
                    <DRCheckBox
                        fieldName="rememberMe"
                        label={t("remember_me")}
                        checked={rememberMe}
                        onChangeGeneric={(fieldName, value) => {
                            if (value === null) {
                                value = false
                            }
                            setRememberMe(value)
                        }}
                    />
                    <DRButtonSignInSide
                        onClick={handelLogin}
                        loading={loading}
                    >
                        {t("sign_in")}
                    </DRButtonSignInSide>
                    <OltherLoginButton />
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
                        onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                        variant="outlined"
                        type='email'
                        required
                        autoFocus
                        errorFields={errorFields}
                        startDecorator={<EmailRoundedIcon />}
                        addHelperMarginIfIsHidden
                        error={notValidEmail}
                        helperText={notValidEmail ? t('invalid_email') : ''}
                        onBlurGeneric={(fieldName, value) => {
                            if (value && !checkIfIsValidEmail(account.email)) {
                                setNotValidEmail(true)
                            }
                            else {
                                setNotValidEmail(false)
                            }
                        }}
                    />
                    <DRButtonSignInSide
                        onClick={handelForgotPassword}
                        loading={loading}
                    >
                        {t("send_mail")}
                    </DRButtonSignInSide>
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