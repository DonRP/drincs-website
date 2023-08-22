import { Grid } from '@mui/material';
import DRTranslationGrid from 'components/DRTranslationGrid';
import { ProjectsEnum } from 'enum/ProjectsEnum';
import { analyticPageView } from 'utility/Analytics';

const OtherTranslationProjects = [
    ProjectsEnum.AFamilyVenture,
    ProjectsEnum.AmityPark,
    ProjectsEnum.BadMemories,
    ProjectsEnum.BigBrotherAS,
    ProjectsEnum.WitchHunter,
]

function Translations() {
    analyticPageView("Translations")

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={4}
            pt={4}
        >
            <h2>Other Games</h2>
            {OtherTranslationProjects.map((item) =>
                <Grid item key={item} >
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
