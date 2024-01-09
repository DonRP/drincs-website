import { AspectRatio, Card, Skeleton, Typography } from '@mui/joy';
import { DataGrid, DataGridProps, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import * as locales from '@mui/x-data-grid/locales';
import DRErrorComponent from './DRErrorComponent';

export interface IDRDataGridProps<T extends IData> extends DataGridProps<T> {
    title: string,
    rows: T[],
    logoImage?: string,
    height?: number,
    rowHeight?: number,
    hideFooter?: boolean,
    loading?: boolean,
    minHeightImg?: number,
    maxHeightImg?: number,
    actions?: JSX.Element,
    hideHeader?: boolean,
}

interface IProps<T extends IData> extends IDRDataGridProps<T> {
    columns: GridColDef<T>[]
}

interface IData extends GridValidRowModel {
    id?: number,
}

export const getLanguageDataGrid = (locales: any) => {
    let languageBrowser = navigator.language.replace("-", "")
    if (languageBrowser.length === 2) {
        languageBrowser = languageBrowser + languageBrowser.toUpperCase()
    }
    return locales[`${languageBrowser}`]?.components?.MuiDataGrid?.defaultProps?.localeText
}

function DRDataGrid<T extends IData>(props: IProps<T>) {
    const {
        title,
        rows,
        logoImage,
        height = 350,
        rowHeight = 75,
        hideFooter,
        hideHeader,
        slots,
        loading,
        minHeightImg = 200,
        maxHeightImg = 250,
        actions,
        ...rest
    } = props;
    const internalRows = rows.map(((d, index) => {
        d.id = index
        return d;
    }))

    const mySlots = () => {
        let res = slots
        if (hideHeader) {
            res = {
                ...res,
                columnHeaders: () => null,
            }
        }
        return res
    }

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
                        rows={internalRows}
                        rowHeight={rowHeight}
                        hideFooter={hideFooter}
                        hideFooterPagination={hideFooter}
                        hideFooterSelectedRowCount={hideFooter}
                        localeText={
                            getLanguageDataGrid(locales)
                        }
                        slots={mySlots()}
                        {...rest}
                    />
                </div>
            </Card>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRGrid"} />
    }
}

export default DRDataGrid;