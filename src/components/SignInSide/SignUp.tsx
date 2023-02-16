import EmailIcon from '@mui/icons-material/Email';
import { Button, Typography } from "@mui/material";
import { handleInputChangeByFieldName } from "Utility/UtilityComponenets";
import { isNullOrEmpty } from 'Utility/UtilityFunctionts';
import DRTextField from "components/DRTextField";
import { NewAccountRecord } from "model/Auth/NewAccountRecord";
import { useState } from 'react';

function SignUp() {
    const [account, setAccount] = useState<NewAccountRecord>(new NewAccountRecord());
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [emailVerification, setEmailVerification] = useState<boolean>(false)

    const validateLogin = (account: NewAccountRecord): string[] => {
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
        return fields;
    }

    const handelSignUp = () => {
        let errorFields = validateLogin(account)
        setErrorFields(errorFields)
        if (errorFields.length === 0) {
            setEmailVerification(true)
        }
    };

    if (!emailVerification) {
        return (
            <>
                <DRTextField
                    fieldName="displayName"
                    label="Username"
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
                    onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                    variant="outlined"
                    required
                    fullWidth
                    autoComplete="email"
                    margin="normal"
                    errorFields={errorFields}
                />
                <DRTextField
                    fieldName="password"
                    label="Password"
                    onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                    variant="outlined"
                    required
                    fullWidth
                    id="password"
                    autoComplete="current-password"
                    margin="normal"
                    errorFields={errorFields}
                />
                {/* // TODO: To Implement  */}
                {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
            /> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handelSignUp}
                    style={{
                        marginTop: 20,
                        marginBottom: 10,
                        marginLeft: 2,
                        marginRight: 2,
                    }}
                >
                    Sign Up
                </Button>
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