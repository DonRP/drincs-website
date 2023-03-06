import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Card, Grid, Tab } from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import DRSupportCard from "components/DRSupportCard";
import DRTable from "components/DRTable";
import * as React from 'react';
import { useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";

type SupportDataType = {
    card: ReactElement,
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
        news: true,
        voting_power: true,
    },
];

function Support() {
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

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
                    <Alert severity="warning">The awards are still under development. For more information read: <a href="https://github.com/DRincs-Productions/drincs-website/issues/37">GitHub issue</a></Alert>
                    <Alert severity="info">To get the rewards you will have to connect to Discord (information <Link to={"howtoconnectwithdiscord"}>here</Link>), or connect with the dedicated support page, es Patreon (<a href="https://github.com/DRincs-Productions/drincs-website/issues/38">under development</a>)</Alert>
                    <Alert severity="info">The percentage next to the buttons is the percentage that will be retained by the support site. So the higher the percentage the more I'm going to lose out on it</Alert>
                </Stack>
                {/* pc */}
                <DRTable
                    sx={{
                        display: { xs: 'none', lg: 'flex' },
                        width: "98%",
                        marginBottom: 2,
                    }}
                    titles={["Plans", "News", "Voting Power"]}
                    data={data}
                    toMirrorAcrossDiagonal
                />
                {/* mobile */}
                <Card
                    sx={{
                        display: { lg: 'none' },
                        width: "98%",
                        marginBottom: 2,
                    }}
                >
                    <TabContext value={value} >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} >
                                <Tab label={"Official"} value={"0"} />
                                <Tab label={"Super"} value={"1"} />
                                <Tab label={"Mega"} value={"2"} />
                                <Tab label={"Ultra"} value={"3"} />
                                <Tab label={"VIP"} value={"4"} />
                            </TabList>
                        </Box>
                        {data.map((item, index) => {
                            return <TabPanel value={index.toString()}>
                                {item.card}
                                <DRTable
                                    titles={["News", "Voting Power"]}
                                    data={[Object.values(item).filter((element, index) => { return index !== 0 })]}
                                    toMirrorAcrossDiagonal
                                />
                            </TabPanel>
                        })}
                    </TabContext>
                </Card>
            </Grid>
        </>
    );
}

export default Support;
