import { Grid } from "@mui/material";
import DRSupportInfoGrid from "components/DRSupportInfo";

const rowsABFD = [
    {
        id: 0,
        link_support: "https://www.patreon.com/join/DRincs/checkout?rid=4882255",
        site: "patreon",
        membership: {
            long: 'Official Supporter ⭐',
            medium: 'Official Supporter',
            short: "⭐",
        },
        month_price: "1€",
        last_version: false,
        news: true,
        qhd: false,
        android: false,
    },
    {
        id: 1,
        link_support: "https://www.patreon.com/join/DRincs/checkout?rid=4743216",
        site: "patreon",
        membership: {
            long: 'Super Supporter ⭐⭐',
            medium: 'Super Supporter',
            short: "⭐⭐",
        },
        month_price: "5€",
        last_version: true,
        news: true,
        qhd: false,
        android: true,
    },
    {
        id: 2,
        link_support: "https://www.patreon.com/join/DRincs/checkout?rid=4743248",
        site: "patreon",
        membership: {
            long: 'Mega Supporter ⭐⭐⭐',
            medium: 'Mega Supporter',
            short: "Mega",
        },
        month_price: "10€",
        last_version: true,
        news: true,
        qhd: false,
        android: true,
    },
    {
        id: 3,
        link_support: "https://www.patreon.com/join/DRincs/checkout?rid=4743218",
        site: "patreon",
        membership: {
            long: 'Ultra Supporter ⭐⭐⭐⭐',
            medium: 'Ultra Supporter',
            short: "Ultra",
        },
        month_price: "15€",
        last_version: true,
        news: true,
        qhd: true,
        android: true,
    },
    {
        id: 4,
        link_support: "https://www.patreon.com/join/DRincs/checkout?rid=4743258",
        site: "patreon",
        membership: {
            long: 'VIP Supporter ⭐⭐⭐⭐⭐',
            medium: 'VIP Supporter',
            short: "VIP⭐",
        },
        month_price: "20€",
        last_version: true,
        news: true,
        qhd: true,
        android: true,
    },
    {
        id: 5,
        site: "buymeacoffee",
        membership: {
            long: 'Super Supporter ⭐⭐',
            medium: 'Super Supporter',
            short: "⭐⭐",
        },
        month_price: "4€",
        year_price: "40€",
        last_version: true,
        news: false,
        qhd: false,
        android: true,
    },
    {
        id: 6,
        site: "buymeacoffee",
        membership: {
            long: 'Mega Supporter ⭐⭐⭐',
            medium: 'Mega Supporter',
            short: "Mega",
        },
        month_price: "8€",
        year_price: "80€",
        last_version: true,
        news: false,
        qhd: false,
        android: true,
    },
    {
        id: 7,
        site: "buymeacoffee",
        membership: {
            long: 'Ultra Supporter ⭐⭐⭐⭐',
            medium: 'Ultra Supporter',
            short: "Ultra",
        },
        month_price: "12€",
        year_price: "120€",
        last_version: true,
        news: false,
        qhd: true,
        android: true,
    },
    {
        id: 8,
        site: "buymeacoffee",
        membership: {
            long: 'VIP Supporter ⭐⭐⭐⭐⭐',
            medium: 'VIP Supporter',
            short: "VIP⭐",
        },
        month_price: "15€",
        year_price: "150€",
        last_version: true,
        news: false,
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
                <h2>Support</h2>
                <DRSupportInfoGrid
                    title="THANKS!! In advance!❤️"
                    data={rowsABFD}
                    height={900}
                />
            </Grid>
        </>
    );
}

export default Support;
