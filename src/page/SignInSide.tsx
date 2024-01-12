import EmailIcon from '@mui/icons-material/Email';
import { Avatar, AvatarGroup, CssVarsProvider, Grid, Link, Modal, ModalClose, Typography } from "@mui/joy";
import Copyright from "components/Copyright";
import DRSheet from 'components/DRSheet';
import { OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar } from "notistack";
import Login from "page/SignInSide/Login";
import SignUp from "page/SignInSide/SignUp";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AuthService, { isLoggedIn } from "services/AuthService";
import { analyticPageView } from "utility/Analytics";

export interface ISignInSidePageProps {
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
    const [isCheckMail, setIsCheckMail] = useState<boolean>(false);
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
                    <DRSheet
                        sx={{
                            maxWidth: { xs: 350, md: 500 },
                            mx: 'auto', // margin left & right
                            my: 4, // margin top & bottom
                            py: 3, // padding top & bottom
                            px: 2, // padding left & right
                            display: 'flex',
                            flexDirection: 'column',
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
                        {!isCheckMail ?
                            <>
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
                                            t("already_logged_in")
                                        }
                                    </div>
                                </Grid>
                                {isLogin ?
                                    <Login authService={authService} enqueueSnackbar={enqueueSnackbar} onClose={onClose} /> :
                                    <SignUp authService={authService} enqueueSnackbar={enqueueSnackbar} onClose={onClose} setEmailVerification={setIsCheckMail} />
                                }
                                <Typography
                                    mt={0.5}
                                    mb={2}
                                    endDecorator={<Link
                                        onClick={() => { setIsLogin((value) => !value) }}
                                    >
                                        {isLogin ? t("sign_up") : t("sign_in")}
                                    </Link>}
                                    fontSize="sm"
                                >
                                    {isLogin ? t("dont_have_an_account") : t("do_have_account")}
                                </Typography>
                            </>
                            :
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                marginTop={7}
                                marginBottom={10}
                            >
                                <Grid>
                                    <AvatarGroup
                                        sx={{
                                            "--Avatar-size": "70px"
                                        }}
                                    >
                                        <Avatar>
                                            <EmailIcon
                                                color='primary'
                                                sx={{ fontSize: 50 }}
                                            />
                                        </Avatar>
                                    </AvatarGroup>
                                </Grid>
                                <Grid>
                                    <Typography marginTop={1}>
                                        {t("verification_mail_sent")}
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Link
                                        onClick={() => {
                                            setIsCheckMail(false)
                                            setIsLogin(true)
                                        }}
                                    >
                                        {t("back_to_sign_in")}
                                    </Link>
                                </Grid>
                            </Grid>
                        }

                        <Copyright />
                    </DRSheet>
                </main>
            </CssVarsProvider>
        </Modal>
    );
}

export default SignInSide;
