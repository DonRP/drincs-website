import { Grid } from "@mui/material";
import DRSupportCard from "components/DRSupportCard";
import DRTable from "components/DRTable";
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
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
            >
                <DRTable
                    titles={["Plans", "last_version", "news", "qhd", "android"]}
                    data={data}
                    toMirrorAcrossDiagonal
                />
            </Grid>
        </>
    );
}

export default Support;
