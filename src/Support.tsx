import { Grid } from "@mui/material";
import DRSupportInfoGrid from "components/DRSupportInfo";


const rowsABFD = [
    { id: 0, platform: "patreon", membership: 'v0.1.1', month_price: 2, discord: true, news: true, link: "string" },
    { id: 1, platform: "patreon", membership: 'v0.1.1', month_price: 3, discord: true, news: true, link: "string" },
    { id: 2, platform: "buymeacoffee", membership: 'v0.1.1', month_price: 4, discord: true, news: false, link: "string" },
    { id: 3, platform: "buymeacoffee", membership: 'v0.1.1', month_price: 5, discord: false, news: false, link: "string" },
];

function Support() {
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={4}
                pt={3}
                mb={3}
            >
                <DRSupportInfoGrid
                    title="A Big Family in Debit"
                    data={rowsABFD}
                    height={411}
                />
            </Grid>
        </>
    );
}

export default Support;
