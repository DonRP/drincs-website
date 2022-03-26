import { Grid } from "@mui/material";
import DRTwitterPost from "components/DRTwitterPost";
import { useEffect, useState } from "react";
import { TwitterFollowButton } from "react-twitter-embed";
import TweetService from "services/TwitterService";

function News() {
    const [tweetList, setTweetList] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const userId = "1402755743540039684"

    useEffect(() => {
        const abortController = new AbortController();
        const tweetService = new TweetService();
        tweetService.getTweets(userId, abortController).then(res => {
            if (abortController.signal.aborted) {
                return;
            }
            setTweetList(res)
        }).catch(err => {
            console.log(err)
        })

        return function cleanUp() {
            abortController.abort();
        }
    }, [userId]);

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            // sx={{ display: 'flex' }}
            pt={3}
            mb={3}
        >
            <Grid item md={5} lg={5} sx={{ display: { xs: 'none', sm: 'none', md: 'contents' } }} >
                <iframe title="discordServer" src="https://discord.com/widget?id=688162156151439536&theme=dark" width="300" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={8}>
                <Grid
                    // sx={{ m: 1 }}
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={4}
                >
                    <Grid item  >
                        <TwitterFollowButton
                            screenName={'DR_incs'}
                        />
                    </Grid>
                    {tweetList?.map((item, index) =>
                        <Grid item  >
                            <DRTwitterPost />
                        </Grid>
                    )}
                </Grid >
            </Grid >

            {/* <Grid item xs={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
            </Grid> */}
        </Grid>
    );
}

export default News;
