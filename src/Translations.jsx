import { Grid } from '@mui/material';
import TranslationGrid from 'components/TranslationGrid';
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
                    <TranslationGrid />
                </Grid>
                <Grid item  >
                    <TranslationGrid />
                </Grid>
            </Grid>
        </>
    );
}

export default Translations;
