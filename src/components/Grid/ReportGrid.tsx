import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Grid } from '@mui/joy';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DRButtonNoMargin } from 'components/DRButton';
import DRGrid, { IDRGridBaseProps } from 'components/DRGrid';

type IReportLink = {
    website?: string,
    github?: string,
}

type IReportInto = {
    title: string
    description: string
}

export type IReportGridRow = {
    id: number,
    info: IReportInto,
    link: IReportLink,
}

const columns: GridColDef<IReportGridRow>[] = [
    {
        field: 'info',
        headerName: 'Description',
        flex: 1,
        minWidth: 25,
        renderCell: (params: GridRenderCellParams<IReportGridRow, IReportInto>) => (
            <strong>
                {params.value?.title &&
                    <>
                        {params.value?.title}
                    </>
                }
                {!params.value?.description &&
                    <>
                        {params.value?.description}
                    </>
                }
            </strong >
        ),
    },
    {
        field: 'link',
        headerName: 'Link',
        minWidth: 350,
        renderCell: (params: GridRenderCellParams<IReportGridRow, IReportLink>) => (
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
                                {params.value?.website &&
                                    <DRButtonNoMargin
                                        label='Mediafire'
                                        variant="outlined"
                                        startIcon={
                                            <img src="https://cdn.worldvectorlogo.com/logos/mediafire-1.svg" width={24} height={24} alt="Logo" />
                                        }
                                        onClick={() => {
                                            window.open(params.value?.website)
                                        }}
                                        color='success'
                                    />
                                }
                            </Grid>
                            <Grid>
                                {params.value?.github &&
                                    <DRButtonNoMargin
                                        label='GitHub'
                                        variant='soft'
                                        startIcon={<GitHubIcon />}
                                        onClick={() => {
                                            window.open(params.value?.github)
                                        }}
                                    />
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </strong >
        ),
    },
];

interface IReportGridProps extends IDRGridBaseProps<IReportGridRow> {
}

function ReportGrid(props: IReportGridProps) {
    const { title, data, logoImage, height, rowHeight } = props;

    return (
        <DRGrid
            title={title}
            data={data}
            columns={columns}
            logoImage={logoImage}
            height={height}
            rowHeight={rowHeight}
        />
    );
}

export default ReportGrid;