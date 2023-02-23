import { Button, CardActionArea, Grid, Stack, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';

type IDRTwitterPostProps = {
    twitterPost: any,
}

function DRTwitterPost(props: IDRTwitterPostProps) {
    const theme = useTheme();
    const twitterPost = props.twitterPost
    const [media, setMedia] = React.useState<any[]>([]);
    const [urls, setUrls] = React.useState<any[]>([]);
    const [currentMedia, setCurrentMedia] = React.useState<any>();
    const [title, setTitle] = React.useState();
    const [date, setDate] = React.useState<string>();

    const handleMediaIcon = (item: any) => {
        setCurrentMedia(item)
    };


    React.useEffect(() => {
        setMedia(twitterPost?.extended_entities?.media)
        setUrls(twitterPost?.entities?.urls)
        setTitle(twitterPost?.full_text?.split("http")[0])
        var date = new Date(twitterPost?.created_at)
        setDate(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
    }, [twitterPost]);

    React.useEffect(() => {
        if (media?.length > 0) {
            setCurrentMedia(media[0])
        }
    }, [media]);
    try {
        return (
            <Card elevation={24} >
                <CardHeader
                    avatar={
                        <IconButton color="primary" aria-label="upload picture" component="span"
                            onClick={() => {
                                window.open("https://twitter.com/intent/follow?original_referer=http%3A%2F%2Flocalhost%3A3000%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5EDR_incs&screen_name=DR_incs")
                            }}
                        >
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                <img src="https://avatars.githubusercontent.com/u/67595890?s=400&u=fb2c3c0e4d6846e73bfdbbde76c52ed06f14c9ef&v=4" width={50} height={50} alt="Icon" />
                            </Avatar>
                        </IconButton>
                    }
                    action={
                        <IconButton aria-label="var sul twit"
                            onClick={() => {
                                window.open("https://twitter.com/DR_incs/status/" + twitterPost?.id_str)
                            }}
                        >
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
                                            />
                                        </CardActionArea>
                                    </Card>
                                </Grid >
                            )
                        }
                    </Grid>
                }
                {urls.length > 0 &&
                    <CardActions disableSpacing>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="outlined"
                                startIcon={
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Patreon_logomark.svg/1024px-Patreon_logomark.svg.png" width={24} height={24} alt="Logo" />
                                }
                                onClick={() => {
                                    window.open(urls[0].url)
                                }}
                            >
                                Open Patreon
                            </Button>
                            {/* <Button variant="contained" >
                        Login
                    </Button> */}
                        </Stack>
                    </CardActions>
                }
            </Card>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: theme.palette.error.main }}>DRTwitterPost error</div>
    }
}

export default DRTwitterPost;