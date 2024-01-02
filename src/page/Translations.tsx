import EngineeringIcon from '@mui/icons-material/Engineering';
import { Grid } from '@mui/joy';
import DRAlert from 'components/DRAlert';
import DRTranslationGrid from 'components/DRTranslationGrid';
import { ProjectsEnum } from 'enum/ProjectsEnum';
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
            paddingTop={3}
            paddingBottom={3}
        >
            <h2>{t("other_games")}</h2>
            <DRAlert
                startDecorator={<EngineeringIcon />}
                color="warning"
            >
                The loading could be a little slow. I am currently leaving on a free server ...
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
