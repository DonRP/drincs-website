import styled from '@emotion/styled';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, Card, CardMedia, Grid } from '@mui/material';
import '../src/css/about.css';

// https://www.w3schools.com/cssref/pr_background-position.asp
// https://www.w3schools.com/howto/howto_css_blurred_background.asp

function About() {
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

    // const style = {
    //     heroImage: {
    //           /* Add the blur effect */
    //         filter: "blur(8px)",
    //         -webkit-filter: blur(8px),

    //         backgroundImage: `url(https://raw.githubusercontent.com/DonRP/ABFD/master/game/gui/main_menu.webp)`,
    //         backgroundColor: "##000",
    //         backgroundPosition: "center",
    //         backgroundRepeat: "no-repeat",
    //         backgroundSize: "cover",
    //         height: "100vh",
    //         position: "relative",
    //         marginTop: '-70px',
    //         fontSize: '50px',

    //         // height: '100vh',
    //         // marginTop: '-70px',
    //         // fontSize: '50px',
    //         // backgroundSize: 'cover',
    //         // backgroundRepeat: 'no-repeat',    
    //     },
    // };
    return (
        <>
            <Card elevation={24} sx={{
                backgroundImage: `url(https://raw.githubusercontent.com/DonRP/ABFD/master/game/gui/main_menu.webp)`,
                backgroundColor: "##000",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100vh",
                position: "relative",
                marginTop: '-70px',
                fontSize: '50px',
            }}>

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    // sx={{ display: 'flex' }}
                    pt={7 + 10}
                    mb={10}
                >
                    <Grid item
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
                            <CardMedia sx={{
                                maxWidth: 600,
                            }}
                                component="img"
                                image={"/images/logo.webp"}
                            />
                        </Keyframes>
                    </Grid>
                    <Grid item container
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="center"
                        alignItems="center"
                        spacing={{ xs: 1, sm: 3 }}
                        sx={{
                            position: "absolute",
                            bottom: "50px",
                        }}
                    >
                        <Grid item >
                            <Button
                                key={"Support"}
                                variant="contained"
                                sx={{
                                    my: 2,
                                    display: 'inline-table',
                                    backgroundColor: "gold",
                                    width: "40vh",
                                    height: "8vh",
                                    minHeight: "50px",
                                    minWidth: "170px",
                                    fontSize: "3vh",
                                }}
                                size="large"
                            >
                                <strong>
                                    <Grid item container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        spacing={{ xs: 0, sm: 1, md: 2, lg: 4 }}
                                    >
                                        <Grid item >
                                            <FavoriteIcon sx={{
                                                fontSize: "4vh",
                                            }} />
                                        </Grid>
                                        <Grid item >
                                            Support
                                        </Grid>
                                    </Grid>

                                </strong>
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button
                                key={"Download"}
                                variant="contained"
                                sx={{
                                    my: 2,
                                    display: 'inline-table',
                                    width: "40vh",
                                    height: "8vh",
                                    minHeight: "50px",
                                    minWidth: "170px",
                                    fontSize: "3vh",
                                    minFontSize: "150px",
                                }}
                                size="large"
                            >
                                <strong>
                                    <Grid item container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        spacing={{ xs: 0, sm: 1, md: 2, lg: 4 }}
                                    >
                                        <Grid item >
                                            <DownloadIcon sx={{
                                                fontSize: "4vh",
                                                minFontSize: "150px",
                                            }} />
                                        </Grid>
                                        <Grid item >
                                            Download
                                        </Grid>
                                    </Grid>
                                </strong>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>

            {/* TODO: Info game */}
        </>
    );
}

export default About;
