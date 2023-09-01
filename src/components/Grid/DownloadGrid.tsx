import GTranslateIcon from '@mui/icons-material/GTranslate';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { Box, Grid } from '@mui/joy';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DRDataGrid, { IDRDataGridProps } from 'components/DRDataGrid';
import DRIconButton from 'components/DRIconButton';
import { discordLink } from 'constant';
import { useNavigate } from 'react-router-dom';
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
                                            window.open(discordLink)
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

interface IProps extends IDRDataGridProps<IDownloadGridRow> {
    openWiki?: () => void
    openDazAssert?: () => void
    translate?: boolean
}

function DownloadGrid(props: IProps) {
    const {
        title,
        data,
        logoImage,
        height,
        rowHeight,
        openWiki,
        openDazAssert,
        translate
    } = props;
    let navigate = useNavigate();

    return (
        <DRDataGrid
            title={title}
            data={data}
            columns={columns}
            logoImage={logoImage}
            height={height}
            rowHeight={rowHeight}
            hideFooter
            actions={
                <>
                    {openWiki &&
                        <DRIconButton
                            icon={<MenuBookIcon />}
                            ariaLabel="Wiki"
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: '1.5rem' }}
                            onClick={openWiki}
                        />
                    }
                    {translate &&
                        <DRIconButton
                            icon={<GTranslateIcon />}
                            ariaLabel="Translate"
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: openWiki ? '4.5rem' : '1.5rem' }}
                            onClick={() => navigate("/translations")}
                        />
                    }
                    {openDazAssert &&
                        <DRIconButton
                            icon={<ViewInArIcon />}
                            ariaLabel="Daz Assert"
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: openWiki ? translate ? '7.5rem' : '4.5rem' : '1.5rem' }}
                            onClick={openDazAssert}
                        />
                    }
                </>
            }
        />
    );
}

export default DownloadGrid;