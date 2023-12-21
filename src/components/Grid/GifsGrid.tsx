import { KeyboardArrowRight } from '@mui/icons-material';
import { Box } from '@mui/joy';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DRDataGrid, { IDRDataGridProps } from 'components/DRDataGrid';
import { ReactElement } from 'react';
import { DRButtonNoMargin } from '../DRButton';

export type IGifGridRow = {
    logo: ReactElement,
    link: string,
}

const columns: GridColDef<IGifGridRow>[] = [
    {
        field: 'logo',
        headerName: 'Site',
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

interface IProps extends IDRDataGridProps<IGifGridRow> {
}

function GifsGrid(props: IProps) {
    const { title, data, logoImage, height, rowHeight } = props;

    return (
        <DRDataGrid
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

export default GifsGrid;