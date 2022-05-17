import { Button, Card, CardHeader, CardMedia, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

const columns = [
    {
        field: 'device',
        headerName: 'Device',
        flex: 1,
        minWidth: 100,
        renderCell: (params: any) => (
            <strong>
                <Grid
                    container
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 0, sm: 2, md: 2 }}
                >
                    {params.value?.icon &&
                        < Grid item  >
                            {params.value?.icon}
                        </Grid>
                    }
                    <Grid item  >
                        {params.value?.name}
                    </Grid>
                </Grid>
            </strong >
        ),
    },
    {
        field: 'version',
        headerName: 'Version',
        flex: 1,
        minWidth: 50,
        renderCell: (params: any) => (
            <strong>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    {params.value}
                </Box>
            </strong >
        ),
    },
    {
        field: 'download',
        headerName: 'Download',
        flex: 1,
        minWidth: 375,
        renderCell: (params: any) => (
            <strong>
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
            </strong >
        ),
    },
];
type IDownloadLink = {
    mega?: string,
    mediafire?: string,
    sha?: string,
}
type IDownloadGridRow = {
    id: number,
    device: { name: string, icon?: JSX.Element }
    version: string,
    download: IDownloadLink,
}
type IDRDownloadGridProps = {
    title: string,
    data: IDownloadGridRow[],
    logoImage?: string,
    height?: number,
    rowHeight?: number,
}

function DRDownloadGrid(props: IDRDownloadGridProps) {
    const { title, data, logoImage, height = 350, rowHeight = 75 } = props;

    try {
        return (
            <Card elevation={24} sx={{ maxWidth: 900 }}>
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
                        rowHeight={rowHeight}
                    />
                </div>
            </Card>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>DRDownloadGrid error</div>
    }
}

export default DRDownloadGrid;