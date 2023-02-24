import MenuIcon from '@mui/icons-material/Menu';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, useTheme } from '@mui/material';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Link, To, useLocation, useNavigate } from 'react-router-dom';
import AuthService, { getUserName, isLoggedIn } from 'services/AuthService';

// https://mui.com/components/app-bar/
// https://react-bootstrap.github.io/components/navbar/#home

export type IPageDRNavbar = {
    title: string,
    path: To,
}

type IDRNavbarProps = {
    pages: IPageDRNavbar[],
    supportPage: IPageDRNavbar | null,
    loginPage: IPageDRNavbar | null,
    extern_link: IPageDRNavbar[],
}

function DRNavbar(props: IDRNavbarProps) {
    const location = useLocation();
    const theme = useTheme();
    let navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { pages = [], supportPage, extern_link = [], loginPage } = props;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
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

    const goToLogin = () => {
        if (loginPage)
            navigate(loginPage?.path);
    };

    const suppertIsVisible = () => {
        if (location.pathname === supportPage?.path) {
            return false
        }
        if (location.pathname === loginPage?.path) {
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
                <AppBar position="sticky">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            {/* PC */}
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                <Link
                                    to={"/"}
                                    key={"logo_link"}
                                    style={{
                                        textDecoration: 'none',
                                        color: "white",
                                    }}
                                >
                                    <strong>DR</strong>incs
                                </Link>
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                >
                                    {pages.map((page) => (
                                        <Link
                                            to={page.path}
                                            key={page.title + "_link"}
                                            style={{
                                                textDecoration: 'none',
                                                color: "white",
                                            }}
                                        >
                                            <Button
                                                key={page.title}
                                                onClick={handleCloseNavMenu}
                                                sx={{ my: 2, color: 'white', display: 'inline-table' }}
                                            >
                                                {page.title}
                                            </Button>
                                        </Link>
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
                                            key={loginPage?.title}
                                            variant="contained"
                                            onClick={goToLogin}
                                            sx={{ my: 2, display: 'inline-table' }}
                                        >
                                            <strong>
                                                {loginPage?.title}
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
                                        <Link
                                            to={page.path}
                                            key={page.title + "_link"}
                                            style={{
                                                textDecoration: 'none',
                                                color: "white",
                                            }}
                                        >
                                            <MenuItem
                                                key={page.title}
                                                onClick={handleCloseNavMenu}
                                            >
                                                <Typography textAlign="center">
                                                    {page.title}
                                                </Typography>
                                            </MenuItem>
                                        </Link>
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
                                <Link
                                    to={"/"}
                                    key={"logo_link"}
                                    style={{
                                        textDecoration: 'none',
                                        color: "white",
                                    }}
                                >
                                    <strong>DR</strong>incs
                                </Link>
                            </Typography>
                            {!isLoggedIn() &&
                                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                    <Button
                                        key={loginPage?.title}
                                        variant="contained"
                                        onClick={goToLogin}
                                    >
                                        <VpnKeyIcon />
                                    </Button>
                                </Box>
                            }
                            {/* PC and Mobile */}
                            {isLoggedIn() &&
                                <>
                                    <Tooltip title="Open settings">
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
                                            let authService = new AuthService(enqueueSnackbar);
                                            authService.logOut()
                                            handleCloseUserMenu()
                                        }}>
                                            <Typography textAlign="center">Log Out</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                            }
                        </Toolbar>
                    </Container>
                </AppBar >
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
                        aria-label="add"
                        // position="sticky"
                        onClick={goToSupport}
                        sx={{
                            mr: 1,
                            position: "fixed",
                            right: "2%",
                            bottom: "2%",
                            backgroundColor: "gold",
                        }}>
                        <VolunteerActivismIcon sx={{ mr: 1 }} />
                        <strong>
                            {supportPage?.title}
                        </strong>
                    </Fab>
                </Zoom>
            </>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: theme.palette.error.main }}>DRNavbar error</div>
    }
};

export default DRNavbar;