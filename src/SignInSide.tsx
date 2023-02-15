import GitHub from "@mui/icons-material/GitHub";
import { Avatar, Box, CssBaseline, Grid, Link, Paper, Typography } from "@mui/material";
import Login from "components/SignInSide/Login";
import SignUp from "components/SignInSide/SignUp";
import { useState } from "react";
import { isLoggedIn } from "services/AuthService";
import Copyright from "./components/Copyright";

function SignInSide() {
    const [isLogin, setIsLogin] = useState<boolean>(true);

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
                        style={{
                            marginBottom: 20,
                            // backgroundColor: theme.palette.secondary.main
                        }}
                    >
                        <GitHub />
                    </Avatar>


                    {isLoggedIn() ? "You are already logged in" :
                        <>
                            <Typography component="h1" variant="h5">
                                {isLogin ? "Sign in" : "Sign up"}
                            </Typography>
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
