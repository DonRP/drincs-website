import { Grid } from "@mui/material";
import MarkdownCard from "components/MarkdownCard";

function Wiki() {
    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            marginTop={5}
        >
            <MarkdownCard markdownLink='https://raw.githubusercontent.com/wiki/DRincs-Productions/ABFD/Home.md' />
        </Grid>
    );
};

export default Wiki;
