import GitHubIcon from '@mui/icons-material/GitHub';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TranslateIcon from '@mui/icons-material/Translate';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { Box, Grid } from '@mui/joy';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DRDataGrid from 'components/DRDataGrid';
import DRIconButton from 'components/DRIconButton';
import { discordLink } from 'constant';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DRButtonNoMargin } from '../DRButton';

type IDownloadLink = {
    mega?: string,
    mediafire?: string,
    discord?: boolean,
    sha?: string,
}
type IDownloadDevice = {
    name: string
    element?: JSX.Element
}
export type IDownloadGridRow = {
    id: number,
    device: IDownloadDevice
    version: string,
    download: IDownloadLink,
}

const columns: (t: TFunction<[string]>) => GridColDef<IDownloadGridRow>[] = (t) => {
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
                                            startDecorator={
                                                <img src="https://seeklogo.com/images/M/mega-icon-logo-75FF6A408B-seeklogo.com.png" width={24} height={24} alt="Logo" />
                                            }
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
                            </Grid>
                            {params.value?.sha && "SHA1: " + params.value?.sha}
                        </Grid>
                    </Box>
                </strong >
            ),
        },
    ];
}

interface IDownloadGridProps {
    title: string,
    rows: IDownloadGridRow[],
    height?: number,
    openWiki?: () => void
    openDazAssert?: () => void
    openGithub?: () => void
    translate?: boolean
    logoImage?: string,
}

function DownloadGrid(props: IDownloadGridProps) {
    const { t } = useTranslation(["translation"]);
    const {
        title,
        rows: data,
        height,
        openWiki,
        openDazAssert,
        openGithub,
        translate,
        logoImage,
    } = props;
    let navigate = useNavigate();

    return (
        <DRDataGrid
            title={title}
            rows={data}
            columns={columns(t)}
            height={height}
            hideFooter
            logoImage={logoImage}
            actions={
                <>
                    {openWiki &&
                        <DRIconButton
                            ariaLabel={t("wiki")}
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: '1.5rem' }}
                            onClick={openWiki}
                        >
                            <MenuBookIcon />
                        </DRIconButton>
                    }
                    {translate &&
                        <DRIconButton
                            ariaLabel={t("translate")}
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: openWiki ? '4.5rem' : '1.5rem' }}
                            onClick={() => navigate("/translations")}
                        >
                            <TranslateIcon />
                        </DRIconButton>
                    }
                    {openDazAssert &&
                        <DRIconButton
                            ariaLabel={t("daz_assert")}
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: openWiki ? translate ? '7.5rem' : '4.5rem' : '1.5rem' }}
                            onClick={openDazAssert}
                        >
                            <ViewInArIcon />
                        </DRIconButton>
                    }
                    {openGithub &&
                        <DRIconButton
                            ariaLabel={"GitHub"}
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: openWiki ? translate ? '10.5rem' : '7.5rem' : translate ? '4.5rem' : '1.5rem' }}
                            onClick={openGithub}
                        >
                            <GitHubIcon />
                        </DRIconButton>
                    }
                </>
            }
        />
    );
}

export default DownloadGrid;