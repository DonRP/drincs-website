import GitHub from "@mui/icons-material/GitHub";
import { Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import AuthService from "services/AuthService";
import Copyright from "./components/Copyright";

const users = [

    { username: "ankur", password: "123456", type: "buyer" },
    { username: "Soap_McTive", password: "23449$#@!", type: "seller" }

];

export default function SignInSide(props: any) {

    if (AuthService.isLoggedIn()) {

        props.history.push("./home");

    }

    const [account, setAccount] = React.useState({ username: "", password: "" });

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

    return (
        <Grid container component="main"
            style={{
                height: "100vh",
                // backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                // backgroundColor:
                //   theme.palette.type === "light"
                //     ? theme.palette.grey[50]
                //     : theme.palette.grey[900],

                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <CssBaseline />
            <Grid
                // style={{
                //     display: "flex",
                //     flexDirection: "column",
                // }}
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={1}
                square
                justifyContent="center"
                alignItems="center"
                padding={5}
            >
                <div
                    style={{
                        // margin: theme.spacing(2, 6),
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar
                        style={{
                            marginBottom: 20,
                            // backgroundColor: theme.palette.secondary.main
                        }}
                    >
                        <GitHub />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form
                        style={{
                            width: "100%", // Fix IE 11 issue.
                            marginTop: 10
                        }}
                        noValidate
                    >
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
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box
                            mt={3}
                        >
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
