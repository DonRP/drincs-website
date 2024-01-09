import { Grid } from '@mui/joy';
import DownloadGrid from 'components/Grid/DownloadGrid';
import { ABFDrepo } from 'constant';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { analyticPageView } from 'utility/Analytics';
import { rowsABFD } from './Download/downloadRows';

function Download() {
    analyticPageView("Download")
    let navigate = useNavigate();
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
                    // logoImage='https://raw.githubusercontent.com/DonRP/ABFD/master/game/gui/main_menu.webp'
                    rows={rowsABFD(t)}
                    height={358}
                    openWiki={() => navigate("/wiki")}
                    openDazAssert={() => navigate("/daz-assert")}
                    openGithub={() => window.open(`https://github.com/${ABFDrepo}`)}
                />
            </Grid>
        </>
    );
}

export default Download;
