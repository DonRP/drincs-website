import { Grid } from '@mui/material';
import DRTranslationGrid from 'components/DRTranslationGrid';
import * as React from 'react';


function Translations() {
    const projectsId = [
        { crowdin: "492487", github: "DonRP/AFV" },
        { crowdin: "461654", github: "DonRP/BBAS" },
    ]

    return (
        <>
            <h2>Altri GIochi</h2>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={4}
                pt={3}
                mb={3}
            >
                {projectsId.map((item, index) =>
                    <Grid item key={item.crowdin} >
                        <DRTranslationGrid projectId={item.crowdin} gitRepo={item.github} />
                    </Grid>
                )}
            </Grid>
        </>
    );
}

export default Translations;
