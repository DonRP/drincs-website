import { Grid } from "@mui/material";
import MarkdownCard from "components/MarkdownCard";

function Wiki() {
    return (
        <Grid
            container
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems={{ xs: "stretch", md: "flex-start" }}
            spacing={0}
            marginTop={5}
        >
            <Grid item xs={1}
                sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            />
            <Grid item xs={2}
                sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            >
                <MarkdownCard
                    minWidth={150}
                    markdownLink='https://raw.githubusercontent.com/wiki/DRincs-Productions/ABFD/_Sidebar.md'
                />
            </Grid>
            <Grid item xs={7}>
                <MarkdownCard
                    markdownLink='https://raw.githubusercontent.com/wiki/DRincs-Productions/ABFD/Home.md'
                />
            </Grid>
            <Grid item xs={2}
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
                <MarkdownCard
                    minWidth={150}
                    markdownLink='https://raw.githubusercontent.com/wiki/DRincs-Productions/ABFD/_Sidebar.md'
                />
            </Grid>
            <Grid item xs={2}
                sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            />
        </Grid>
    );
};

export default Wiki;
