import { Button, Card, CardHeader, CardMedia, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

const columns = [
    {
        field: 'device',
        headerName: 'Device',
        width: 150,
        renderCell: (params) => (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                {params.value}
            </Box>
        ),
    },
    {
        field: 'version',
        headerName: 'Version',
        width: 70,
        height: 200,
        renderCell: (params) => (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                {params.value}
            </Box>
        ),
    },
    {
        field: 'download',
        headerName: 'Download',
        width: 375,
        renderCell: (params) => (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item>
                            {params.value?.mediafire &&
                                <Button
                                    variant="outlined"
                                    startIcon={
                                        <img src="https://cdn.worldvectorlogo.com/logos/mediafire-1.svg" width={24} height={24} alt="Logo" />
                                    }
                                    onClick={() => {
                                        window.open(params.value?.mediafire)
                                    }}
                                >
                                    Mediafire
                                </Button>
                            }
                        </Grid>
                        <Grid item>
                            {params.value?.mega &&
                                <Button
                                    variant="outlined"
                                    startIcon={
                                        <img src="https://seeklogo.com/images/M/mega-icon-logo-75FF6A408B-seeklogo.com.png" width={24} height={24} alt="Logo" />
                                    }
                                    onClick={() => {
                                        window.open(params.value?.mega)
                                    }}
                                >
                                    Mega
                                </Button>
                            }
                        </Grid>
                    </Grid>
                    {params.value?.sha && "SHA1: " + params.value?.sha}
                </Grid>
            </Box>
        ),
    },
];

function DRDownloadGrid(props) {
    const { title, data, logoImage, height = 350 } = props;

    return (
        <Card elevation={24} sx={{ maxWidth: 900, minWidth: 700 }}>
            <CardHeader
                title={title}
            />
            {logoImage && <CardMedia
                component="img"
                image={logoImage}
            />}
            <div style={{ height: height, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    rowHeight={75}
                />
            </div>
        </Card>
    );
}

export default DRDownloadGrid;