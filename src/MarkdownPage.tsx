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
            marginTop={5}
        >
            <MarkdownCard
                markdownLink={url}
            />
        </Grid>
    );
};

export default MarkdownPage;
