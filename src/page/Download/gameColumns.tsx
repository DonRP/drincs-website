import { Box, Grid } from '@mui/joy';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DRButtonNoMargin } from 'components/DRButton';
import { IDownloadDevice, IDownloadGridRow, IDownloadLink } from 'components/Grid/DownloadGrid';
import ItchIcon from 'components/Icon/ItchIcon';
import MegaIcon from 'components/Icon/MegaIcon';
import { discordLink } from 'constant';
import { TFunction } from 'i18next';

export const gameColumns: (t: TFunction<[string]>) => GridColDef<IDownloadGridRow>[] = (t) => {
    return [
        {
            field: 'device',
            headerName: t("device"),
            flex: 1,
            minWidth: 25,
            renderCell: (params: GridRenderCellParams<IDownloadGridRow, IDownloadDevice>) => (
                <strong>
                    {params.value?.element &&
                        <>
                            {params.value?.element}
                        </>
                    }
                    {!params.value?.element &&
                        <>
                            {params.value?.name}
                        </>
                    }
                </strong >
            ),
        },
        {
            field: 'version',
            headerName: t("version"),
            flex: 1,
            minWidth: 25,
            renderCell: (params: GridRenderCellParams<IDownloadGridRow, string>) => (
                <strong>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        {params.value}
                    </Box>
                </strong >
            ),
        },
        {
            field: 'download',
            headerName: t("download"),
            minWidth: 200,
            renderCell: (params: GridRenderCellParams<IDownloadGridRow, IDownloadLink>) => (
                <strong>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={1}
                            >
                                <Grid>
                                    {params.value?.mediafire &&
                                        <DRButtonNoMargin
                                            variant="outlined"
                                            startDecorator={
                                                <img src="https://cdn.worldvectorlogo.com/logos/mediafire-1.svg" width={24} height={24} alt="Logo" />
                                            }
                                            onClick={() => {
                                                window.open(params.value?.mediafire)
                                            }}
                                            color='success'
                                        >
                                            {"Mediafire"}
                                        </DRButtonNoMargin>
                                    }
                                </Grid>
                                <Grid>
                                    {params.value?.mega &&
                                        <DRButtonNoMargin
                                            variant='soft'
                                            startDecorator={<MegaIcon />}
                                            onClick={() => {
                                                window.open(params.value?.mega)
                                            }}
                                        >
                                            {"Mega"}
                                        </DRButtonNoMargin>
                                    }
                                </Grid>
                                <Grid>
                                    {params.value?.discord &&
                                        <DRButtonNoMargin
                                            variant='soft'
                                            startDecorator={
                                                <img src="https://www.svgrepo.com/show/331368/discord-v2.svg" width={24} height={24} alt="Logo" />
                                            }
                                            onClick={() => {
                                                window.open(discordLink)
                                            }}
                                        >
                                            {t("only_supporter")}
                                        </DRButtonNoMargin>
                                    }
                                </Grid>
                                <Grid>
                                    {params.value?.itch &&
                                        <DRButtonNoMargin
                                            variant='soft'
                                            startDecorator={<ItchIcon />}
                                            onClick={() => {
                                                window.open(params.value?.itch)
                                            }}
                                        >
                                            {"Itch.io"}
                                        </DRButtonNoMargin>
                                    }
                                </Grid>
                            </Grid>
                            {params.value?.sha && "SHA1: " + params.value?.sha}
                        </Grid>
                    </Box>
                </strong >
            ),
        },
    ];
}