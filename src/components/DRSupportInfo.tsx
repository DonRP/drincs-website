import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Card, CardHeader, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

const columns = [
    {
        field: 'link',
        headerName: '',
        flex: 1,
        minWidth: 25,
        renderCell: (params: any) => (
            <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={(params: any) => {
                    window.open(params?.value?.toString())
                }}
            >
                <OpenInNewIcon />
            </IconButton>
        )
    },
    {
        field: 'platform',
        headerName: 'Sito',
        flex: 1,
        minWidth: 100,
        renderCell: (params: any) => (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                {params.value}
            </Box>
        ),
    },
    {
        field: 'membership',
        headerName: 'Topo supporto',
        flex: 1,
        minWidth: 100,
        renderCell: (params: any) => (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                {params.value}
            </Box>
        ),
    },
    {
        field: 'month_price',
        headerName: 'prezzio',
        flex: 1,
        minWidth: 100,
        renderCell: (params: any) => (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                {params.value + "€"}
            </Box>
        ),
    },
    {
        field: 'discord',
        headerName: 'Nome',
        flex: 1,
        minWidth: 100,
        renderCell: (params: any) => (
            <>
                {params.value &&
                    <CheckIcon sx={{ color: "green" }} />
                }
                {!params.value &&
                    <CloseIcon sx={{ color: "red" }} />
                }
            </>
        )
    },
    {
        field: 'news',
        headerName: 'Nome',
        flex: 1,
        minWidth: 100,
        renderCell: (params: any) => (
            <>
                {params.value &&
                    <CheckIcon sx={{ color: "green" }} />
                }
                {!params.value &&
                    <CloseIcon sx={{ color: "red" }} />
                }
            </>
        )
    },
];

type ISupportGridRow = {
    id: number,
    platform: string | "patreon" | "buymeacoffee"
    membership: string,
    month_price: number,
    discord: boolean,
    news: boolean,
    link: string,
}
type IDRDownloadGridProps = {
    title: string,
    data: ISupportGridRow[],
    height?: number,
    rowHeight?: number,
}

function DRSupportInfoGrid(props: IDRDownloadGridProps) {
    const { title, data, height = 350, rowHeight = 75 } = props;

    try {
        return (
            <Card elevation={24} sx={{ maxWidth: 900, minWidth: 700 }}>
                <CardHeader
                    title={title}
                />
                <div style={{ height: height, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        rowHeight={rowHeight}
                    />
                </div>
            </Card>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>DRSupportInfoGrid error</div>
    }
}

export default DRSupportInfoGrid;