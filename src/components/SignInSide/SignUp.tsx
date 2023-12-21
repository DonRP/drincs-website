import EmailIcon from '@mui/icons-material/Email';
import { Grid, Typography } from '@mui/joy';
import { DRButtonSignInSide } from 'components/DRButton';
import DRTextField from "components/DRTextField";
import { NewAccountRecord } from "model/Auth/NewAccountRecord";
import { ISignInSidePageProps } from 'page/SignInSide';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'services/BaseRestService';
import { showToastByMyError } from 'utility/ShowToast';
import { handleInputChangeByFieldName } from "utility/UtilityComponenets";
import { isEmptyOrSpaces } from 'utility/UtilityFunctionts';

function SignUp(props: ISignInSidePageProps) {
    var validator = require('validator');
    const [account, setAccount] = useState<NewAccountRecord>(new NewAccountRecord());
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [emailVerification, setEmailVerification] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { authService, enqueueSnackbar } = props;
    const { t } = useTranslation(["translation"]);

    const validateSignUp = (account: NewAccountRecord): string[] => {
        let fields = [];
        if (isEmptyOrSpaces(account.email)) {
            fields.push("email")
        }
        if (isEmptyOrSpaces(account.password)) {
            fields.push("password")
        }
        if (isEmptyOrSpaces(account.displayName)) {
            fields.push("displayName")
        }
        if (!validator.isEmail(account.email)) {
            fields.push("email")
            showMessage(enqueueSnackbar, t("invalid_email"), 'error');
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
            }).catch((err) => {
                setLoading(false)
                showToastByMyError(err, enqueueSnackbar, t)
            })
        }
        else {
            setLoading(false)
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
                            {t("sign_up")}
                        </Typography>
                    </Grid>
                </Grid>
                <DRTextField
                    fieldName="displayName"
                    label={t("username")}
                    defaultValue={account.displayName}
                    onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                    variant="outlined"
                    required
                    autoFocus
                    errorFields={errorFields}
                />
                <DRTextField
                    fieldName="email"
                    label={t("email")}
                    defaultValue={account.email}
                    onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                    variant="outlined"
                    required
                    fullWidth
                    autoComplete="email"
                    type='email'
                    errorFields={errorFields}
                />
                <DRTextField
                    fieldName="password"
                    label={t("password")}
                    defaultValue={account.password}
                    onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                    variant="outlined"
                    type='password'
                    required
                    fullWidth
                    autoComplete="current-password"
                    errorFields={errorFields}
                />
                {/* // TODO: To Implement  */}
                {/* <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
                <DRButtonSignInSide
                    onClick={handelSignUp}
                    loading={loading}
                >
                    {t("sign_up")}
                </DRButtonSignInSide>
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
                    {t("verification_mail_sent")}
                </Typography>
            </>
        )
    }
}

export default SignUp;