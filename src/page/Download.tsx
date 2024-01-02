import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { Grid } from '@mui/joy';
import DownloadGrid, { IDownloadGridRow } from 'components/Grid/DownloadGrid';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { analyticPageView } from 'utility/Analytics';

const rowsABFD: (t: TFunction<[string]>) => IDownloadGridRow[] = (t) => {
    return [
        {
            id: 0, device: {
                name: `${t("windowsos")}/${t("linux")}`, element: <>
                    <Grid
                        container
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="center"
                        alignItems="center"
                        spacing={{ xs: 0, md: 4 }}
                    >
                        <Grid  >
                            <DesktopWindowsIcon sx={{ fontSize: 40, display: { xs: 'flex', md: 'none' } }} />
                            <DesktopWindowsIcon sx={{ fontSize: 30, display: { xs: 'none', md: 'flex' } }} />
                        </Grid>
                        <Grid sx={{ fontSize: 15, display: { xs: 'none', md: 'flex' } }} >
                            {`${t("windowsos")}/${t("linux")}`}
                        </Grid>
                        <Grid sx={{ fontSize: 10, display: { xs: 'flex', md: 'none' } }} >
                            {`${t("windowsos")}/${t("linux")}`}
                        </Grid>
                    </Grid>
                </>
            }, version: 'v0.1.1', download: {
                mega: "https://mega.nz/file/b1tQnKjT#Q0WG8su9jv994F2Hn7u31_I9HkBpDP5afUCsa6lBCfk"
            }
        },
        {
            id: 1, device: {
                name: `${t("windowsos")}/${t("linux")} ${t("compressed")}`, element: <>
                    <Grid
                        container
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="center"
                        alignItems="center"
                        spacing={{ xs: 0, md: 4 }}
                    >
                        <Grid  >
                            <FolderZipIcon sx={{ fontSize: 40, display: { xs: 'flex', md: 'none' } }} />
                            <FolderZipIcon sx={{ fontSize: 30, display: { xs: 'none', md: 'flex' } }} />
                        </Grid>
                        <Grid sx={{ fontSize: 15, display: { xs: 'none', lg: 'flex' } }} >
                            {`${t("windowsos")}/${t("linux")} ${t("compressed")}`}
                        </Grid>
                        <Grid sx={{ fontSize: 15, display: { xs: 'none', md: 'flex', lg: 'none' } }} >
                            {t("compressed")}
                        </Grid>
                        <Grid sx={{ fontSize: 10, display: { xs: 'flex', md: 'none' } }} >
                            {t("compressed")}
                        </Grid>
                    </Grid>
                </>
            }, version: 'v0.1.1', download: {
                mega: "https://mega.nz/file/zwtkUY4L#TTS6XJ7y4trltyaU1qRVeYZT7g3cfhKu0_avGKkczCQ"
            }
        },
        {
            id: 2, device: {
                name: t("macos"), element: <>
                    <Grid
                        container
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="center"
                        alignItems="center"
                        spacing={{ xs: 0, md: 4 }}
                    >
                        <Grid  >
                            <AppleIcon sx={{ fontSize: 40, display: { xs: 'flex', md: 'none' } }} />
                            <AppleIcon sx={{ fontSize: 30, display: { xs: 'none', md: 'flex' } }} />
                        </Grid>
                        <Grid sx={{ fontSize: 15, display: { xs: 'none', md: 'flex' } }} >
                            {t("macos")}
                        </Grid>
                        <Grid sx={{ fontSize: 10, display: { xs: 'flex', md: 'none' } }} >
                            {t("macos")}
                        </Grid>
                    </Grid>
                </>
            }, version: 'v0.1.1', download: {
                mega: "https://mega.nz/file/6k0QTYAC#SpxeDO3tuoP_PjhRv08qIgx1FyQfNGPzmUq2ag09Dhg"
            }
        },
        {
            id: 3, device: {
                name: t("android"), element: <>
                    <Grid
                        container
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="center"
                        alignItems="center"
                        spacing={{ xs: 0, md: 4 }}
                    >
                        <Grid  >
                            <AndroidIcon sx={{ fontSize: 40, display: { xs: 'flex', md: 'none' } }} />
                            <AndroidIcon sx={{ fontSize: 30, display: { xs: 'none', md: 'flex' } }} />
                        </Grid>
                        <Grid sx={{ fontSize: 15, display: { xs: 'none', md: 'flex' } }} >
                            {t("android")}
                        </Grid>
                        <Grid sx={{ fontSize: 10, display: { xs: 'flex', md: 'none' } }} >
                            {t("android")}
                        </Grid>
                    </Grid>
                </>

            }, version: 'v0.1.1', download: {
                mega: "https://mega.nz/file/OkcHVIJa#dOyelMAS49RuBkzmbv2bPBxrxgo4n_wHqQ-63AAbRtY"
            }
        },
    ];
}

function Download() {
    analyticPageView("Download")
    const { t } = useTranslation(["translation"]);

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                paddingTop={3}
                paddingBottom={3}
            >
                <h2>{t("download")}</h2>
                <DownloadGrid
                    title="A Big Family in Debit"
                    data={rowsABFD(t)}
                    height={358}
                />
            </Grid>
        </>
    );
}

export default Download;
