import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { handleInputChangeByFieldName } from 'Utility/UtilityComponenets';
import { isNullOrEmpty } from 'Utility/UtilityFunctionts';
import DRTextField from 'components/DRTextField';
import { LoginAccount } from 'model/Auth/LoginAccount';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doLogIn } from 'services/AuthService';

function Login() {
    let navigate = useNavigate();

    const [account, setAccount] = useState<LoginAccount>(new LoginAccount());
    const [errorFields, setErrorFields] = useState<string[]>([])

    const validateLogin = (account: LoginAccount): string[] => {
        let fields = [];
        if (isNullOrEmpty(account.email)) {
            fields.push("email")
        }
        if (isNullOrEmpty(account.password)) {
            fields.push("password")
        }
        return fields;
    }

    const handelLogin = () => {
        let errorFields = validateLogin(account)
        setErrorFields(errorFields)
        if (errorFields.length === 0) {
            doLogIn()
            navigate("/");
        }
        else {
            // TODO: errore
        }
    };

    try {
        return (
            <>
                <DRTextField
                    fieldName="email"
                    label="Email"
                    onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                    variant="outlined"
                    margin="normal"
                    required
                    autoFocus
                    errorFields={errorFields}
                />
                <DRTextField
                    fieldName="password"
                    label="Password"
                    onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                    variant="outlined"
                    margin="normal"
                    required
                    errorFields={errorFields}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handelLogin}
                    style={{
                        marginTop: 20,
                        marginBottom: 10,
                        marginLeft: 2,
                        marginRight: 2,
                    }}
                >
                    Sign In
                </Button>
            </>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>Login error</div>
    }
}

export default Login;