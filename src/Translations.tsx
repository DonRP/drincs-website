import { Grid } from '@mui/material';
import { OltherTranslationNotCompleteAtom } from 'atom/OltherTranslationNotCompleteAtom';
import DRTranslationGrid from 'components/DRTranslationGrid';
import { ProjectsEnum } from 'enum/ProjectsEnum';
import { useRecoilState } from 'recoil';

const OtherTranslationProjects = [
    ProjectsEnum.AFamilyVenture,
    ProjectsEnum.AmityPark,
    ProjectsEnum.BadMemories,
    ProjectsEnum.BigBrotherAS,
    ProjectsEnum.WitchHunter,
]

function Translations() {
    const [oltherTranslationNotComplete, setOltherTranslationNotComplete] = useRecoilState(OltherTranslationNotCompleteAtom);
    if (oltherTranslationNotComplete.length !== OtherTranslationProjects.length) {
        setOltherTranslationNotComplete(OtherTranslationProjects.map((a) => {
            return a.toString()
        }))
    }

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
                        NotCompleteListAtom={OltherTranslationNotCompleteAtom}
                    />
                </Grid>
            )}
        </Grid>
    );
}

export default Translations;
