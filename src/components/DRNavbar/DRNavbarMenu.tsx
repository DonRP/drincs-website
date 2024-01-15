import { Warning } from "@mui/icons-material";
import { Avatar, Badge, CircularProgress, IconButton, Tooltip, Typography } from "@mui/joy";
import { Menu, MenuItem } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { UserProfile } from "model/Auth/UserProfile";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import { GET_PROFILE_CACHE_KEY, useGetProfileCache } from "use_query/useGetUser";
import { showToast } from "utility/ShowToast";

export default function DRNavbarMenu() {
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { t } = useTranslation(["translation"]);
    const location = useLocation();

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

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    return (
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
    );
}
