import { Button, Grid, ImageSrc, KeyframePulse, Typography } from '@drincs/react-components';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Card, CardMedia } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { analyticPageView } from '../utility/Analytics';

// https://www.w3schools.com/cssref/pr_background-position.asp
// https://www.w3schools.com/howto/howto_css_blurred_background.asp

function About() {
    analyticPageView("About")
    let navigate = useNavigate();
    const { t } = useTranslation(["translation"]);

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
                        }}
                    >
                        <KeyframePulse>
                            <CardMedia
                                image={"https://firebasestorage.googleapis.com/v0/b/drincs-website.appspot.com/o/public%2Fa_big_family_logo.webp?alt=media&token=5a6bdc2a-fc25-49a6-bcec-ccc8fde905c6"}
                                component="img"
                                sx={{
                                    maxWidth: 600,
                                }}
                            />
                        </KeyframePulse>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 1, md: 10 }}
                    sx={{
                        position: "absolute",
                        bottom: "10%",
                        left: 0,
                        right: 0,
                    }}
                >
                    <Grid>
                        <Button
                            sx={{
                                paddingX: 3,
                                paddingY: 1.5,
                            }}
                            startDecorator={<FavoriteIcon fontSize="large" sx={{ zIndex: 1, color: "#d60000" }} />}
                            onClick={() => {
                                navigate("/support");
                            }}
                            color="gold"
                            size='lg'
                        >
                            <ImageSrc
                                image="https://firebasestorage.googleapis.com/v0/b/drincs-website.appspot.com/o/public%2Fred_hearts_background.webp?alt=media&token=c92d5f78-1ad3-4c80-a67d-31b02e8832b8"
                                style={{ opacity: 0.1 }}
                            />
                            <Typography
                                fontSize={{ xs: '25px', md: '35px' }}
                                fontFamily="lilita-one"
                                textColor="gold.solidColor"
                                sx={{ zIndex: 1 }}
                            >
                                {t("support_us").toLocaleUpperCase()}
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid>
                        <Button
                            sx={{
                                paddingX: 3,
                                paddingY: 1.5,
                            }}
                            startDecorator={<DownloadIcon fontSize="large" />}
                            onClick={() => {
                                navigate("/download");
                            }}
                            size='lg'
                        >
                            <Typography
                                fontSize={{ xs: '25px', md: '35px' }}
                                fontFamily="lilita-one"
                                textColor="primary.solidColor"
                            >
                                {t("download").toLocaleUpperCase()}
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Card>

            {/* TODO: Info game */}
        </>
    );
}

export default About;
