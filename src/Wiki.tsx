import { Grid } from "@mui/material";
import MarkdownCard from "components/MarkdownCard";

function Wiki() {
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            marginTop={5}
            spacing={2}
        >
            <Grid item xs={9}>
                <MarkdownCard markdownLink='https://raw.githubusercontent.com/wiki/DRincs-Productions/ABFD/Home.md' />
            </Grid>
            <Grid item xs={3}>
                <MarkdownCard markdownLink='https://raw.githubusercontent.com/wiki/DRincs-Productions/ABFD/_Sidebar.md' />
            </Grid>
        </Grid>
    );
};

export default Wiki;
