import { Button, CardActionArea, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';

function DRTwitterPost(props) {

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
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardActionArea sx={{ maxWidth: 900, maxHeight: 900 }}>
                <CardMedia
                    component="img"
                    image="https://pbs.twimg.com/media/FODr029WYA07i7k?format=webp&name=medium"
                    alt="Paella dish"
                />
            </CardActionArea>
            <Card sx={{ maxWidth: 130, maxHeight: 90 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image="https://pbs.twimg.com/media/FODr029WYA07i7k?format=webp&name=small"
                        alt="Paella dish"
                    />
                </CardActionArea>
            </Card>
            <CardActions disableSpacing>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={

                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Patreon_logomark.svg/1024px-Patreon_logomark.svg.png" width={24} height={24} alt="Logo" />

                    }>

                        Open Patreon
                    </Button>
                    <Button variant="contained" >
                        Login
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
}

export default DRTwitterPost;