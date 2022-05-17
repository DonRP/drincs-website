import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import { Grid } from "@mui/material";
import DRDownloadGrid from "components/DRDownloadGrid";

const rowsABFD = [
    { id: 0, device: { name: 'Windows/Linux', icon: <DesktopWindowsIcon sx={{ fontSize: 60 }} /> }, version: 'v0.1.1', download: { mega: "https://mega.nz/file/zwtkUY4L#TTS6XJ7y4trltyaU1qRVeYZT7g3cfhKu0_avGKkczCQ" } },
    { id: 1, device: { name: 'Windows/Linux QHD', icon: <DesktopWindowsIcon sx={{ fontSize: 60 }} /> }, version: 'v0.1.1', download: { mega: "https://mega.nz/file/b1tQnKjT#Q0WG8su9jv994F2Hn7u31_I9HkBpDP5afUCsa6lBCfk" } },
    { id: 2, device: { name: 'MacOS', icon: <AppleIcon sx={{ fontSize: 60 }} /> }, version: 'v0.1.1', download: { mega: "https://mega.nz/file/6k0QTYAC#SpxeDO3tuoP_PjhRv08qIgx1FyQfNGPzmUq2ag09Dhg " } },
    { id: 3, device: { name: 'Android', icon: <AndroidIcon sx={{ fontSize: 60 }} /> }, version: 'v0.1.1', download: { mega: "https://mega.nz/file/OkcHVIJa#dOyelMAS49RuBkzmbv2bPBxrxgo4n_wHqQ-63AAbRtY" } },
];

function Download() {
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
                <h2>Download</h2>
                <DRDownloadGrid
                    title="A Big Family in Debit"
                    data={rowsABFD}
                    height={411}
                />
            </Grid>
        </>
    );
}

export default Download;
