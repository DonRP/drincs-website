import { Avatar, Box, CssBaseline, Grid, Link, Paper } from "@mui/material";
import Login from "components/SignInSide/Login";
import SignUp from "components/SignInSide/SignUp";
import { useState } from "react";
import AuthService, { isLoggedIn } from "services/AuthService";
import Copyright from "./components/Copyright";

export type ISignInSidePageProps = {
    authService: AuthService
}

function SignInSide() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const authService = new AuthService();

    return (
        <Grid container component="main"
            style={{
                height: "100vh",
                backgroundImage: `url(https://raw.githubusercontent.com/DonRP/ABFD/master/game/gui/main_menu.webp)`,
                backgroundColor: "##000",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                // backgroundColor:
                //   theme.palette.type === "light"
                //     ? theme.palette.grey[50]
                //     : theme.palette.grey[900],

                marginTop: '-72px',
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
                        src="logo512.png"
                        sizes="large"
                        sx={{ width: 56, height: 56, marginBottom: 2 }}
                    />


                    {isLoggedIn() ? "You are already logged in" :
                        <>
                            {isLogin ? <Login authService={authService} /> : <SignUp authService={authService} />}
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
                        </>
                    }

                    <Box
                        mt={3}
                    >
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
}

export default SignInSide;
