import { AspectRatio, Card, Skeleton, Typography } from '@mui/joy';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import DRErrorComponent from './DRErrorComponent';

export interface IDRDataGridProps<T extends IData> {
    title: string,
    data: T[],
    logoImage?: string,
    height?: number,
    rowHeight?: number,
    hideFooter?: boolean,
    loading?: boolean,
    minHeightImg?: number,
    maxHeightImg?: number,
    actions?: JSX.Element,
}

interface IProps<T extends IData> extends IDRDataGridProps<T> {
    columns: GridColDef<T>[]
}

interface IData extends GridValidRowModel {
    id?: number,
}

function DRDataGrid<T extends IData>(props: IProps<T>) {
    const {
        title,
        data,
        logoImage,
        height = 350,
        rowHeight = 75,
        columns,
        hideFooter,
        loading,
        minHeightImg = 200,
        maxHeightImg = 250,
        actions,
    } = props;
    let internalData = data.map(((d, index) => {
        d.id = index
        return d;
    }))

    try {
        if (loading) {
            return (
                <Card
                    sx={{
                        minWidth: { xs: 350, sm: 550, md: 700, lg: 900 },
                        maxWidth: { xs: 450, sm: 450, md: 850, lg: 900 },
                        marginTop: 2,
                    }}
                >
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '2rem' }}
                    />
                    <Skeleton
                        variant="rectangular"
                        width={{ xs: 350, sm: 550, md: 700, lg: 900 }}
                        height={minHeightImg}
                        sx={{ maxWidth: { xs: 450, sm: 550, md: 700, lg: 900 } }}
                    />
                    <Skeleton
                        variant="rectangular"
                        width={{ xs: 350, sm: 550, md: 700, lg: 900 }}
                        height={height}
                        sx={{ maxWidth: { xs: 450, sm: 550, md: 700, lg: 900 } }}
                    />
                </Card>
            )
        }
        return (
            <Card
                sx={{
                    minWidth: { xs: 350, sm: 550, md: 700, lg: 900 },
                    maxWidth: { xs: 450, sm: 450, md: 850, lg: 900 },
                    marginTop: 2,
                }}
            >
                <div>
                    <Typography level="title-lg">{title}</Typography>
                    {actions}
                </div>
                {logoImage &&
                    <AspectRatio minHeight={minHeightImg} maxHeight={maxHeightImg}>
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

export default DRDataGrid;