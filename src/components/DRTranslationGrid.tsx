import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Card, CircularProgress, Grid, IconButton, Skeleton, Typography } from '@mui/joy';
import { CardActionArea, CardMedia, Collapse } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { myUseTheme } from 'Theme';
import { ProjectsEnum } from 'enum/ProjectsEnum';
import { GitHubTranslationRelease, TargetLanguages, TranslationResult, TranslationResultItem } from 'model/Translation/TranslationResult';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useEffect, useMemo, useState } from "react";
import { FlagIcon, FlagIconCode } from 'react-flag-kit';
import TranslationService from 'services/TranslationService';
import { logError } from 'utility/Logger';
import DRButton from './DRButton';
import DRErrorComponent from './DRErrorComponent';

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
                    >
                        {params.value?.version}
                    </DRButton>
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
    {
        field: 'approved',
        headerName: 'Approved',
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
    //     field: 'users',
    //     headerName: 'Utenti',
    //     width: 150,
    //     renderCell: (params) => (
    //         <AvatarGroup max={2}>
    //             <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    //             <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
    //             <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
    //             <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
    //             <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
    //         </AvatarGroup>
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
    const [data, setData] = useState<TranslationResult>()
    const [error, setError] = useState(false)
    const translationService = useMemo(() => { return new TranslationService(enqueueSnackbar) }, [enqueueSnackbar]);

    useEffect(() => {
        translationService.getLanguages(projectId).then(res => {
            setData(res?.content)
        }).catch(err => {
            logError("getLanguages", err)
            setError(true)
        })
    }, [projectId, translationService]);

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    try {
        return (
            <>
                <Card
                    //  elevation={24} 
                    sx={{ maxWidth: 900, backgroundColor: error ? theme.palette.danger[500] : null }}
                >
                    {data &&
                        <div>
                            <Typography level="title-lg">{data.name}</Typography>
                            <IconButton
                                color="neutral"
                                size="sm"
                                sx={{ position: 'absolute', top: '0.875rem', right: '9.5rem' }}
                                onClick={handleExpandClick}
                            >
                                <HelpOutlineIcon />
                            </IconButton>
                            <DRButton
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
                            >
                                <Typography>
                                    Translate
                                </Typography>
                            </DRButton>
                        </div>
                    }
                    {!data &&
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    }
                    {data?.logo &&
                        <CardActionArea onClick={handleExpandClick} sx={{ maxWidth: 900, maxHeight: 900 }}>
                            <CardMedia
                                component="img"
                                image={data?.logo || ""}
                            />
                        </CardActionArea>
                    }
                    {!data?.logo &&
                        <Skeleton variant="rectangular" width={{ xs: 450, sm: 550, md: 700, lg: 900 }} height={200}
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
                        <Skeleton variant="rectangular" width={{ xs: 450, sm: 550, md: 700, lg: 900 }} height={height}
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