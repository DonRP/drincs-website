import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Card, CardHeader } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

const columns = [
    {
        field: 'platform',
        headerName: 'Sito',
        width: 150,
        renderCell: (params: any) => (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                {params.value}
            </Box>
        ),
    },
    {
        field: 'membership',
        headerName: 'Topo supporto',
        width: 150,
        renderCell: (params: any) => (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                {params.value}
            </Box>
        ),
    },
    {
        field: 'month_price',
        headerName: 'prezzio',
        width: 150,
        renderCell: (params: any) => (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                {params.value + "€"}
            </Box>
        ),
    },
    {
        field: 'discord',
        headerName: 'Nome',
        width: 150,
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
        width: 150,
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
    height: number,
}

function DRSupportInfoGrid(props: IDRDownloadGridProps) {
    const { title, data, height = 350 } = props;

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
                        rowHeight={75}
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