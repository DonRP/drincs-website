import { Grid } from '@mui/material';
import DRTranslationGrid from 'components/DRTranslationGrid';


function Translations() {
    const projectsId = [
        { crowdin: "492487", github: "DonRP/AFV", crowdinLink: "https://crowdin.com/project/a-family-venture" },
        { crowdin: "528084", github: "DonRP/AmityPark", crowdinLink: "https://crowdin.com/project/amity-park" },
        { crowdin: "461654", github: "DonRP/BBAS", crowdinLink: "https://crowdin.com/project/big-brother-as" },
        { crowdin: "507994", github: "DonRP/BM", crowdinLink: "https://crowdin.com/project/bad-memories" },
    ]

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={4}
                pt={4}
            >
                <h2>Other Games</h2>
                {projectsId.map((item, index) =>
                    <Grid item key={item.crowdin} >
                        <DRTranslationGrid
                            crowdinProjectId={item.crowdin}
                            githubRepoName={item.github}
                            crowdinLink={item.crowdinLink}
                            height={500}
                            rowHeight={70}
                        />
                    </Grid>
                )}
            </Grid>
        </>
    );
}

export default Translations;
