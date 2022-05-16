import { Card, CardHeader } from '@mui/material';
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
                {params.value}
            </Box>
        ),
    },
    {
        field: 'discord',
        headerName: 'Nome',
        width: 150,
    },
    {
        field: 'news',
        headerName: 'Nome',
        width: 150,
    },
];

type ISupportGridRow = {
    id: number,
    icon: string,
    platform: string,
    membership: string,
    month_price: number,
    discord: boolean,
    news: boolean,
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