import { AspectRatio, Box, Card, Grid, Typography } from '@mui/joy';
import { DataGrid } from '@mui/x-data-grid';
import { DRButtonNoMargin } from './DRButton';
import DRErrorComponent from './DRErrorComponent';

const columns = [
    {
        field: 'description',
        headerName: 'Description',
        flex: 1,
        minWidth: 25,
        renderCell: (params: any) => (
            <strong>
                {params.value?.element &&
                    <>
                        {params.value?.element}
                    </>
                }
                {!params.value?.element &&
                    <>
                        {params.value?.name}
                    </>
                }
            </strong >
        ),
    },
    {
        field: 'download',
        headerName: 'Download',
        minWidth: 350,
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
                            <Grid>
                                {params.value?.mediafire &&
                                    <DRButtonNoMargin
                                        label='Mediafire'
                                        variant="outlined"
                                        startIcon={
                                            <img src="https://cdn.worldvectorlogo.com/logos/mediafire-1.svg" width={24} height={24} alt="Logo" />
                                        }
                                        onClick={() => {
                                            window.open(params.value?.mediafire)
                                        }}
                                        color='success'
                                    />
                                }
                            </Grid>
                            <Grid>
                                {params.value?.mega &&
                                    <DRButtonNoMargin
                                        label='Mega'
                                        variant='soft'
                                        startIcon={
                                            <img src="https://seeklogo.com/images/M/mega-icon-logo-75FF6A408B-seeklogo.com.png" width={24} height={24} alt="Logo" />
                                        }
                                        onClick={() => {
                                            window.open(params.value?.mega)
                                        }}
                                    />
                                }
                            </Grid>
                            <Grid>
                                {params.value?.discord &&
                                    <DRButtonNoMargin
                                        label='Discord - Supporter'
                                        variant='soft'
                                        startIcon={
                                            <img src="https://www.svgrepo.com/show/331368/discord-v2.svg" width={24} height={24} alt="Logo" />
                                        }
                                        onClick={() => {
                                            window.open("https://discord.gg/HFfeJKR")
                                        }}
                                    />
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
type IReportLink = {
    mega?: string,
    mediafire?: string,
    discord?: boolean,
    sha?: string,
}
export type IReportGridRow = {
    id: number,
    title: string
    description: string
    download: IReportLink,
}
type IDRReportGridProps = {
    title: string,
    data: IReportGridRow[],
    logoImage?: string,
    height?: number,
    rowHeight?: number,
}

function DRReportGrid(props: IDRReportGridProps) {
    const { title, data, logoImage, height = 350, rowHeight = 75 } = props;

    try {
        return (
            <Card
                // elevation={24} 
                sx={{ minWidth: { xs: 470, sm: 600, md: 900 }, marginTop: 2 }}
            >
                <Typography level="title-lg">{title}</Typography>
                {logoImage &&
                    <AspectRatio minHeight="120px" maxHeight="200px">
                        <img
                            src={logoImage}
                            alt=""
                        />
                    </AspectRatio>
                }
                <div style={{ height: height, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        rowHeight={rowHeight}
                        hideFooter
                        hideFooterPagination
                        hideFooterSelectedRowCount
                    />
                </div>
            </Card>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRDownloadGrid"} />
    }
}

export default DRReportGrid;