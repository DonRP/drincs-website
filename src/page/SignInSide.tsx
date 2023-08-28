import { Avatar, CssVarsProvider, Grid, Link, Sheet, Typography } from "@mui/joy";
import Copyright from "components/Copyright";
import Login from "components/SignInSide/Login";
import SignUp from "components/SignInSide/SignUp";
import { OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar } from "notistack";
import { useState } from "react";
import AuthService, { isLoggedIn } from "services/AuthService";
import { analyticPageView } from "utility/Analytics";

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
        <CssVarsProvider>
            <main>
                <Sheet
                    sx={{
                        maxWidth: 500,
                        mx: 'auto', // margin left & right
                        my: 4, // margin top & bottom
                        py: 3, // padding top & bottom
                        px: 2, // padding left & right
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    variant="outlined"
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
                    {isLogin ?
                        <Login authService={authService} enqueueSnackbar={enqueueSnackbar} /> :
                        <SignUp authService={authService} enqueueSnackbar={enqueueSnackbar} />
                    }
                    <Typography
                        mt={1}
                        mb={2}
                        endDecorator={<Link
                            onClick={() => { setIsLogin((value) => !value) }}
                        >
                            {isLogin ? "Sign Up" : "Sign in"}
                        </Link>}
                        fontSize="sm"
                    >
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </Typography>

                    <Copyright />
                </Sheet>
            </main>
        </CssVarsProvider>
    );
}

export default SignInSide;
