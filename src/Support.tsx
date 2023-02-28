import { Grid } from "@mui/material";
import DRSupportCard from "components/DRSupportCard";
import DRTable from "components/DRTable";
import { ReactElement } from "react-markdown/lib/react-markdown";

type SupportDataType = {
    card?: ReactElement,
    link_support: string,
    site: string,
    membership?: {
        long: string,
        medium: string,
        short: string,
    },
    month_price: string,
    last_version: boolean,
    news: boolean,
    qhd: boolean,
    android: boolean,
}

const data: SupportDataType[] = [
    {
        card: <DRSupportCard />,
        link_support: "https://www.patreon.com/join/DRincs/checkout?rid=4882255",
        site: "patreon",
        // membership: {
        //     long: 'Official Supporter ⭐',
        //     medium: 'Official Supporter',
        //     short: "⭐",
        // },
        month_price: "1€",
        last_version: false,
        news: true,
        qhd: false,
        android: false,
    },
    {
        card: <DRSupportCard />,
        link_support: "https://www.patreon.com/join/DRincs/checkout?rid=4743216",
        site: "patreon",
        // membership: {
        //     long: 'Super Supporter ⭐⭐',
        //     medium: 'Super Supporter',
        //     short: "⭐⭐",
        // },
        month_price: "5€",
        last_version: true,
        news: true,
        qhd: false,
        android: true,
    },
    {
        card: <DRSupportCard />,
        link_support: "https://www.patreon.com/join/DRincs/checkout?rid=4743248",
        site: "patreon",
        // membership: {
        //     long: 'Mega Supporter ⭐⭐⭐',
        //     medium: 'Mega Supporter',
        //     short: "Mega",
        // },
        month_price: "10€",
        last_version: true,
        news: true,
        qhd: false,
        android: true,
    },
    // {
    //     card: <DRSupportCard />,
    //     link_support: "https://www.patreon.com/join/DRincs/checkout?rid=4743218",
    //     site: "patreon",
    //     // membership: {
    //     //     long: 'Ultra Supporter ⭐⭐⭐⭐',
    //     //     medium: 'Ultra Supporter',
    //     //     short: "Ultra",
    //     // },
    //     month_price: "15€",
    //     last_version: true,
    //     news: true,
    //     qhd: true,
    //     android: true,
    // },
    // {
    //     card: <DRSupportCard />,
    //     link_support: "https://www.patreon.com/join/DRincs/checkout?rid=4743258",
    //     site: "patreon",
    //     // membership: {
    //     //     long: 'VIP Supporter ⭐⭐⭐⭐⭐',
    //     //     medium: 'VIP Supporter',
    //     //     short: "VIP⭐",
    //     // },
    //     month_price: "20€",
    //     last_version: true,
    //     news: true,
    //     qhd: true,
    //     android: true,
    // },
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
                <h2>Support</h2>
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
