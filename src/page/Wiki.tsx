import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/joy';
import { Fab } from '@mui/material';
import MarkdownCard from "components/MarkdownCard";
import { ElementContent } from 'react-markdown/lib';
import { analyticPageView } from "utility/Analytics";

type WikiProps = {
    urlRepo: string
    routeLink: string
    sidebar?: string
}

function Wiki(props: WikiProps) {

    const { urlRepo, sidebar = "_Sidebar.md", routeLink } = props
    const transformLinkUri = (href: string, children: ElementContent[], title: string | null) => {
        if (href.includes("https")) {
            return href
        }
        else {
            return `${routeLink}?route=${href}`
        }
    }
    const queryParameters = new URLSearchParams(window.location.search)
    const route = queryParameters.get("route") || "Home"

    analyticPageView("Wiki", props.urlRepo + " - " + route)

    return (
        <>
            <Fab
                variant="extended"
                color="primary"
                aria-label="add"
                onClick={() => {
                    window.open(`https://github.com/${props.urlRepo}/wiki/${route}/_edit`);
                }}

                sx={{
                    position: "fixed",
                    right: "3%",
                    bottom: { xs: "11%", md: "12%" },
                    minHeight: { md: "60px" },
                    minWidth: { md: "60px" },
                }}>
                <EditIcon
                    sx={{
                        fontSize: { md: "2rem" },
                    }}
                />
            </Fab>
            <Grid
                container
                direction={{ xs: "column", md: "row" }}
                justifyContent="center"
                alignItems={{ xs: "stretch", md: "flex-start" }}
                spacing={0}
                marginTop={5}
                marginBottom={5}
            >

                <Grid xs={1}
                    sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                />
                <Grid xs={2}
                    sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                >
                    <MarkdownCard
                        minWidth={150}
                        markdownLink={`https://raw.githubusercontent.com/wiki/${urlRepo}/${sidebar}`}
                        transformLinkUri={transformLinkUri}
                    />
                </Grid>
                <Grid xs={7}>
                    <MarkdownCard
                        markdownLink={`https://raw.githubusercontent.com/wiki/${urlRepo}/${route}.md`}
                        transformLinkUri={transformLinkUri}
                    />
                </Grid>
                <Grid xs={12}
                    sx={{ flexGrow: 1, display: { xs: 'grid', md: 'none' } }}
                >
                    <MarkdownCard
                        minWidth={150}
                        markdownLink={`https://raw.githubusercontent.com/wiki/${urlRepo}/${sidebar}`}
                        transformLinkUri={transformLinkUri}
                    />
                </Grid>
                <Grid xs={2}
                    sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                />
            </Grid>
        </>
    );
};

export default Wiki;
