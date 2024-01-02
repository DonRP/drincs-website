import MenuIcon from '@mui/icons-material/Menu';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { materialUseTheme } from 'Theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { To, useLocation, useNavigate } from 'react-router-dom';
import AuthService, { getUserName, isLoggedIn } from 'services/AuthService';
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
    let navigate = useNavigate();
    const { pages = [], supportPage, extern_link = [], openLogin } = props;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const loginTitle = t("login");

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
                                variant="h6"
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
                                            <Typography textAlign="center">
                                                {page.title}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Typography
                                variant="h6"
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
                                            <Avatar alt={getUserName()} src="/static/images/avatar/2.jpg" />
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
                                        <MenuItem key={2} onClick={() => {
                                            let authService = new AuthService();
                                            authService.logOut()
                                            handleCloseUserMenu()
                                        }}>
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