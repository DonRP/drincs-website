import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import DRTwitterPost from "components/DRTwitterPost";
import { TwitterFollowButton, TwitterTimelineEmbed } from "react-twitter-embed";

function News() {

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Card elevation={24} sx={{ display: 'flex', maxWidth: 800 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Obbiettivo: Rendere i post publici
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Attulmente sto cercando di dipendere da Patreon il meno possibile.
                                Il suoi punti di forza rispotto la concorrenza sono la popolarità e il servizzio di posting.
                                Su questo campo un valido rivale è Twitter: Non ostante non è possibile publicare post per soli patreon, posso quadagnare sulla loro popolarità.
                                Per farlo devo raggiungere l'obbittivo qui a lato, in cambio non limiterò più la visibilità dei post a soli patreon.
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            <br></br>
                            <TwitterFollowButton
                                screenName={'DR_incs'}
                            />
                        </Box>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image="/static/images/cards/live-from-space.jpg"
                        alt="Live from space album cover"
                    />
                </Card>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                sx={{ display: 'flex' }}
                m={2} pt={3}
            >
                <Grid item sx={{ display: { xs: 'none', md: 'flex' } }} position="sticky">
                    <Card elevation={24} sx={{ maxWidth: 400 }}>

                        <TwitterTimelineEmbed
                            sourceType="profile"
                            screenName="DR_incs"
                            options={{ height: 400 }}
                        />
                    </Card>
                </Grid>
                <Grid item xs>
                    <Grid
                        // sx={{ m: 1 }}
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={4}
                    >
                        <Grid item  >
                            <DRTwitterPost />
                        </Grid>
                        <Grid item  >
                            <DRTwitterPost />
                        </Grid>
                    </Grid >
                </Grid >
            </Grid>
        </>
    );
}

export default News;
