import { Grid } from '@mui/material';
import DRTranslationGrid from 'components/DRTranslationGrid';
import * as React from 'react';


function Translations() {
    const projectsId = [
        "461654",
        "492487",
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
                    <Grid item  >
                        <DRTranslationGrid projectId={item} />
                    </Grid>
                )}
            </Grid>
        </>
    );
}

export default Translations;
