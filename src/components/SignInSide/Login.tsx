import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { handleInputChangeByFieldName } from 'Utility/UtilityComponenets';
import DRTextField from 'components/DRTextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doLogIn } from 'services/AuthService';

function Login() {
    let navigate = useNavigate();

    const [account, setAccount] = useState({ username: "", password: "" });

    const handelLogin = () => {
        doLogIn()
        navigate("/");
    };

    try {
        return (
            <>
                <DRTextField
                    fieldName="username"
                    label="Username"
                    onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                    variant="outlined"
                    margin="normal"
                    required
                    autoFocus
                />
                <DRTextField
                    fieldName="password"
                    label="Password"
                    onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, account, setAccount)}
                    variant="outlined"
                    margin="normal"
                    required
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