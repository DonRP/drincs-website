import { Grid } from '@mui/material';
import DRTranslationGrid from 'components/DRTranslationGrid';


function Translations() {
    const projectsId = [
        { crowdin: "492487", github: "DonRP/AFV" },
        { crowdin: "461654", github: "DonRP/BBAS" },
        { crowdin: "507994", github: "DonRP/BM" },
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
                            projectId={item.crowdin}
                            gitRepo={item.github}
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
