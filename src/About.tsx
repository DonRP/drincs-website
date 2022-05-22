import styled from '@emotion/styled';
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
                            top: "20vh",
                            textAlign: "center!important",

                            animationName: "pulse",
                            animationDuration: "2s",
                            animationDelay: ".5s",
                        }}
                    >
                        <Keyframes>
                            <CardMedia sx={{
                                maxWidth: 800,
                            }}
                                component="img"
                                image={"/images/logo.webp"}
                            />
                        </Keyframes>
                    </Grid>
                    <Grid item container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                        sx={{
                            position: "absolute",
                            bottom: "50px",
                        }}
                    >
                        <Grid item >
                            <Button
                                key={"Support"}
                                endIcon={<FavoriteIcon />}
                                variant="contained"
                                sx={{
                                    my: 2,
                                    display: 'inline-table',
                                    backgroundColor: "gold",
                                    width: "40vh",
                                    height: "8vh",
                                }}
                                size="large"
                            >
                                <strong>
                                    Support
                                </strong>
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button
                                key={"Download"}
                                endIcon={<FavoriteIcon />}
                                variant="contained"
                                sx={{
                                    my: 2,
                                    display: 'inline-table',
                                    backgroundColor: "gold",
                                    width: "40vh",
                                    height: "8vh",
                                }}
                                size="large"
                            >
                                <strong>
                                    Download
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
