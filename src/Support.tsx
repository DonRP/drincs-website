import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Card, Grid, Tab } from "@mui/material";
import DRSupportCard from "components/DRSupportCard";
import DRTable from "components/DRTable";
import { useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";

type SupportDataType = {
    card: ReactElement,
    last_version: boolean,
    news: boolean,
    qhd: boolean,
    android: boolean,
}

const data: SupportDataType[] = [
    {
        card: <DRSupportCard
            stars={1}
            title="Official Supporter"
            month_price={2}
        />,
        last_version: false,
        news: true,
        qhd: false,
        android: false,
    },
    {
        card: <DRSupportCard
            stars={2}
            title="Super Supporter"
            month_price={5}
        />,
        last_version: true,
        news: true,
        qhd: false,
        android: true,
    },
    {
        card: <DRSupportCard
            stars={3}
            title="Mega Supporter"
            month_price={10}
        />,
        last_version: true,
        news: true,
        qhd: false,
        android: true,
    },
    {
        card: <DRSupportCard
            stars={4}
            title="Ultra Supporter"
            month_price={15}
        />,
        last_version: true,
        news: true,
        qhd: true,
        android: true,
    },
    {
        card: <DRSupportCard
            stars={5}
            title="VIP Supporter"
            month_price={20}
        />,
        last_version: true,
        news: true,
        qhd: true,
        android: true,
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
                {/* pc */}
                <DRTable
                    sx={{ display: { xs: 'none', lg: 'flex' } }}
                    titles={["Plans", "last_version", "news", "qhd", "android"]}
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
                                    titles={["last_version", "news", "qhd", "android"]}
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
