import { Warning } from '@mui/icons-material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Avatar, Badge, Box, CircularProgress, Dropdown, Menu, MenuButton, MenuItem, Typography } from '@mui/joy';
import { AppBar, Button, Container, Grid, IconButton, Toolbar, Tooltip } from '@mui/material';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { useQueryClient } from '@tanstack/react-query';
import { materialUseTheme } from 'Theme';
import HomeFunctionContext from 'contexts/HomeFunctionContext';
import { UserProfile } from 'model/Auth/UserProfile';
import { useSnackbar } from 'notistack';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { To, useLocation, useNavigate } from 'react-router-dom';
import AuthService, { isLoggedIn } from 'services/AuthService';
import { GET_PROFILE_CACHE_KEY, useGetProfileCache } from 'use_query/useGetUser';
import { showToast, showToastByMyError } from 'utility/ShowToast';
import DRErrorComponent from './DRErrorComponent';
import DRLink from './DRLink';
import DRLogo from './String/DRLogo';

export type IPageDRNavbar = {
    title: string,
    path: To,
}

type IDRNavbarProps = {
    pages: IPageDRNavbar[],
    supportPage: IPageDRNavbar | null,
    openLogin: () => void,
    extern_link: IPageDRNavbar[],
}

export default function DRNavbar(props: IDRNavbarProps) {
    const materialTheme = materialUseTheme();
    const { t } = useTranslation(["translation"]);
    const location = useLocation();
    const navigate = useNavigate();
    const { pages = [], supportPage, extern_link = [], openLogin } = props;
    const loginTitle = t("login");
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const homeFunction = useContext(HomeFunctionContext)
    const [loadinfDiscord, setLoadingDiscord] = useState<boolean>(false)
    const {
        isLoading,
        data: userInfo = new UserProfile(),
    } = useGetProfileCache({
        catch: (err) => {
            if (err?.messagesToShow === 'api_user_not_found_or_deleted') {
                logOutOnClick()
                return
            }
            if (err?.messagesToShow === 'api_jwt_expired') {
                showToast(t("api_jwt_expired"), "warning", enqueueSnackbar)
                logOutOnClick()
                return
            }
            showToast(t("get_user_profile_error"), "error", enqueueSnackbar)
        },
    })
    const logOutOnClick = () => {
        let authService = new AuthService();
        authService.logOut()
        location.pathname.includes("/profile") && navigate("/");
        queryClient.invalidateQueries({ queryKey: [GET_PROFILE_CACHE_KEY] });
        homeFunction.updateAccountEvent()
    }

    const transitionDuration = {
        enter: materialTheme.transitions.duration.enteringScreen,
        exit: materialTheme.transitions.duration.leavingScreen,
    };

    const goToSupport = () => {
        if (supportPage)
            navigate(supportPage?.path);
    };

    const suppertIsVisible = () => {
        if (location.pathname === supportPage?.path) {
            return false
        }
        if (location.pathname === "/") {
            return false
        }
        if (location.pathname.includes("/profile")) {
            return false
        }
        return true;
    };

    try {
        return (
            <>
                <AppBar position="fixed" >
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            {/* PC */}
                            <Typography
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                <DRLink
                                    to={"/"}
                                    key={"logo_link"}
                                    style={{
                                        textDecoration: 'none',
                                        color: "white",
                                    }}
                                >
                                    <DRLogo
                                        fontSize={24}
                                    />
                                </DRLink>
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                >
                                    {pages.map((page) => (
                                        <Button
                                            key={page.title}
                                            onClick={() => navigate(page.path)}
                                            sx={{ my: 2, color: 'white', display: 'inline-table' }}
                                        >
                                            {page.title}
                                        </Button>
                                    ))}
                                    {extern_link.map((page) => (
                                        <Button
                                            key={page.title}
                                            onClick={() => {
                                                window.open(page.path.toString())
                                            }}
                                            sx={{ my: 2, color: 'white', display: { md: 'none', lg: 'inline-table' } }}
                                        >
                                            {page.title}
                                        </Button>
                                    ))}
                                    {!isLoggedIn() &&
                                        <Button
                                            key={loginTitle}
                                            variant="contained"
                                            onClick={openLogin}
                                            sx={{ my: 2, display: 'inline-table' }}
                                        >
                                            <strong>
                                                {loginTitle}
                                            </strong>
                                        </Button>
                                    }
                                </Grid>
                            </Box>
                            {/* Mobile */}
                            <Dropdown sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <MenuButton
                                    slots={{ root: IconButton }}
                                    slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
                                    sx={{ display: { xs: 'flex', md: 'none' } }}
                                >
                                    <MenuIcon />
                                </MenuButton>
                                <Menu
                                    sx={{
                                        zIndex: (theme) => theme.zIndex.tooltip + 1,
                                        display: { xs: 'flex', md: 'none' },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem
                                            key={page.title}
                                            onClick={() => navigate(page.path)}
                                        >
                                            <Typography textAlign="center">
                                                {page.title}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                    {extern_link.map((page) => (
                                        <MenuItem
                                            key={page.title}
                                            onClick={() => {
                                                window.open(page.path.toString())
                                            }}
                                        >
                                            <Typography
                                                textAlign="center"
                                            >
                                                {page.title}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Dropdown>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />
                            <Typography
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            >
                                <DRLink
                                    to={"/"}
                                    key={"logo_link"}
                                    style={{
                                        textDecoration: 'none',
                                        color: "white",
                                    }}
                                >
                                    <DRLogo
                                        fontSize={24}
                                    />
                                </DRLink>
                            </Typography>
                            {!isLoggedIn() &&
                                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                    <Button
                                        key={loginTitle}
                                        variant="contained"
                                        onClick={openLogin}
                                    >
                                        <VpnKeyIcon />
                                    </Button>
                                </Box>
                            }
                            {/* PC and Mobile */}
                            {isLoggedIn() &&
                                <Dropdown >
                                    <Tooltip title={t("expand")}>
                                        <MenuButton
                                            slots={{ root: IconButton }}
                                            sx={{
                                                p: 0,
                                            }}
                                        >
                                            {isLoading
                                                ?
                                                <CircularProgress />
                                                :
                                                userInfo.haveDiscordAccount
                                                    ?
                                                    <Avatar alt={userInfo.displayName} src={userInfo.photoURL} />
                                                    :
                                                    <Badge
                                                        color="warning"
                                                        badgeContent={
                                                            <Warning
                                                                fontSize='small'
                                                            />
                                                        }
                                                        size="sm"
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'right',
                                                        }}
                                                    >
                                                        <Avatar alt={userInfo.displayName} src={userInfo.photoURL} />
                                                    </Badge>
                                            }
                                        </MenuButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{
                                            zIndex: (theme) => theme.zIndex.tooltip + 1,
                                        }}
                                    >
                                        <MenuItem onClick={() => navigate("/profile")}>
                                            <Typography
                                                textAlign="center"
                                                startDecorator={<AssignmentIndIcon />}
                                            >
                                                {t("my_profile")}
                                            </Typography>
                                        </MenuItem>
                                        {!userInfo.haveDiscordAccount && <MenuItem
                                            onClick={() => {
                                                let service = new AuthService();
                                                setLoadingDiscord(true)
                                                service.redirectConnectDiscord()
                                                    .then(() => {
                                                        setLoadingDiscord(false)
                                                    })
                                                    .catch((error) => {
                                                        setLoadingDiscord(false)
                                                        showToastByMyError(error, enqueueSnackbar, t)
                                                    })
                                            }}
                                        >
                                            <Typography
                                                textAlign="center"
                                                startDecorator={
                                                    loadinfDiscord
                                                        ?
                                                        <CircularProgress />
                                                        :
                                                        <Warning color="warning" />
                                                }
                                            >
                                                {t("connect_to_discord")}
                                            </Typography>
                                        </MenuItem>}
                                        <MenuItem onClick={logOutOnClick}>
                                            <Typography
                                                textAlign="center"
                                                startDecorator={<LogoutIcon />}
                                            >
                                                {t("log_out")}
                                            </Typography>
                                        </MenuItem>
                                    </Menu>
                                </Dropdown>
                            }
                        </Toolbar>
                    </Container>
                </AppBar >
                {/* space for the AppBar */}
                <Box sx={{ minHeight: 75 }} />

                <Zoom
                    in={suppertIsVisible()}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${suppertIsVisible() ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label={supportPage?.title}
                        size="large"
                        onClick={goToSupport}
                        sx={{
                            mr: 1,
                            position: "fixed",
                            right: "2%",
                            bottom: "2%",
                            backgroundColor: "gold",
                            fontSize: { md: "1.1rem" },
                            minHeight: { md: "60px" },
                            minWidth: { md: "200px" },
                        }}
                    >
                        <VolunteerActivismIcon
                            sx={{
                                mr: 1,
                                fontSize: { md: "2rem" },
                            }}
                        />
                        <strong>
                            {supportPage?.title}
                        </strong>
                    </Fab>
                </Zoom>
            </>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRNavbar"} />
    }
};
