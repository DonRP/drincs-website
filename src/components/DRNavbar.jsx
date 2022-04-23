import { Payment } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

// https://mui.com/components/app-bar/
// https://react-bootstrap.github.io/components/navbar/#home
function DRNavbar(props) {
    const { pages = [], supportPage = null, extern_link = [] } = props;
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

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
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            {pages.map((page) => (
                                <Link to={page.path}>
                                    <Button
                                        key={page.title}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page.title}
                                    </Button>
                                </Link>
                            ))}
                            {extern_link.map((page) => (
                                <Button
                                    key={page.title}
                                    onClick={() => {
                                        window.open(page.path)
                                    }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.title}
                                </Button>
                            ))}
                            <Link to={supportPage.path}>
                                <Button
                                    key={supportPage.title}
                                    endIcon={<Payment />}
                                    variant="contained"
                                    onClick={handleCloseNavMenu}
                                >
                                    {supportPage.title}
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
                                <Link to={page.path}>
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
                                        window.open(page.path)
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
                        LOGO
                    </Typography>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <Link to={supportPage.path}>
                            <Button
                                key={supportPage.title}
                                variant="contained"
                            >
                                <Payment />
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
};

export default DRNavbar;