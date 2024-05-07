import { KeyboardArrowRight } from '@mui/icons-material';
import { Box } from '@mui/joy';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { TFunction, t } from 'i18next';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import DRButton from '../DRButton';
import DRDataGrid from '../DRDataGrid';

export type IGifGridRow = {
    logo: ReactElement,
    link: string,
}

const columns: (t: TFunction<[string]>) => GridColDef<IGifGridRow>[] = () => {
    return [
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
                        <DRButton
                            variant="outlined"
                            onClick={() => {
                                window.open(params.value)
                            }}
                            endDecorator={<KeyboardArrowRight />}
                        >
                            {t("start_now")}
                        </DRButton>
                    </Box>
                </strong >
            ),
        },
    ];
}

interface IProps {
    title: string,
    rows: IGifGridRow[],
    height?: number,
}

function GifsGrid(props: IProps) {
    const { title, rows: data, height } = props;
    const { t } = useTranslation(["translation"]);

    return (
        <DRDataGrid
            title={title}
            rows={data}
            columns={columns(t)}
            height={height}
            hideFooter
            hideHeader
        />
    );
}

export default GifsGrid;