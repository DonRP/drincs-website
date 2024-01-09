import EngineeringIcon from '@mui/icons-material/Engineering';
import { Grid } from '@mui/joy';
import DRAlert from 'components/DRAlert';
import DRTranslationGrid from 'components/DRTranslationGrid';
import { ProjectsEnum } from 'enum/ProjectsEnum';
import { useTranslation } from 'react-i18next';
import { analyticPageView } from 'utility/Analytics';

const OtherTranslationProjects = [
    ProjectsEnum.AFamilyVenture,
    ProjectsEnum.AmityPark,
    ProjectsEnum.AnotherChance,
    ProjectsEnum.BadMemories,
    ProjectsEnum.BigBrotherAS,
    ProjectsEnum.NarutoShinobiLord,
    ProjectsEnum.WitchHunter,
]

function Translations() {
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
            <DRAlert
                startDecorator={<EngineeringIcon />}
                color="warning"
            >
                {t("slow_loading_info")}
            </DRAlert>
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

export default Translations;
