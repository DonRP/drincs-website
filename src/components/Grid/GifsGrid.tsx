import { KeyboardArrowRight } from '@mui/icons-material';
import { Box } from '@mui/joy';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DRDataGrid from 'components/DRDataGrid';
import { ReactElement } from 'react';
import { DRButtonNoMargin } from '../DRButton';

export type IGifGridRow = {
    logo: ReactElement,
    link: string,
}

const columns: GridColDef<IGifGridRow>[] = [
    {
        field: 'logo',
        headerName: '',
        flex: 1,
        minWidth: 25,
        renderCell: (params: GridRenderCellParams<IGifGridRow, ReactElement>) => (
            <strong>
                {params.value}
            </strong >
        ),
    },
    {
        field: 'link',
        headerName: '',
        minWidth: 200,
        renderCell: (params: GridRenderCellParams<IGifGridRow, string>) => (
            <strong>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <DRButtonNoMargin
                        variant="outlined"
                        onClick={() => {
                            window.open(params.value)
                        }}
                        endDecorator={<KeyboardArrowRight />}
                    >
                        {"Start now"}
                    </DRButtonNoMargin>
                </Box>
            </strong >
        ),
    },
];

interface IProps {
    title: string,
    rows: IGifGridRow[],
    height?: number,
}

function GifsGrid(props: IProps) {
    const { title, rows: data, height } = props;

    return (
        <DRDataGrid
            title={title}
            rows={data}
            columns={columns}
            height={height}
            hideFooter
            slots={{
                columnHeaders: () => null,
            }}
        />
    );
}

export default GifsGrid;