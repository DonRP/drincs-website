import { Grid, Typography } from '@mui/joy';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DRButtonSignInSide } from '../../components/DRButton';
import DRTextField, { DRTextFieldPassword } from '../../components/DRTextField';
import { NewAccountRecord } from '../../model/Auth/NewAccountRecord';
import { checkIfIsValidEmail, checkIfIsValidPassword } from '../../utility/EmailPasswordUtility';
import { showToastByMyError } from '../../utility/ShowToast';
import { handleInputChangeByFieldName } from '../../utility/UtilityComponenets';
import { isEmptyOrSpaces } from '../../utility/UtilityFunctionts';
import { ISignInSidePageProps } from '../SignInSide';
import OltherLoginButton from './OltherLoginButton';

interface IPros extends ISignInSidePageProps {
    setEmailVerification: (value: boolean) => void
}

function SignUp(props: IPros) {
    const [account, setAccount] = useState<NewAccountRecord>(new NewAccountRecord());
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [notValidEmail, setNotValidEmail] = useState<boolean>(false)
    const [notValidPassword, setNotValidPassword] = useState<boolean>(false)
    const {
        authService,
        enqueueSnackbar,
        setEmailVerification,
    } = props;
    const { t } = useTranslation(["translation"]);

    const validateSignUp = (account: NewAccountRecord): string[] => {
        let fields = [];
        if (isEmptyOrSpaces(account.email) || notValidEmail) {
            fields.push('email')
            setNotValidEmail(true)
        }
        if (isEmptyOrSpaces(account.password) || notValidPassword) {
            fields.push("password")
            setNotValidPassword(true)
        }
        if (isEmptyOrSpaces(account.displayName)) {
            fields.push("displayName")
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
                onChangeGeneric={(fieldName, value) => {
                    handleInputChangeByFieldName(fieldName, value, account, setAccount)
                    setNotValidPassword(!checkIfIsValidPassword(value as string))
                }}
                variant="outlined"
                required
                fullWidth
                autoComplete="current-password"
                errorFields={errorFields}
                error={notValidPassword}
                helperText={t('password_helper')}
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

            <OltherLoginButton />
        </>
    );
}

export default SignUp;