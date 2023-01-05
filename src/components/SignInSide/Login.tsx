import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useState } from 'react';
import AuthService from 'services/AuthService';

const users = [

    { username: "ankur", password: "123456", type: "buyer" },
    { username: "Soap_McTive", password: "23449$#@!", type: "seller" }

];

function Login(props: any) {

    const [account, setAccount] = useState({ username: "", password: "" });

    const handelAccount = (property: "username" | "password", event: any) => {

        const accountCopy = { ...account };
        accountCopy[property] = event.target.value;

        setAccount(accountCopy);

    }

    const isVarifiedUser = (username: string, password: string) => {

        return users.find((user) => user.username === username && user.password === password);

    };

    const handelLogin = () => {
        if (isVarifiedUser(account.username, account.password)) {
            AuthService.doLogIn(account.username);
            setAccount({ username: "", password: "" });
            props.history.push("/home");

        }
    };

    try {
        return (
            <>
                <TextField
                    onChange={(event: any) => handelAccount("username", event)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
                />
                <TextField
                    onChange={(event: any) => handelAccount("password", event)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
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