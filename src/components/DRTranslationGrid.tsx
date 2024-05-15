import { Button, DataGrid, Grid, IconButton, RoundIconButton, Sheet, Typography, useTheme } from '@drincs/react-components';
import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import { AspectRatio, CircularProgress, Skeleton } from '@mui/joy';
import { CardActionArea, Collapse } from '@mui/material';
import { Box } from '@mui/system';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import * as locales from '@mui/x-data-grid/locales';
import { useQueryClient } from '@tanstack/react-query';
import { TFunction } from 'i18next';
import * as React from 'react';
import { FlagIcon, FlagIconCode } from 'react-flag-kit';
import { useTranslation } from 'react-i18next';
import { ProjectsEnum } from '../enum/ProjectsEnum';
import { GitHubTranslationRelease, TargetLanguages, TranslationResultItem } from '../model/Translation/TranslationResult';
import { GET_LANGUAGES_CACHE_KEY, useGetLanguages } from '../use_query/useGetLanguages';
import { getLanguageDataGrid } from './DRDataGrid';

function columns(t: TFunction<[string]>): GridColDef<TranslationResultItem>[] {
    return [
        {
            field: 'targetLanguages',
            headerName: t('language'),
            flex: 1,
            minWidth: 100,
            renderCell: (params: GridRenderCellParams<TranslationResultItem, TargetLanguages>) => (
                <strong>
                    <Grid
                        container
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="center"
                        alignItems="center"
                        spacing={{ xs: 0, sm: 2, md: 2 }}
                    >
                        <Grid sx={{ display: { xs: 'flex', md: 'none' } }} >
                            <FlagIcon code={params.value?.twoLettersCode.toUpperCase() as FlagIconCode} size={50} height={40} alt={params.value?.name} />
                        </Grid>
                        <Grid sx={{ display: { xs: 'none', md: 'flex' } }} >
                            <FlagIcon code={params.value?.twoLettersCode.toUpperCase() as FlagIconCode} size={65} height={50} alt={params.value?.name} />
                        </Grid>
                        <Grid>
                            {params.value?.name}
                        </Grid>
                    </Grid >
                </strong >
            ),
        },
        {
            field: 'release',
            headerName: t('download'),
            flex: 1,
            minWidth: 150,
            renderCell: (params: GridRenderCellParams<TranslationResultItem, GitHubTranslationRelease>) => (
                <strong>
                    {params.value &&
                        <Button
                            color="primary"
                            size="sm"
                            onClick={() => {
                                window.open(params.value?.downloadUrl)
                            }}
                            startDecorator={<DownloadIcon />}
                        >
                            {params.value?.version}
                        </Button>
                    }
                </strong>
            ),
        },
        {
            field: 'translated',
            headerName: t('translated'),
            flex: 1,
            minWidth: 50,
            renderCell: (params: GridRenderCellParams<TranslationResultItem, number>) => (
                <strong>
                    {params.value !== 100 &&
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            <CircularProgress
                                determinate
                                value={params.value}
                            />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {params.value ? `${Math.round(params.value)}%` : ""}
                            </Box>
                        </Box>
                    }
                    {params.value === 100 &&
                        <CheckIcon sx={{ color: "springgreen" }} />
                    }
                </strong>
            ),
        },
        // {
        //     field: 'approved',
        //     headerName: 'Approved',
        //     flex: 1,
        //     minWidth: 50,
        //     renderCell: (params: GridRenderCellParams<TranslationResultItem, number>) => (
        //         <strong>
        //             {params.value !== 100 &&
        //                 <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        //                     <CircularProgress
        //                         determinate
        //                         value={params.value}
        //                     />
        //                     <Box
        //                         sx={{
        //                             top: 0,
        //                             left: 0,
        //                             bottom: 0,
        //                             right: 0,
        //                             position: 'absolute',
        //                             display: 'flex',
        //                             alignItems: 'center',
        //                             justifyContent: 'center',
        //                         }}
        //                     >
        //                         {params.value ? `${Math.round(params.value)}%` : ""}
        //                     </Box>
        //                 </Box>
        //             }
        //             {params.value === 100 &&
        //                 <CheckIcon sx={{ color: "springgreen" }} />
        //             }
        //         </strong>
        //     ),
        // },
    ];
}

