import { Grid } from "@mui/material";
import MarkdownCard from "components/MarkdownCard";
import { ElementContent } from "react-markdown/lib/ast-to-react";

type WikiProps = {
    urlRepo: string
    routeLink: string
    sidebar?: string
}

function Wiki(props: WikiProps) {
    const { urlRepo, sidebar = "_Sidebar.md", routeLink } = props
    const transformLinkUri = (href: string, children: Array<ElementContent>, title: string | null) => {
        if (href.includes("https")) {
            return href
        }
        else {
            return `${routeLink}?route=${href}`
        }
    }
    const queryParameters = new URLSearchParams(window.location.search)
    const route = queryParameters.get("route")

    return (
        <Grid
            container
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems={{ xs: "stretch", md: "flex-start" }}
            spacing={0}
            marginTop={5}
            marginBottom={5}
        >
            <Grid item xs={1}
                sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            />
            <Grid item xs={2}
                sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            >
                <MarkdownCard
                    minWidth={150}
                    markdownLink={`https://raw.githubusercontent.com/wiki/${urlRepo}/${sidebar}`}
                    transformLinkUri={transformLinkUri}
                />
            </Grid>
            <Grid item xs={7}>
                <MarkdownCard
                    markdownLink={route ?
                        `https://raw.githubusercontent.com/wiki/${urlRepo}/${route}.md` :
                        `https://raw.githubusercontent.com/wiki/${urlRepo}/Home.md`}
                    transformLinkUri={transformLinkUri}
                />
            </Grid>
            <Grid item xs={12}
                sx={{ flexGrow: 1, display: { xs: 'grid', md: 'none' } }}
            >
                <MarkdownCard
                    minWidth={150}
                    markdownLink={`https://raw.githubusercontent.com/wiki/${urlRepo}/${sidebar}`}
                    transformLinkUri={transformLinkUri}
                />
            </Grid>
            <Grid item xs={2}
                sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            />
        </Grid>
    );
};

export default Wiki;
