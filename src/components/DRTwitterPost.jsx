import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
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
                            <img src="https://pbs.twimg.com/profile_images/1457725055178260480/_GOnheh__200x200.jpg" width={50} height={50} alt="Icon" />
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
                    image="https://pbs.twimg.com/media/FO7RV5KXEAIISGl?format=webp&name=medium"
                    alt="Paella dish"
                />
            </CardActionArea>
            <Card sx={{ maxWidth: 130, maxHeight: 90 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image="https://pbs.twimg.com/media/FO7RV5KXEAIISGl?format=webp&name=small"
                        alt="Paella dish"
                    />
                </CardActionArea>
            </Card>
        </Card>
    );
}

export default DRTwitterPost;