import styled from '@emotion/styled';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/joy/Grid';
import { Card, CardMedia } from '@mui/material';
import DRButton from 'components/DRButton';
import { useNavigate } from 'react-router';
import { analyticPageView } from 'utility/Analytics';

// https://www.w3schools.com/cssref/pr_background-position.asp
// https://www.w3schools.com/howto/howto_css_blurred_background.asp

function About() {
    analyticPageView("About")
    let navigate = useNavigate();

    const Keyframes = styled("div")({
        animationName: "pulse",
        animationDuration: "2s",
        animationDelay: ".5s",

        "@keyframes pulse": {
            "0%": {
                transform: "scale(1)",
            },
            "50%": {
                transform: "scale(1.1)",
            },
            "100%": {
                transform: "scale(1)",
            }
        },
    });

    return (
        <>
            <Card
                elevation={24}
                sx={{
                    backgroundImage: `url(https://raw.githubusercontent.com/DRincs-Productions/ABFD/master/game/gui/main_menu.webp)`,
                    backgroundColor: "##000",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "100vh",
                    position: "relative",
                    marginTop: '-72px',
                    fontSize: '50px',
                }}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    pt={7 + 10}
                    mb={10}
                >
                    <Grid
                        sx={{
                            position: "absolute",
                            bottom: "36vh",
                            textAlign: "center!important",

                            animationName: "pulse",
                            animationDuration: "2s",
                            animationDelay: ".5s",
                        }}
                    >
                        <Keyframes>
                            <CardMedia
                                image={"/images/logo.webp"}
                                component="img"
                                sx={{
                                    maxWidth: 600,
                                }}
                            />
                        </Keyframes>
                    </Grid>
                    <Grid
                        container
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="center"
                        alignItems="center"
                        spacing={{ xs: 1, sm: 3 }}
                        sx={{
                            position: "absolute",
                            bottom: "50px",
                        }}
                    >
                        <Grid>
                            <DRButton
                                key="support"
                                label='SUPPORT'
                                sx={{
                                    my: 2,
                                    backgroundColor: "gold",
                                    width: "40vh",
                                    height: "8vh",
                                    minHeight: "50px",
                                    minWidth: "170px",
                                    color: "black",
                                }}
                                startIcon={<FavoriteIcon />}
                                onClick={() => {
                                    navigate("/support");
                                }}
                            />
                        </Grid>
                        <Grid>
                            <DRButton
                                key="download"
                                label='DOWNLOAD'
                                sx={{
                                    my: 2,
                                    width: "40vh",
                                    height: "8vh",
                                    minHeight: "50px",
                                    minWidth: "170px",
                                }}
                                endIcon={<DownloadIcon />}
                                onClick={() => {
                                    navigate("/download");
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Card>

            {/* TODO: Info game */}
        </>
    );
}

export default About;
