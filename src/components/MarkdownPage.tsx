import { Grid } from "@mui/material";
import MarkdownCard from "components/MarkdownCard";
import './Markdown.css';
type IHowToTranslateProps = {
    markdownLink: string
}

function MarkdownPage(props: IHowToTranslateProps) {
    const url = props.markdownLink;

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            padding={{ xs: 0, md: 3 }}
        >
            <Grid>
                <MarkdownCard
                    markdownLink={url}
                    maxWidth={1000}
                />
            </Grid>
        </Grid>
    );
};

export default MarkdownPage;
