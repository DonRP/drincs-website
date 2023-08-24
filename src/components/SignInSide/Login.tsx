import { Grid, Link, Typography } from '@mui/joy';
import DRErrorComponent from 'components/DRErrorComponent';
import DRTextField from 'components/DRTextField';
import { LoginAccount } from 'model/Auth/LoginAccount';
import { ISignInSidePageProps } from 'page/SignInSide';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showMessage } from 'services/BaseRestService';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';
import { isNullOrEmpty } from 'utility/UtilityFunctionts';
import DRCheckBox from '../DRCheckbox';
import DRButtonSignInSide from './DRButtonSignInSide';

function Login(props: ISignInSidePageProps) {
    var validator = require('validator');
    let navigate = useNavigate();
    const [account, setAccount] = useState<LoginAccount>(new LoginAccount());
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [rememberMe, setRememberMe] = useState<boolean>(true)
    const [openChangePassword, setOpenChangePassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { authService, enqueueSnackbar } = props;

    const validateLogin = (account: LoginAccount): string[] => {
        let fields = [];
        if (isNullOrEmpty(account.email)) {
            fields.push("email")
        }
        if (isNullOrEmpty(account.password)) {
            fields.push("password")
        }
        if (!validator.isEmail(account.email)) {
            fields.push("email")
            showMessage(enqueueSnackbar, "The email is invalid", 'error');
        }
        return fields;
    }

    const validateResetPassword = (account: LoginAccount): string[] => {
        let fields = [];
        if (isNullOrEmpty(account.email)) {
            fields.push("email")
        }
        if (!validator.isEmail(account.email)) {
            fields.push("email")
            showMessage(enqueueSnackbar, "The email is invalid", 'error');
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
                    navigate("/");
                }
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
        }
    };

    const handelResetPassword = () => {
        setLoading(true)
        let errorFields = validateResetPassword(account)
        setErrorFields(errorFields)
        if (errorFields.length === 0) {
            authService.resetPassword(account.email).then(res => {
                if (res) {
                    setOpenChangePassword(false)
                }
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
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
                                {"Sign in"}
                            </Typography>
                        </Grid>
                    </Grid>
                    <DRTextField
                        fieldName="email"
                        label="Email"
                        defaultValue={account.email}
                        onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                        variant="outlined"
                        margin="normal"
                        type='email'
                        required
                        autoFocus
                        errorFields={errorFields}
                    />
                    <DRTextField
                        fieldName="password"
                        label="Password"
                        defaultValue={account.password}
                        onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                        variant="outlined"
                        margin="normal"
                        type='password'
                        required
                        errorFields={errorFields}
                    />
                    <DRCheckBox
                        fieldName="rememberMe"
                        label={"Remember me"}
                        checked={rememberMe}
                        onChangeValue={(fieldName, value) => setRememberMe(value)}
                    />
                    <DRButtonSignInSide
                        title='Sign In'
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
                                {"Reset Password"}
                            </Typography>
                        </Grid>
                    </Grid>
                    <DRTextField
                        fieldName="email"
                        label="Email"
                        defaultValue={account.email}
                        onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                        variant="outlined"
                        margin="normal"
                        type='email'
                        required
                        autoFocus
                        errorFields={errorFields}
                    />
                    <DRButtonSignInSide
                        title='Send email'
                        onClick={handelResetPassword}
                        loading={loading}
                    />
                </>}

                <Link
                    onClick={() => {
                        setOpenChangePassword(!openChangePassword)
                    }}
                >
                    {openChangePassword ? "Back to login" : "Forgot your password? Reset password"}
                </Link>
            </>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"Login"} />
    }
}

export default Login;