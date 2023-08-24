import EmailIcon from '@mui/icons-material/Email';
import { Grid, Typography } from '@mui/joy';
import DRTextField from "components/DRTextField";
import { NewAccountRecord } from "model/Auth/NewAccountRecord";
import { ISignInSidePageProps } from 'page/SignInSide';
import { useState } from 'react';
import { showMessage } from 'services/BaseRestService';
import { handleInputChangeByFieldName } from "utility/UtilityComponenets";
import { isNullOrEmpty } from 'utility/UtilityFunctionts';
import DRButtonSignInSide from './DRButtonSignInSide';

function SignUp(props: ISignInSidePageProps) {
    var validator = require('validator');
    const [account, setAccount] = useState<NewAccountRecord>(new NewAccountRecord());
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [emailVerification, setEmailVerification] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { authService, enqueueSnackbar } = props;

    const validateSignUp = (account: NewAccountRecord): string[] => {
        let fields = [];
        if (isNullOrEmpty(account.email)) {
            fields.push("email")
        }
        if (isNullOrEmpty(account.password)) {
            fields.push("password")
        }
        if (isNullOrEmpty(account.displayName)) {
            fields.push("displayName")
        }
        if (!validator.isEmail(account.email)) {
            fields.push("email")
            showMessage(enqueueSnackbar, "The email is invalid", 'error');
        }
        return fields;
    }

    const handelSignUp = () => {
        setLoading(true)
        let errorFields = validateSignUp(account)
        setErrorFields(errorFields)
        if (errorFields.length === 0) {
            authService.signUp(account).then(res => {
                if (res) {
                    setEmailVerification(true)
                }
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
        }
    };

    if (!emailVerification) {
        return (
            <>
                <Grid container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid>
                        <Typography
                            component="h1"
                        >
                            {"Sign up"}
                        </Typography>
                    </Grid>
                </Grid>
                <DRTextField
                    fieldName="displayName"
                    label="Username"
                    defaultValue={account.displayName}
                    onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                    variant="outlined"
                    required
                    autoFocus
                    margin="normal"
                    errorFields={errorFields}
                />
                <DRTextField
                    fieldName="email"
                    label="Email Address"
                    defaultValue={account.email}
                    onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                    variant="outlined"
                    required
                    fullWidth
                    autoComplete="email"
                    type='email'
                    margin="normal"
                    errorFields={errorFields}
                />
                <DRTextField
                    fieldName="password"
                    label="Password"
                    defaultValue={account.password}
                    onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                    variant="outlined"
                    type='password'
                    required
                    fullWidth
                    autoComplete="current-password"
                    margin="normal"
                    errorFields={errorFields}
                />
                {/* // TODO: To Implement  */}
                {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
            /> */}
                <DRButtonSignInSide
                    title='Sign Up'
                    onClick={handelSignUp}
                    loading={loading}
                />
            </>
        );
    }
    else {
        return (
            <>
                <EmailIcon fontSize='large' color='action'
                    style={{
                        marginTop: 50,
                        // backgroundColor: theme.palette.secondary.main
                    }}
                />
                <Typography marginBottom={10} marginTop={1}>
                    A verification email was sent.
                </Typography>
            </>
        )
    }
}

export default SignUp;