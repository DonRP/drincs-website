import { Grid } from "@mui/material";
import DRTwitterPost from "components/DRTwitterPost";

function News() {
    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center" rowSpacing={100}
        >
            <Grid item  >
                <DRTwitterPost />
            </Grid>
        </Grid>
    );
}

export default News;
