import { Avatar, AvatarGroup, CircularProgress, Grid, Typography } from '@mui/joy';
import HomeFunctionContext from 'contexts/HomeFunctionContext';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AuthService from 'services/AuthService';
import { showToastByMyError } from 'utility/ShowToast';
import { getURLSearchParams } from 'utility/UrlUtility';

interface IProps {
    type: "connection" | "login"
}

export default function ConnectionDiscordLoadingPage(props: IProps) {
    const { t } = useTranslation(["translation"]);
    const {
        type,
    } = props
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [result, setResult] = useState<null | { succes: boolean, error: any }>(null)
    const homeFunction = useContext(HomeFunctionContext)

    useEffect(() => {
        let queryParameters = getURLSearchParams(window.location)
        let code: string | null = queryParameters.get("code")

        // Debouncing
        const getData = setTimeout(() => {
            if (!code) {
                console.error("code not found", "code: " + code)
                return
            }
            let authService = new AuthService()
            if (type === "connection") {
                authService.discordConnect(code).then((res) => {
                    if (res) {
                        homeFunction.updateAccountEvent()
                        setResult((value) => {
                            if (value === null) {
                                return { succes: true, error: null }
                            }
                            return value
                        })
                        return
                    }
                    else {
                        setResult((value) => {
                            if (value === null) {
                                return { succes: false, error: null }
                            }
                            return value
                        })
                        return
                    }
                }).catch((err) => {
                    setResult((value) => {
                        if (value === null) {
                            return { succes: false, error: err }
                        }
                        return value
                    })
                })
            }
            else if (type === "login") {
                authService.discordLogin(code, true).then((res) => {
                    if (res) {
                        homeFunction.updateAccountEvent()
                        setResult((value) => {
                            if (value === null) {
                                return { succes: true, error: null }
                            }
                            return value
                        })
                        return
                    }
                    else {
                        setResult((value) => {
                            if (value === null) {
                                return { succes: false, error: null }
                            }
                            return value
                        })
                        return
                    }
                }).catch((err) => {
                    setResult((value) => {
                        if (value === null) {
                            return { succes: false, error: err }
                        }
                        return value
                    })
                })
            }
        }, 700)

        return () => {
            clearTimeout(getData)
        }
    }, [type, homeFunction])

    useEffect(() => {
        // Debouncing
        const getData = setTimeout(() => {
            if (result === null) {
                return
            }
            if (result.succes) {
                setResult(null)
                navigate('/discord-connect-success');
                return
            }
            else {
                setResult(null)
                showToastByMyError(result.error, enqueueSnackbar, t)
                navigate('/discord-connect-error');
            }
        }, 700)

        return () => {
            clearTimeout(getData)
        }
    }, [result, navigate, enqueueSnackbar, t])

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid>
                <AvatarGroup
                    sx={{
                        "--Avatar-size": "150px"
                    }}
                >
                    <Avatar>
                        <CircularProgress size="lg" />
                    </Avatar>
                </AvatarGroup>
            </Grid>
            <Grid>
                <Typography level="h4" gutterBottom
                    fontSize={28}
                >
                    {t('connection_discord_loading')}
                </Typography>
            </Grid>
            <Grid>
                <Typography level="title-md"
                    sx={{
                        marginBottom: 2
                    }}
                >
                    {t('connection_discord_loading_subtitle')}
                </Typography>
            </Grid>
        </Grid>
    );
}
