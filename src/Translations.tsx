import { Grid } from '@mui/material';
import { OltherTranslationNotCompleteAtom } from 'atom/OltherTranslationNotCompleteAtom';
import DRTranslationGrid from 'components/DRTranslationGrid';
import { useRecoilState } from 'recoil';

const OtherTranslationProjectsData = [
    { crowdin: "492487", github: "DonRP/AFV", crowdinLink: "https://crowdin.com/project/a-family-venture" },
    { crowdin: "528084", github: "DonRP/AmityPark", crowdinLink: "https://crowdin.com/project/amity-park" },
    { crowdin: "461654", github: "DonRP/BBAS", crowdinLink: "https://crowdin.com/project/big-brother-as" },
    { crowdin: "507994", github: "DonRP/BM", crowdinLink: "https://crowdin.com/project/bad-memories" },
    { crowdin: "557133", github: "DonRP/WitchHunter", crowdinLink: "https://crowdin.com/project/witch-hunter" },
]

function Translations() {
    const [oltherTranslationNotComplete, setOltherTranslationNotComplete] = useRecoilState(OltherTranslationNotCompleteAtom);
    if (oltherTranslationNotComplete.length !== OtherTranslationProjectsData.length) {
        setOltherTranslationNotComplete(OtherTranslationProjectsData.map((a) => {
            return a.crowdin
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
            {OtherTranslationProjectsData.map((item, index) =>
                <Grid item key={item.crowdin} >
                    <DRTranslationGrid
                        crowdinProjectId={item.crowdin}
                        githubRepoName={item.github}
                        crowdinLink={item.crowdinLink}
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
