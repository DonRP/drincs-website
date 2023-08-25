import { AspectRatio, Card, Typography } from '@mui/joy';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import DRErrorComponent from './DRErrorComponent';

export interface IDRGridBaseProps<T extends GridValidRowModel> {
    title: string,
    data: T[],
    logoImage?: string,
    height?: number,
    rowHeight?: number,
}

interface IDRGridProps<T extends GridValidRowModel> extends IDRGridBaseProps<T> {
    columns: GridColDef<T>[]
}

function DRGrid<T extends GridValidRowModel>(props: IDRGridProps<T>) {
    const { title, data, logoImage, height = 350, rowHeight = 75, columns } = props;

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
        return <DRErrorComponent error={error} text={"DRGrid"} />
    }
}

export default DRGrid;