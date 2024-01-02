import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/joy';
import { Fab } from '@mui/material';
import MarkdownCard from "components/MarkdownCard";
import { UrlTransform } from "react-markdown";
import { analyticPageView } from "utility/Analytics";

type WikiProps = {
    urlRepo: string
    routeLink: string
    sidebar?: string
}

function Wiki(props: WikiProps) {

    const { urlRepo, sidebar = "_Sidebar.md", routeLink } = props
    const transformLinkUri: UrlTransform = (url, key, node) => {
        if (routeLink.includes("https")) {
            return routeLink
        }
        else {
            return `${routeLink}?route=${url}`
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
                spacing={{ xs: 0, lg: 2 }}
                paddingY={3}
                paddingX={{ xs: 0, md: 3 }}
            >
                <Grid xs={0} lg={0.5} xl={1} />
                <Grid xs={12} md={9} lg={8} xl={7}>
                    <MarkdownCard
                        markdownLink={`https://raw.githubusercontent.com/wiki/${urlRepo}/${route}.md`}
                        transformUrl={transformLinkUri}
                    />
                </Grid>
                <Grid xs={12} md={3}>
                    <MarkdownCard
                        markdownLink={`https://raw.githubusercontent.com/wiki/${urlRepo}/${sidebar}`}
                        transformUrl={transformLinkUri}
                    />
                </Grid>
                <Grid xs={0} lg={0.5} xl={1} />
            </Grid>
        </>
    );
};

export default Wiki;
