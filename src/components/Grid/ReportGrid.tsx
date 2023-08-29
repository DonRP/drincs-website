import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Grid } from '@mui/joy';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DRDataGrid, { IDRDataGridProps } from 'components/DRDataGrid';
import DRIconButton from 'components/DRIconButton';

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
        headerName: 'Description',
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
                                icon={<OpenInNewIcon />}
                                onClick={params.value.website}
                                color='success'
                            />
                        </Grid>
                    }
                    {params.value?.github &&
                        <Grid>
                            <DRIconButton
                                variant='soft'
                                ariaLabel='Requires a GitHub account'
                                icon={<GitHubIcon />}
                                onClick={() => {
                                    window.open(params.value?.github)
                                }}
                            />
                        </Grid>
                    }
                </Grid>
            </Box>
        ),
    },
];

interface IReportGridProps extends IDRDataGridProps<IReportGridRow> {
    githubLink: string,
}

function ReportGrid(props: IReportGridProps) {
    const { title, data, logoImage, height, rowHeight, githubLink } = props;

    let internalData = data.map((d) => {
        if (!d.link.github) {
            d.link.github = githubLink;
        }
        return d;
    })

    return (
        <DRDataGrid
            title={title}
            data={internalData}
            columns={columns}
            logoImage={logoImage}
            height={height}
            rowHeight={rowHeight}
            hideFooter
        />
    );
}

export default ReportGrid;