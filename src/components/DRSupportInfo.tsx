import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Card, CardHeader, IconButton, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'link_support',
        headerName: '',
        width: 20,
        renderCell: (params: any) => (
            <>
                {params?.value &&
                    <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        onClick={() => {
                            window.open(params?.value)
                        }}
                    >
                        <OpenInNewIcon />
                    </IconButton>
                }
            </>
        )
    },
    {
        field: 'site',
        headerName: '',
        width: 20,
        renderCell: (params: any) => (
            <strong>
                {params?.value === "patreon" &&
                    <IconButton
                        onClick={() => {
                            window.open("https://www.patreon.com/DRincs")
                        }}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Patreon_logomark.svg/1024px-Patreon_logomark.svg.png"
                            width={24}
                            height={24}
                            alt="Logo"
                        />
                    </IconButton>
                }

                {params?.value === "buymeacoffee" &&
                    <IconButton
                        onClick={() => {
                            window.open("https://www.buymeacoffee.com/DRincs")
                        }}
                    >
                        <img
                            src="https://s3-eu-west-1.amazonaws.com/tpd/logos/5c58570cfdd26f0001068f06/0x0.png"
                            width={24}
                            height={24}
                            alt="Logo"
                        />
                    </IconButton>
                }
            </strong >
        ),
    },
    {
        field: 'membership',
        headerName: 'Membership',
        flex: 1,
        minWidth: 50,
        renderCell: (params: any) => (
            <>
                <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, position: 'relative' }}>
                    {params.value.long}
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'none' }, position: 'relative' }}>
                    {params.value.medium}
                </Box>
                <Box sx={{ display: { xs: 'flex', sm: 'none', md: 'none' }, position: 'relative' }}>
                    {params.value.short}
                </Box>
            </>
        ),
    },
    {
        field: 'month_price',
        headerName: 'Month',
        flex: 1,
        maxWidth: 60,
        renderCell: (params: any) => (
            <>
                {params.value &&
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        {params.value}
                    </Box>
                }
                {!params.value &&
                    <CloseIcon sx={{ color: "red" }} />
                }
            </>
        ),
    },
    {
        field: 'year_price',
        headerName: 'Year',
        maxWidth: 40,
        renderCell: (params: any) => (
            <>
                {params.value &&
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        {params.value}
                    </Box>
                }
                {!params.value &&
                    <CloseIcon sx={{ color: "red" }} />
                }
            </>
        ),
    },
    {
        field: 'news',
        headerName: 'News',
        maxWidth: 20,
        renderCell: (params: any) => (
            <>
                {params.value &&
                    <CheckIcon sx={{ color: "springgreen" }} />
                }
                {!params.value &&
                    <CloseIcon sx={{ color: "red" }} />
                }
            </>
        )
    },
    {
        field: 'last_version',
        headerName: 'Last version',
        maxWidth: 70,
        renderCell: (params: any) => (
            <>
                {params.value &&
                    <CheckIcon sx={{ color: "springgreen" }} />
                }
                {!params.value &&
                    <CloseIcon sx={{ color: "red" }} />
                }
            </>
        )
    },
    {
        field: 'android',
        headerName: 'Android',
        maxWidth: 60,
        renderCell: (params: any) => (
            <>
                {params.value &&
                    <CheckIcon sx={{ color: "springgreen" }} />
                }
                {!params.value &&
                    <CloseIcon sx={{ color: "red" }} />
                }
            </>
        )
    },
    {
        field: 'qhd',
        headerName: 'QHD',
        maxWidth: 20,
        renderCell: (params: any) => (
            <>
                {params.value &&
                    <CheckIcon sx={{ color: "springgreen" }} />
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
    link_support?: string,
    site: string | "patreon" | "buymeacoffee",
    membership: { short: string, long: string },
    month_price: string,
    year_price?: string,
    news: boolean,
    last_version: boolean,
    android: boolean,
    qhd: boolean,
}
type IDRDownloadGridProps = {
    title: string,
    data: ISupportGridRow[],
    height?: number,
    rowHeight?: number,
}

function DRSupportInfoGrid(props: IDRDownloadGridProps) {
    const theme = useTheme();
    const { title, data, height = 350, rowHeight = 75 } = props;

    try {
        return (
            <Card elevation={24} sx={{ minWidth: { xs: 470, sm: 600, md: 900 } }}>
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
        return <div style={{ color: theme.palette.error.main }}>DRSupportInfoGrid error</div>
    }
}

export default DRSupportInfoGrid;