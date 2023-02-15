import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link, To } from 'react-router-dom';
import { isLoggedIn, logOut } from 'services/AuthService';

// https://mui.com/components/app-bar/
// https://react-bootstrap.github.io/components/navbar/#home

type IPage = {
    title: string,
    path: To,
}

type IDRNavbarProps = {
    pages: IPage[],
    supportPage: IPage | null,
    extern_link: IPage[],
}

function DRNavbar(props: IDRNavbarProps) {
    const { pages = [], supportPage = null, extern_link = [] } = props;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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


    try {
        return (
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
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        {!isLoggedIn() &&
                                            <VpnKeyIcon />
                                        }
                                        {isLoggedIn() &&
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                    {!isLoggedIn() &&
                                        <Link
                                            to={"/login"}
                                            // key={page.title + "_link"}
                                            style={{
                                                textDecoration: 'none',
                                                color: "white",
                                            }}
                                        >
                                            <MenuItem key={1} onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">Login</Typography>
                                            </MenuItem>
                                        </Link>
                                    }
                                    {isLoggedIn() &&
                                        <MenuItem key={2} onClick={() => {
                                            logOut()
                                            handleCloseUserMenu()
                                        }}>
                                            <Typography textAlign="center">Login</Typography>
                                        </MenuItem>
                                    }
                                </Menu>
                                <Link
                                    to={supportPage!.path}
                                    key={supportPage?.title + "_link"}
                                    style={{
                                        textDecoration: 'none',
                                        color: "white",
                                    }}
                                >
                                    <Button
                                        key={supportPage?.title}
                                        endIcon={<FavoriteIcon />}
                                        variant="contained"
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, display: 'inline-table', backgroundColor: "gold", }}
                                    >
                                        <strong>
                                            {supportPage?.title}
                                        </strong>
                                    </Button>
                                </Link>
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
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <Link
                                to={supportPage!.path}
                                key={supportPage?.title + "_link"}
                                style={{
                                    textDecoration: 'none',
                                    color: "white",
                                }}
                            >
                                <Button
                                    key={supportPage?.title}
                                    variant="contained"
                                    sx={{ backgroundColor: "gold", }}
                                >
                                    <VolunteerActivismIcon />
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar >
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>DRNavbar error</div>
    }
};

export default DRNavbar;