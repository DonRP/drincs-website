import { Warning } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Avatar, Badge, Box, CircularProgress, Typography } from '@mui/joy';
import { AppBar, Button, Container, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip } from '@mui/material';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { useQueryClient } from '@tanstack/react-query';
import { materialUseTheme } from 'Theme';
import { UserProfile } from 'model/Auth/UserProfile';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { To, useLocation, useNavigate } from 'react-router-dom';
import AuthService, { isLoggedIn } from 'services/AuthService';
import { GET_PROFILE_CACHE_KEY, useGetProfileCache } from 'use_query/useGetUser';
import { showToast } from 'utility/ShowToast';
import DRErrorComponent from './DRErrorComponent';
import DRLink from './DRLink';
import DRLogo from './String/DRLogo';

// https://mui.com/components/app-bar/
// https://react-bootstrap.github.io/components/navbar/#home

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

function DRNavbar(props: IDRNavbarProps) {
    const materialTheme = materialUseTheme();
    const { t } = useTranslation(["translation"]);
    const location = useLocation();
    const navigate = useNavigate();
    const { pages = [], supportPage, extern_link = [], openLogin } = props;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const loginTitle = t("login");
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const logOutOnClick = () => {
        let authService = new AuthService();
        authService.logOut()
        location.pathname.includes("/profile") && navigate("/");
        queryClient.invalidateQueries({ queryKey: [GET_PROFILE_CACHE_KEY] });
        handleCloseUserMenu()
    }
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

    const transitionDuration = {
        enter: materialTheme.transitions.duration.enteringScreen,
        exit: materialTheme.transitions.duration.leavingScreen,
    };

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
                                            onClick={() => {
                                                navigate(page.path);
                                                handleCloseNavMenu()
                                            }}
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
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem
                                            key={page.title}
                                            onClick={() => {
                                                navigate(page.path);
                                                handleCloseNavMenu()
                                            }}
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
                            </Box>
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
                                <>
                                    <Tooltip title={t("expand")}>
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={() => {
                                            navigate("/profile");
                                            handleCloseUserMenu()
                                        }}>
                                            <Typography textAlign="center">{t("my_profile")}</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={logOutOnClick}>
                                            <Typography textAlign="center">{t("log_out")}</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                            }
                        </Toolbar>
                    </Container>
                </AppBar >
                {/* space for the AppBar */}
                <Box sx={{ minHeight: 75 }}>

                </Box>
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

export default DRNavbar;