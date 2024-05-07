import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Grid } from '@mui/joy';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DRDataGrid from '../DRDataGrid';
import DRIconButton from '../DRIconButton';

type IReportLink = {
    website?: () => void,
    github?: string,
}

type IReportInto = {
    title: string
    description: string
}

export type IReportGridRow = {
    info: IReportInto,
    link: IReportLink,
}

const columns: GridColDef<IReportGridRow>[] = [
    {
        field: 'info',
        headerName: '',
        flex: 1,
        renderCell: (params: GridRenderCellParams<IReportGridRow, IReportInto>) => (
            <Box
                width="100%"
            >
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
            </Box>
        ),
    },
    {
        field: 'link',
        headerName: '',
        minWidth: 150,
        renderCell: (params: GridRenderCellParams<IReportGridRow, IReportLink>) => (
            <Box
                width="100%"
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={0.5}
                >
                    {params.value?.website &&
                        <Grid>
                            <DRIconButton
                                ariaLabel='Open Web-Form'
                                variant="soft"
                                onClick={params.value.website}
                                color='success'
                            >
                                <OpenInNewIcon />
                            </DRIconButton>
                        </Grid>
                    }
                    {params.value?.github &&
                        <Grid>
                            <DRIconButton
                                variant='soft'
                                ariaLabel='Requires a GitHub account'
                                onClick={() => {
                                    window.open(params.value?.github)
                                }}
                            >
                                <GitHubIcon />
                            </DRIconButton>
                        </Grid>
                    }
                </Grid>
            </Box>
        ),
    },
];

interface IReportGridProps {
    title: string,
    rows: IReportGridRow[],
    height?: number,
    githubLink: string,
}

function ReportGrid(props: IReportGridProps) {
    const { title, rows: data, height, githubLink } = props;

    let internalData = data.map((d) => {
        if (!d.link.github) {
            d.link.github = githubLink;
        }
        return d;
    })

    return (
        <DRDataGrid
            title={title}
            rows={internalData}
            columns={columns}
            height={height}
            hideFooter
            hideHeader
        />
    );
}

export default ReportGrid;