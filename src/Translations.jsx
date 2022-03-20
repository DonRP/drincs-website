import { Grid } from '@mui/material';
import DRTranslationGrid from 'components/DRTranslationGrid';
import * as React from 'react';


function Translations() {
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
                <Grid item  >
                    <DRTranslationGrid />
                </Grid>
                <Grid item  >
                    <DRTranslationGrid />
                </Grid>
            </Grid>
        </>
    );
}

export default Translations;
