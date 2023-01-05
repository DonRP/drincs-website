import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { Card, CardActionArea, CardHeader, CardMedia, CircularProgress, Collapse, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { GitHubTranslationRelease, TargetLanguages, TranslationResult } from 'model/TranslationResult';
import * as React from 'react';
import { useEffect, useState } from "react";
import Flag from 'react-flagkit';
import TranslationService from 'services/TranslationService';

const columns = [
    {
        field: 'targetLanguages',
        headerName: 'Language',
        flex: 1,
        minWidth: 100,
        renderCell: (params: GridRenderCellParams<TargetLanguages, any, any>) => (
            <strong>
                <Grid
                    container
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 0, sm: 2, md: 2 }}
                >
                    <Grid item sx={{ display: { xs: 'flex', md: 'none' } }} >
                        <Flag country={params.value?.twoLettersCode.toUpperCase()} size={50} alt={params.value?.name} />
                    </Grid>
                    <Grid item sx={{ display: { xs: 'none', md: 'flex' } }} >
                        <Flag country={params.value?.twoLettersCode.toUpperCase()} size={65} alt={params.value?.name} />
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
        renderCell: (params: GridRenderCellParams<GitHubTranslationRelease, any, any>) => (
            <strong>
                {params.value &&
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        target="_blank" href={params.value?.downloadUrl}
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
        renderCell: (params: GridRenderCellParams<number, any, any>) => (
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
        renderCell: (params: GridRenderCellParams<number, any, any>) => (
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
    crowdinProjectId: string,
    crowdinLink: string,
    githubRepoName: string,
    height?: number,
    rowHeight?: number,
    completeLoading: () => void,
}

function DRTranslationGrid(props: IDRTranslationGridProps) {
    const { crowdinProjectId, crowdinLink, githubRepoName: gitRepo, height = 350, rowHeight = 75, completeLoading } = props
    const [data, setData] = useState<TranslationResult>()

    useEffect(() => {
        const abortController = new AbortController();
        const translationService = new TranslationService();

        translationService.getLanguages(gitRepo, crowdinProjectId, abortController).then(res => {
            completeLoading()
            if (abortController.signal.aborted) {
                return;
            }
            setData(res?.content)
        }).catch(err => {
            console.log(err)
        })

        return function cleanUp() {
            abortController.abort();
        }
    }, [crowdinProjectId, gitRepo, completeLoading]);

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    try {
        return (
            <>
                {!data &&
                    null
                }
                {data &&
                    <Card elevation={24} sx={{ maxWidth: 900 }}>
                        <CardHeader
                            action={
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginLeft: 16 }}
                                    onClick={() => {
                                        window.open(crowdinLink)
                                    }}
                                    endIcon={<GTranslateIcon />}
                                >
                                    <Typography>
                                        Translate
                                    </Typography>
                                </Button>
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
                }
            </>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>DRTranslationGrid error</div>
    }
}

export default DRTranslationGrid;