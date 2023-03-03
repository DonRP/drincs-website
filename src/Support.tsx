import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Card, Grid, Tab } from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import DRSupportCard from "components/DRSupportCard";
import DRTable from "components/DRTable";
import * as React from 'react';
import { useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";

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
        />,
        news: true,
        voting_power: false,
    },
    {
        card: <DRSupportCard
            stars={2}
            title="Super Supporter"
            month_price={5}
        />,
        news: true,
        voting_power: true,
    },
    {
        card: <DRSupportCard
            stars={3}
            title="Mega Supporter"
            month_price={10}
        />,
        news: true,
        voting_power: true,
    },
    {
        card: <DRSupportCard
            stars={4}
            title="Ultra Supporter"
            month_price={15}
        />,
        news: true,
        voting_power: true,
    },
    {
        card: <DRSupportCard
            stars={5}
            title="VIP Supporter"
            month_price={20}
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
                    <Alert severity="warning">I premi sono ancora in fase di sviluppo per maggiore informazione</Alert>
                    <Alert severity="info">Per ottenere i premi dovrai regisatrarti a questo sito e collegarti con discord (aggiori informazioni qui), oppure collegariti con la pagina di supporto dedicata (in fase di sviluppo)</Alert>
                    <Alert severity="info">Per favore non sostenermi per ottenere ....</Alert>
                    <Alert severity="info">La percentuale attorno i bottoni è la percentuale che verra trattenuta dal sito di supporto. Quindi più è alta la percentuale più ci andro a perdere</Alert>
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