type IDRTranslationGridProps = {
    projectId: ProjectsEnum,
    height?: number,
    rowHeight?: number,
}

function DRTranslationGrid(props: IDRTranslationGridProps) {
    const theme = useTheme()
    const { projectId, height = 350, rowHeight = 75 } = props
    const { t } = useTranslation(["translation"]);
    const queryClient = useQueryClient()
    const {
        isLoading,
        isError,
        data = undefined,
    } = useGetLanguages({
        projectId: projectId,
    })

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    if (isError) {
        return (
            <IconButton
                sx={{
                    minWidth: { xs: 350, sm: 550, md: 700, lg: 900 },
                    maxWidth: { xs: 450, sm: 450, md: 850, lg: 900 },
                }}
                variant="solid"
                ariaLabel={t("reload")}
                color="danger"
                size="sm"
                onClick={() => {
                    queryClient.invalidateQueries({ queryKey: [GET_LANGUAGES_CACHE_KEY, projectId.toString()] });
                }}
            >
                <ReplayIcon />
            </IconButton>
        )
    }

    if (isLoading || !data) {
        return (
            <Sheet
                sx={{
                    minWidth: { xs: 350, sm: 550, md: 700, lg: 900 },
                    maxWidth: { xs: 450, sm: 450, md: 850, lg: 900 },
                }}
            >
                <Skeleton
                    variant="text"
                    sx={{
                        fontSize: '2rem',
                        marginTop: 2,
                        paddingX: 2,
                    }}
                />
                <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{
                        marginTop: 2,
                        paddingX: 2,
                    }}
                />
                <Skeleton
                    variant="rectangular"
                    height={height}
                    sx={{
                        marginTop: 2,
                        paddingX: 2,
                        marginBottom: 1,
                    }}
                />
            </Sheet>
        )
    }

    return (
        <DataGrid
            sx={{
                minWidth: { xs: 350, sm: 550, md: 700, lg: 900 },
                maxWidth: { xs: 450, sm: 450, md: 850, lg: 900 },
                backgroundColor: isError ? theme.palette.danger[500] : null,
            }}
            rows={data.list}
            columns={columns(t)}
            rowHeight={rowHeight}
            localeText={
                getLanguageDataGrid(locales)
            }
            head={
                <div>
                    <Typography marginBottom={2} level="title-lg">{data.name}</Typography>
                    <Box
                        sx={{ position: 'absolute', top: '0.875rem', right: '9.5rem' }}
                    >
                        <RoundIconButton
                            ariaLabel={t("info")}
                            color="neutral"
                            size="sm"
                            onClick={handleExpandClick}
                            variant="outlined"
                        >
                            <HelpOutlineIcon />
                        </RoundIconButton>
                    </Box>
                    <Button
                        color="primary"
                        fullWidth={false}
                        disabled={!data.crowdinLink}
                        onClick={() => {
                            window.open(data.crowdinLink)
                        }}
                        endDecorator={<GTranslateIcon />}
                        size="sm"
                        sx={{ position: 'absolute', top: '0.875rem', right: '1.1rem' }}
                    >
                        {t("translate")}
                    </Button>
                    {data.logo &&
                        <CardActionArea
                            onClick={handleExpandClick}
                            sx={{
                                maxWidth: 900,
                                maxHeight: 900,
                                marginBottom: 2,
                                borderRadius: 2,
                            }}
                        >
                            <AspectRatio
                                minHeight={200}
                                maxHeight={250}
                                sx={{
                                    borderRadius: 5,
                                }}
                            >
                                <img
                                    src={data.logo}
                                    alt=''
                                />
                            </AspectRatio>
                        </CardActionArea>
                    }
                    {data.description &&
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Typography
                            // paragraph
                            >
                                <div dangerouslySetInnerHTML={{ __html: data.description }} />
                            </Typography>
                        </Collapse>
                    }
                </div>
            }
        />
    );
}

export default DRTranslationGrid;