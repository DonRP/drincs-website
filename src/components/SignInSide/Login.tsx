import { Grid, Link, Typography, useTheme } from '@mui/material';
import { ISignInSidePageProps } from 'SignInSide';
import DRLoadingButton from 'components/DRLoadingButton';
import DRTextField from 'components/DRTextField';
import { LoginAccount } from 'model/Auth/LoginAccount';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showMessage } from 'services/BaseRestService';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';
import { isNullOrEmpty } from 'utility/UtilityFunctionts';
import DRCheckBox from '../DeltaCheckbox';

function Login(props: ISignInSidePageProps) {
    var validator = require('validator');
    const theme = useTheme();
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
            authService.resetPoassword(account.email).then(res => {
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
                    <Typography component="h1" variant="h5">
                        {"Sign in"}
                    </Typography>
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
                    <DRLoadingButton
                        titleButton='Sign In'
                        onClick={handelLogin}
                        loading={loading}
                    />
                </>}
                {openChangePassword && <>
                    <Typography component="h1" variant="h5">
                        {"Reset Password"}
                    </Typography>
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
                    <DRLoadingButton
                        titleButton='Send email'
                        onClick={handelResetPassword}
                        loading={loading}
                    />
                </>}

                <Grid container>
                    <Grid item>
                        <Link variant="body2"
                            onClick={() => {
                                setOpenChangePassword(!openChangePassword)
                            }}
                        >
                            {openChangePassword ? "Back to login" : "Forgot your password? Reset password"}
                        </Link>
                    </Grid>
                </Grid>
            </>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: theme.palette.error.main }}>Login error</div>
    }
}

export default Login;