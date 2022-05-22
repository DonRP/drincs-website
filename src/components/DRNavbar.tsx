import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { AppBar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link, To } from 'react-router-dom';

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

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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
                            >
                                <img src="/images/logo.webp" width={100} height={55} alt="Logo" />
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
                                        sx={{ my: 2, color: 'white', display: 'inline-table' }}
                                    >
                                        {page.title}
                                    </Button>
                                ))}
                                <Link
                                    to={supportPage!.path}
                                    key={supportPage?.title + "_link"}
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
                            >
                                <img src="/images/logo.webp" width={90} height={50} alt="Logo" />
                            </Link>
                        </Typography>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <Link
                                to={supportPage!.path}
                                key={supportPage?.title + "_link"}
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