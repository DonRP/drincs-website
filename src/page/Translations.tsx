import { Alert, Grid } from '@drincs/react-components';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useTranslation } from 'react-i18next';
import DRTranslationGrid from '../components/DRTranslationGrid';
import { ProjectsEnum } from '../enum/ProjectsEnum';
import { analyticPageView } from '../utility/Analytics';

const OtherTranslationProjects = [
    ProjectsEnum.AFamilyVenture,
    ProjectsEnum.AmityPark,
    ProjectsEnum.AnotherChance,
    ProjectsEnum.BadMemories,
    ProjectsEnum.BigBrotherAS,
    ProjectsEnum.NarutoShinobiLord,
    ProjectsEnum.WitchHunter,
]

export default function Translations() {
    const { t } = useTranslation(["translation"]);
    analyticPageView("Translations")

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            paddingY={3}
        >
            <h2>{t("other_games")}</h2>
            <Alert
                startDecorator={<EngineeringIcon />}
                color="warning"
                elevation="sm"
            >
                {t("slow_loading_info")}
            </Alert>
            {OtherTranslationProjects.map((item) =>
                <Grid
                    key={item}
                    marginTop={2}
                >
                    <DRTranslationGrid
                        projectId={item}
                        height={500}
                        rowHeight={70}
                    />
                </Grid>
            )}
        </Grid>
    );
}
