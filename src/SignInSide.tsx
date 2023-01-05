import GitHub from "@mui/icons-material/GitHub";
import { Avatar, Box, CssBaseline, Grid, Link, Paper, Typography } from "@mui/material";
import Login from "components/SignInSide/Login";
import SignUp from "components/SignInSide/SignUp";
import { useState } from "react";
import AuthService from "services/AuthService";
import Copyright from "./components/Copyright";

function SignInSide(props: any) {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    if (AuthService.isLoggedIn()) {
        props.history.push("./home");
    }

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
                        {isLogin ? "Sign in" : "Sign up"}
                    </Typography>
                    <form
                        style={{
                            width: "100%", // Fix IE 11 issue.
                            marginTop: 10
                        }}
                        noValidate
                    >
                        {isLogin ? <Login /> : <SignUp />}
                        <Grid container>
                            <Grid item>
                                <Link variant="body2"
                                    onClick={() => {
                                        setIsLogin(!isLogin)
                                    }}
                                >
                                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign in"}
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

export default SignInSide;
