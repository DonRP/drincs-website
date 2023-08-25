import { Box, Grid } from '@mui/joy';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DRGrid, { IDRGridBaseProps } from 'components/DRGrid';
import { DRButtonNoMargin } from '../DRButton';

type IDownloadLink = {
    mega?: string,
    mediafire?: string,
    discord?: boolean,
    sha?: string,
}
type IDownloadDevice = {
    name: string
    element?: JSX.Element
}
export type IDownloadGridRow = {
    id: number,
    device: IDownloadDevice
    version: string,
    download: IDownloadLink,
}

const columns: GridColDef<IDownloadGridRow>[] = [
    {
        field: 'device',
        headerName: 'Device',
        flex: 1,
        minWidth: 25,
        renderCell: (params: GridRenderCellParams<IDownloadGridRow, IDownloadDevice>) => (
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
        field: 'version',
        headerName: 'Version',
        flex: 1,
        minWidth: 25,
        renderCell: (params: GridRenderCellParams<IDownloadGridRow, string>) => (
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
        minWidth: 200,
        renderCell: (params: GridRenderCellParams<IDownloadGridRow, IDownloadLink>) => (
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

interface IDownloadGridProps extends IDRGridBaseProps<IDownloadGridRow> {
}

function DownloadGrid(props: IDownloadGridProps) {
    const { title, data, logoImage, height, rowHeight } = props;

    return (
        <DRGrid
            title={title}
            data={data}
            columns={columns}
            logoImage={logoImage}
            height={height}
            rowHeight={rowHeight}
            hideFooter
        />
    );
}

export default DownloadGrid;