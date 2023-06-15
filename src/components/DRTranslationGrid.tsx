import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Card, CardActionArea, CardHeader, CardMedia, CircularProgress, Collapse, Grid, IconButton, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ProjectsEnum } from 'enum/ProjectsEnum';
import { GitHubTranslationRelease, TargetLanguages, TranslationResult, TranslationResultItem } from 'model/Translation/TranslationResult';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useEffect, useMemo, useState } from "react";
import { FlagIcon, FlagIconCode } from 'react-flag-kit';
import { RecoilState, useRecoilState } from 'recoil';
import TranslationService from 'services/TranslationService';

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
                    <Grid item sx={{ display: { xs: 'flex', md: 'none' } }} >
                        <FlagIcon code={params.value?.twoLettersCode.toUpperCase() as FlagIconCode} size={50} height={40} alt={params.value?.name} />
                    </Grid>
                    <Grid item sx={{ display: { xs: 'none', md: 'flex' } }} >
                        <FlagIcon code={params.value?.twoLettersCode.toUpperCase() as FlagIconCode} size={65} height={50} alt={params.value?.name} />
                    </Grid>
                    <Grid item  >
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
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        target="_blank"
                        href={params.value?.downloadUrl}
                        startIcon={<DownloadIcon />}
                    >
                        {params.value?.version}
                    </Button>
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
                        <CircularProgress variant="determinate" value={params.value} />
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
                        <CircularProgress variant="determinate" value={params.value} />
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
    NotCompleteListAtom: RecoilState<string[]>
}

function DRTranslationGrid(props: IDRTranslationGridProps) {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const { projectId, height = 350, rowHeight = 75, NotCompleteListAtom } = props
    const [data, setData] = useState<TranslationResult>()
    const [loading, setLoading] = useState(true)
    const [oltherTranslationNotComplete, setOltherTranslationNotComplete] = useRecoilState(NotCompleteListAtom);
    const translationService = useMemo(() => { return new TranslationService(enqueueSnackbar) }, [enqueueSnackbar]);

    const test = () => {
        if (loading) {
            setLoading(false)
            setOltherTranslationNotComplete(oltherTranslationNotComplete.filter((id: string) => {
                return id !== projectId.toString()
            }))
            return true
        }
        else {
            return false
        }
    }

    useEffect(() => {
        setLoading(true)

        translationService.getLanguages(projectId).then(res => {
            setData(res?.content)
        }).catch(err => {
            console.log(err)
        })
    }, [projectId, translationService]);

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    try {
        if (!data) {
            if (projectId.toString() === oltherTranslationNotComplete[oltherTranslationNotComplete.length - 1]) {
                return <CircularProgress />
            }
            else {
                return null
            }
        }
        else {
            return (
                <>
                    {loading && test()}
                    <Card elevation={24} sx={{ maxWidth: 900 }}>
                        <CardHeader
                            action={
                                <>
                                    <IconButton
                                        onClick={handleExpandClick}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <HelpOutlineIcon />
                                    </IconButton>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{
                                            marginLeft: 16,
                                            marginBottom: 10
                                        }}
                                        disabled={!data?.crowdinLink}
                                        onClick={() => {
                                            window.open(data?.crowdinLink)
                                        }}
                                        endIcon={<GTranslateIcon />}
                                    >
                                        <Typography>
                                            Translate
                                        </Typography>
                                    </Button>
                                </>
                            }
                            title={data?.name}
                        />
                        <CardActionArea onClick={handleExpandClick} sx={{ maxWidth: 900, maxHeight: 900 }}>
                            <CardMedia
                                component="img"
                                image={data?.logo || ""}
                            />
                        </CardActionArea>
                        {/* <CardActions disableSpacing>
                <ExpandMore
                     expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMore />
                </ExpandMore>
            </CardActions> */}
                        {data?.description &&
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <Typography paragraph>
                                    <div dangerouslySetInnerHTML={{ __html: data.description }} />
                                </Typography>
                            </Collapse>
                        }
                        <div style={{ height: height, width: '100%' }}>
                            <DataGrid
                                rows={data.list}
                                columns={columns}
                                rowHeight={rowHeight}
                            />
                        </div>
                    </Card>
                </>
            );
        }
    } catch (error) {
        console.error(error)
        return <div style={{ color: theme.palette.error.main }}>DRTranslationGrid error</div>
    }
}

export default DRTranslationGrid;