import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import { AspectRatio, Card, CircularProgress, Grid, Skeleton, Typography } from '@mui/joy';
import { CardActionArea, Collapse } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { myUseTheme } from 'Theme';
import { translationState } from 'atoms/translationState';
import { ProjectsEnum } from 'enum/ProjectsEnum';
import { GitHubTranslationRelease, TargetLanguages, TranslationResultItem } from 'model/Translation/TranslationResult';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useEffect, useMemo, useState } from "react";
import { FlagIcon, FlagIconCode } from 'react-flag-kit';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import TranslationService from 'services/TranslationService';
import { logError } from 'utility/Logger';
import { showToastByMyError } from 'utility/ShowToast';
import DRButton from './DRButton';
import DRErrorComponent from './DRErrorComponent';
import DRIconButton from './DRIconButton';

const columns: GridColDef<TranslationResultItem>[] = [
    {
        field: 'targetLanguages',
        headerName: 'Language',
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
                </Grid>
            </strong >
        ),
    },
    {
        field: 'release',
        headerName: 'Download',
        flex: 1,
        minWidth: 150,
        renderCell: (params: GridRenderCellParams<TranslationResultItem, GitHubTranslationRelease>) => (
            <strong>
                {params.value &&
                    <DRButton
                        label={params.value?.version}
                        color="primary"
                        size="sm"
                        marginLeft={0}
                        marginBottom={0}
                        marginRight={0}
                        marginTop={0}
                        onClick={() => {
                            window.open(params.value?.downloadUrl)
                        }}
                        startIcon={<DownloadIcon />}
                    />
                }
            </strong>
        ),
    },
    {
        field: 'translated',
        headerName: 'Translated',
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

type IDRTranslationGridProps = {
    projectId: ProjectsEnum,
    height?: number,
    rowHeight?: number,
}

function DRTranslationGrid(props: IDRTranslationGridProps) {
    const theme = myUseTheme()
    const { enqueueSnackbar } = useSnackbar();
    const { projectId, height = 350, rowHeight = 75 } = props
    const [error, setError] = useState(false)
    const translationService = useMemo(() => { return new TranslationService() }, []);
    const [data, setData] = useRecoilState(translationState(projectId));
    const { t } = useTranslation(["translation"]);

    useEffect(() => {
        if (error) return
        if (data) return
        translationService.getLanguages(projectId).then(res => {
            setData(res?.content)
        }).catch(err => {
            logError("getLanguages", err)
            setError(true)
            showToastByMyError(err, enqueueSnackbar, t)
        })
    }, [projectId, translationService, data, setData, error, t, enqueueSnackbar]);

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    try {
        return (
            <>
                <Card
                    sx={{
                        minWidth: { xs: 350, sm: 550, md: 700, lg: 900 },
                        maxWidth: { xs: 450, sm: 450, md: 850, lg: 900 },
                        backgroundColor: error ? theme.palette.danger[500] : null,
                    }}
                >
                    {error &&
                        <DRIconButton
                            icon={<ReplayIcon />}
                            ariaLabel={t("reload")}
                            color="neutral"
                            size="sm"
                            onClick={() => {
                                setError(false)
                            }}
                        />
                    }
                    {data &&
                        <div>
                            <Typography level="title-lg">{data.name}</Typography>
                            <DRIconButton
                                icon={<HelpOutlineIcon />}
                                ariaLabel={t("info")}
                                color="neutral"
                                size="sm"
                                sx={{ position: 'absolute', top: '0.875rem', right: '9.5rem' }}
                                onClick={handleExpandClick}
                            />
                            <DRButton
                                label={t("translate")}
                                color="primary"
                                fullWidth={false}
                                marginLeft={16}
                                marginBottom={10}
                                marginRight={0}
                                marginTop={0}
                                disabled={!data?.crowdinLink}
                                onClick={() => {
                                    window.open(data?.crowdinLink)
                                }}
                                endIcon={<GTranslateIcon />}
                                size="sm"
                                sx={{ position: 'absolute', top: '0.875rem', right: '1.1rem' }}
                            />
                        </div>
                    }
                    {!data &&
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    }
                    {data?.logo &&
                        <CardActionArea onClick={handleExpandClick} sx={{ maxWidth: 900, maxHeight: 900 }}>
                            {/* <CardMedia
                                component="img"
                                image={data?.logo || ""}
                            /> */}
                            <AspectRatio minHeight={200} maxHeight={250}>
                                <img
                                    src={data.logo}
                                    alt=''
                                />
                            </AspectRatio>
                        </CardActionArea>
                    }
                    {!data?.logo &&
                        <Skeleton variant="rectangular" width={{ xs: 350, sm: 550, md: 700, lg: 900 }} height={200}
                            sx={{ maxWidth: { xs: 450, sm: 550, md: 700, lg: 900 } }}
                        />
                    }
                    {data?.description &&
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Typography
                            // paragraph
                            >
                                <div dangerouslySetInnerHTML={{ __html: data.description }} />
                            </Typography>
                        </Collapse>
                    }
                    {data?.list && <div style={{ height: height, width: '100%' }}>
                        <DataGrid
                            rows={data.list}
                            columns={columns}
                            rowHeight={rowHeight}
                        />
                    </div>}
                    {!data?.list &&
                        <Skeleton variant="rectangular" width={{ xs: 350, sm: 550, md: 700, lg: 900 }} height={height}
                            sx={{ maxWidth: { xs: 450, sm: 550, md: 700, lg: 900 } }}
                        />
                    }
                </Card>
            </>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRTranslationGrid"} />
    }
}

export default DRTranslationGrid;