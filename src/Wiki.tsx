import { Grid } from "@mui/material";
import MarkdownCard from "components/MarkdownCard";
import { useEffect, useState } from "react";
import { ElementContent } from "react-markdown/lib/ast-to-react";

function Wiki() {
    const [route, setRoute] = useState<string | null>(null)
    const transformLinkUri = (href: string, children: Array<ElementContent>, title: string | null) => {
        if (href.includes("https")) {
            return href
        }
        else {
            return `wiki?route=${href}`
        }
    }
    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const route = queryParameters.get("route")
        setRoute(route)
    }, [])

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
                    transformLinkUri={transformLinkUri}
                />
            </Grid>
            <Grid item xs={7}>
                <MarkdownCard
                    markdownLink={route ?
                        `https://raw.githubusercontent.com/wiki/DRincs-Productions/ABFD/${route}.md` :
                        `https://raw.githubusercontent.com/wiki/DRincs-Productions/ABFD/Home.md`}
                    transformLinkUri={transformLinkUri}
                />
            </Grid>
            <Grid item xs={2}
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
                <MarkdownCard
                    minWidth={150}
                    markdownLink='https://raw.githubusercontent.com/wiki/DRincs-Productions/ABFD/_Sidebar.md'
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
