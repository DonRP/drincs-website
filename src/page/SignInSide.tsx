import { Avatar, CssVarsProvider, Grid, Link, Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import Copyright from "components/Copyright";
import Login from "components/SignInSide/Login";
import SignUp from "components/SignInSide/SignUp";
import { OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar } from "notistack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AuthService, { isLoggedIn } from "services/AuthService";
import { analyticPageView } from "utility/Analytics";

export type ISignInSidePageProps = {
    authService: AuthService,
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    onClose: () => void,
}

export type IProps = {
    open: boolean,
    onClose: () => void,
}

function SignInSide(props: IProps) {
    analyticPageView("SignInSide")
    const { t } = useTranslation(["translation"]);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const { enqueueSnackbar } = useSnackbar();
    const authService = new AuthService();
    const { onClose, open } = props;

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={onClose}
            sx={{
                display: '-ms-flexbox',
                justifyContent: 'center',
                alignItems: 'center',
                // display: "-ms-flexbox",

            }}
        >
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
                        <ModalClose
                            variant="outlined"
                            sx={{
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.surface',
                            }}
                        />
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
                            <Login authService={authService} enqueueSnackbar={enqueueSnackbar} onClose={onClose} /> :
                            <SignUp authService={authService} enqueueSnackbar={enqueueSnackbar} onClose={onClose} />
                        }
                        <Typography
                            mt={0.5}
                            mb={2}
                            endDecorator={<Link
                                onClick={() => { setIsLogin((value) => !value) }}
                            >
                                {isLogin ? "Sign Up" : t("sign_in")}
                            </Link>}
                            fontSize="sm"
                        >
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                        </Typography>

                        <Copyright />
                    </Sheet>
                </main>
            </CssVarsProvider>
        </Modal>
    );
}

export default SignInSide;
