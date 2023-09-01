import WarningIcon from '@mui/icons-material/Warning';
import { Box, Card, Grid, Stack, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import DRAlert from "components/DRAlert";
import DRSupportCard from "components/DRSupportCard";
import DRTable from "components/DRTable";
import GifsGrid, { IGifGridRow } from 'components/Grid/GifsGrid';
import { gitHubLink } from "constant";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import { analyticPageView } from "utility/Analytics";

type SupportDataType = {
    card: ReactElement,
    discord_role: boolean,
    voting_power: boolean,
    news: boolean,
}

const data: SupportDataType[] = [
    {
        card: <DRSupportCard
            stars={1}
            title="Official Supporter"
            month_price={2}
            year_price={20}
        />,
        discord_role: true,
        news: true,
        voting_power: false,
    },

    {
        card: <DRSupportCard
            stars={2}
            title="Super Supporter"
            month_price={5}
            year_price={50}
        />,
        discord_role: true,
        news: true,
        voting_power: true,
    },
    {
        card: <DRSupportCard
            stars={3}
            title="Mega Supporter"
            month_price={10}
            year_price={100}
        />,
        discord_role: true,
        news: true,
        voting_power: true,
    },
    {
        card: <DRSupportCard
            stars={4}
            title="Ultra Supporter"
            month_price={15}
            year_price={150}
        />,
        discord_role: true,
        news: true,
        voting_power: true,
    },
    {
        card: <DRSupportCard
            stars={5}
            title="VIP Supporter"
            month_price={20}
            year_price={200}
        />,
        discord_role: true,
        news: true,
        voting_power: true,
    },
];

const gifs: IGifGridRow[] = [
    {
        logo: <>
        </>,
        link: "https://www.buymeacoffee.com/DRincs",
    },
];

function Support() {
    analyticPageView("Support")

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Stack
                    spacing={0.2}
                    sx={{
                        width: "98%",
                        marginBottom: 2,
                    }}
                >
                    <DRAlert
                        color="warning"
                        startDecorator={<WarningIcon />}
                    >
                        The awards are still under development. For more information read: <a href={gitHubLink + "/drincs-website/issues/37"}>GitHub issue</a>
                    </DRAlert>
                    <DRAlert
                        color="primary"
                    >
                        To get the rewards you will have to connect to Discord (information <Link to={"howtoconnectwithdiscord"}>here</Link>), or connect with the dedicated support page, es Patreon (<a href={gitHubLink + "/drincs-website/issues/38"}>under development</a>)
                    </DRAlert>
                    <DRAlert
                        color="primary"
                    >
                        The percentage next to the buttons is the percentage that will be retained by the support site. So the higher the percentage the more I'm going to lose out on it
                    </DRAlert>
                </Stack>
                {/* pc */}
                <DRTable
                    sx={{
                        display: { xs: 'none', lg: 'flex' },
                        width: "98%",
                        marginBottom: 2,
                    }}
                    titles={["Plans", "Discord Role", "Private News", "Voting Power"]}
                    data={data}
                    toMirrorAcrossDiagonal
                />
                {/* mobile */}
                <Card
                    sx={{
                        display: { lg: 'none' },
                        width: "90%",
                        marginBottom: 2,
                    }}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs defaultValue={1} >
                            <TabList>
                                <Tab value={0}>Official</Tab>
                                <Tab value={1}>Super</Tab>
                                <Tab value={2}>Mega</Tab>
                                <Tab value={3}>Ultra</Tab>
                                <Tab value={4}>VIP</Tab>
                            </TabList>
                            {data.map((item, index) => {
                                return <TabPanel value={index}>
                                    {item.card}
                                    <DRTable
                                        titles={["Discord Role", "Private News", "Voting Power"]}
                                        data={[Object.values(item).filter((element, index) => { return index !== 0 })]}
                                        toMirrorAcrossDiagonal
                                    />
                                </TabPanel>
                            })}
                        </Tabs>
                    </Box>
                </Card>
                <GifsGrid
                    title={"Gifs"}
                    data={gifs}
                />
            </Grid>
        </>
    );
}

export default Support;
