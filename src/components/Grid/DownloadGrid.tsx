import { Box, Button, DataGrid, Grid, Typography } from '@drincs/react-components';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import DRDataGrid from '../DRDataGrid';
import MegaIcon from '../Icon/MegaIcon';

type IDownloadLink = {
    mega?: string,
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

const columns: (t: TFunction<[string]>) => GridColDef<IDownloadGridRow>[] = (t) => {
    return [
        {
            field: 'device',
            headerName: t("device"),
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
            headerName: t("version"),
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
            headerName: t("download"),
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
                                    {params.value?.mega &&
                                        <Button
                                            size='lg'
                                            variant='soft'
                                            startDecorator={
                                                <MegaIcon width={24} height={24} />
                                            }
                                            onClick={() => {
                                                window.open(params.value?.mega)
                                            }}
                                        >
                                            {"Mega"}
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
}

interface IDownloadGridProps {
    title: string,
    rows: IDownloadGridRow[],
    height?: number,
}

function DownloadGrid(props: IDownloadGridProps) {
    const { t } = useTranslation(["translation"]);
    const { title, rows: data, height } = props;

    return (<>

        <DRDataGrid
            title={title}
            rows={data}
            columns={columns(t)}
            height={height}
            hideFooter
        />
        <DataGrid
            sx={{
                minWidth: { xs: 350, sm: 550, md: 700, lg: 900 },
                maxWidth: { xs: 450, sm: 450, md: 850, lg: 900 },
                marginTop: 2,
            }}
            head={<Typography level="title-lg">{title}</Typography>}
            rows={data}
            rowHeight={75}
            columns={columns(t)}
            height={height}
            hideFooter
        />
    </>
    );
}

export default DownloadGrid;