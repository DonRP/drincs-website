import { Grid } from "@mui/material";
import './Markdown.css';
import MarkdownCard from "./MarkdownCard";
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
