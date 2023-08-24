import { Avatar, Box, Card, Grid, Link } from "@mui/joy";
import Login from "components/SignInSide/Login";
import SignUp from "components/SignInSide/SignUp";
import { OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar } from "notistack";
import { useState } from "react";
import AuthService, { isLoggedIn } from "services/AuthService";
import { analyticPageView } from "utility/Analytics";
import Copyright from "../components/Copyright";

export type ISignInSidePageProps = {
    authService: AuthService,
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
}

function SignInSide() {
    analyticPageView("SignInSide")

    const [isLogin, setIsLogin] = useState<boolean>(true);
    const { enqueueSnackbar } = useSnackbar();
    const authService = new AuthService(enqueueSnackbar);

    return (
        <Grid
            container
            component="main"
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
            <Card
                sx={{
                    maxWidth: 600,
                    width: "100%",
                }}
            >
                <Grid container
                    direction="column"
                    // xs={12}
                    // sm={8}
                    // md={5}
                    // elevation={1}
                    // square
                    justifyContent="center"
                    alignItems="center"
                // padding={5}
                >
                    <Grid>
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
                                size="lg"
                                sx={{ width: 56, height: 56, marginBottom: 2 }}
                            />


                            {isLoggedIn() &&
                                "You are already logged in"
                            }
                        </div>
                    </Grid>
                    {!isLoggedIn() &&
                        <Grid
                            container
                        >
                            <Grid>
                                {isLogin ?
                                    <Login authService={authService} enqueueSnackbar={enqueueSnackbar} /> :
                                    <SignUp authService={authService} enqueueSnackbar={enqueueSnackbar} />
                                }
                            </Grid>
                            <Grid>
                                <Link
                                    onClick={() => {
                                        setIsLogin(!isLogin)
                                    }}
                                >
                                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                    }
                    <Box
                        mt={3}
                    >
                        <Copyright />
                    </Box>
                </Grid>
            </Card>
        </Grid>
    );
}

export default SignInSide;
