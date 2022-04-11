import { Button, CardActionArea, Grid, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';

function DRTwitterPost(props) {
    const twitterPost = props.twitterPost
    const [media, setMedia] = React.useState([]);
    const [urls, setUrls] = React.useState([]);
    const [currentMedia, setCurrentMedia] = React.useState();
    const [title, setTitle] = React.useState();
    const [date, setDate] = React.useState();

    const handleMediaIcon = (item) => {
        setCurrentMedia(item)
    };


    React.useEffect(() => {
        setMedia(twitterPost?.extended_entities?.media)
        setUrls(twitterPost?.entities?.urls)
        setTitle(twitterPost?.full_text?.split("http")[0])
        var date = new Date(twitterPost?.created_at)
        setDate((date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()))
    }, [twitterPost]);

    React.useEffect(() => {
        if (media?.length > 0) {
            setCurrentMedia(media[0])
        }
    }, [media]);

    return (
        <Card elevation={24} >
            <CardHeader
                avatar={
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            <img src="https://pbs.twimg.com/profile_images/1402758075912687616/xG7Ud8g1_200x200.jpg" width={50} height={50} alt="Icon" />
                        </Avatar>
                    </IconButton>
                }
                action={
                    <IconButton aria-label="var sul twit">
                        <img src="https://upload.wikimedia.org/wikipedia/it/0/09/Twitter_bird_logo.png" width={30} height={24} alt="Logo" />
                    </IconButton>
                }
                title={title}
                subheader={date}
            />
            {currentMedia &&
                <CardMedia
                    sx={{ maxWidth: 900, maxHeight: 900 }}
                    component="img"
                    image={currentMedia.media_url_https?.split(".jpg")[0] + "?format=webp&name=medium"}
                    alt="Paella dish"
                />
            }
            {media?.length > 1 &&
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                >
                    {
                        media?.map((item) =>
                            <Grid item  >
                                <Card sx={{ maxWidth: 130, maxHeight: 90 }}>
                                    <CardActionArea
                                        onClick={() => {
                                            handleMediaIcon(item)
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={item.media_url_https?.split(".jpg")[0] + "?format=webp&name=small"}
                                            alt="Paella dish"
                                        />
                                    </CardActionArea>
                                </Card>
                            </Grid >
                        )
                    }
                </Grid>
            }
            <CardActions disableSpacing>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={

                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Patreon_logomark.svg/1024px-Patreon_logomark.svg.png" width={24} height={24} alt="Logo" />

                    }>

                        Open Patreon
                    </Button>
                    {/* <Button variant="contained" >
                        Login
                    </Button> */}
                </Stack>
            </CardActions>
        </Card>
    );
}

export default DRTwitterPost;