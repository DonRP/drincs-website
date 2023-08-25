import { AspectRatio, Card, Typography } from '@mui/joy';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import DRErrorComponent from './DRErrorComponent';

export interface IDRGridBaseProps<T extends IDRGridData> {
    title: string,
    data: T[],
    logoImage?: string,
    height?: number,
    rowHeight?: number,
    hideFooter?: boolean,
}

interface IDRGridProps<T extends IDRGridData> extends IDRGridBaseProps<T> {
    columns: GridColDef<T>[]
}

interface IDRGridData extends GridValidRowModel {
    id?: number,
}

function DRGrid<T extends IDRGridData>(props: IDRGridProps<T>) {
    const { title, data, logoImage, height = 350, rowHeight = 75, columns, hideFooter } = props;
    let internalData = data.map(((d, index) => {
        d.id = index
        return d;
    }))

    try {
        return (
            <Card
                // elevation={24} 
                sx={{
                    minWidth: { xs: 450, sm: 550, md: 700, lg: 900 },
                    maxWidth: { xs: 450, sm: 450, md: 850, lg: 900 },
                    marginTop: 2,
                }}
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
                        rows={internalData}
                        columns={columns}
                        rowHeight={rowHeight}
                        hideFooter={hideFooter}
                        hideFooterPagination={hideFooter}
                        hideFooterSelectedRowCount={hideFooter}
                    />
                </div>
            </Card>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRGrid"} />
    }
}

export default DRGrid;