import { Grid } from "@mui/material";
import CircularIndeterminate from "components/CircularIndeterminate";
import DRTwitterPost from "components/DRTwitterPost";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import TweetService from "services/TwitterService";

const urlNoApiCode = [
    "https://v1.nocodeapi.com/drincs/twitter/xzgqNgMpxDHWebzY",
    "https://v1.nocodeapi.com/test536345/twitter/aiyPnsUXqMkyGXgb",
    "https://v1.nocodeapi.com/test435345/twitter/jyfdshSKzfwjXoos",
    "https://v1.nocodeapi.com/test435435345/twitter/tpyJIswMXJsvbTCt",
    "https://v1.nocodeapi.com/test43545345/twitter/jLutCbnyHTFjEMEt",
]

function News() {
    const [tweetList, setTweetList] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const tweetService = useMemo(() => { return new TweetService(enqueueSnackbar) }, [enqueueSnackbar]);

    useEffect(() => {
        urlNoApiCode.forEach(element => {
            tweetService.getTweets(element + "?type=user_timeline").then(res => {
                if (res) {
                    setTweetList(res)
                    return
                }
            }).catch(err => {
                console.log(err)
            })
        });
    }, [tweetService]);

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
                <iframe
                    title="discordServer"
                    src="https://discord.com/widget?id=688162156151439536&theme=dark"
                    width="300"
                    height="500"
                    allowTransparency={true}
                    frameBorder={0}
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                />
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
                    {/* react-twitter-embed */}
                    {/* <Grid item  >
                        <TwitterFollowButton
                            screenName={'DR_incs'}
                        />
                    </Grid> */}
                    {tweetList.length > 0 &&
                        tweetList?.map((item) =>
                            <Grid item  >
                                <DRTwitterPost twitterPost={item} />
                            </Grid>
                        )}
                    {tweetList.length < 1 &&
                        <Grid item  >
                            <CircularIndeterminate />
                        </Grid>
                    }
                </Grid >
            </Grid >

            {/* <Grid item xs={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
            </Grid> */}
        </Grid>
    );
}

export default News;
