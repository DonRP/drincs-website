import { Card, CardActionArea, CardHeader, CardMedia, CircularProgress, Collapse, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect, useState } from "react";
import Flag from 'react-flagkit';
import CrowdinService from 'services/CrowdinService';
import GitHubService from 'services/GitHubService';

const columns = [
    {
        field: 'targetLanguages',
        headerName: 'Language',
        width: 150,
        renderCell: (params: any) => (
            <strong>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >  <Grid item xs={6}>
                        <Flag country={params.value?.twoLettersCode.toUpperCase()} size={50} alt={params.value?.name} />
                    </Grid>
                    <Grid item xs={6}>
                        {params.value?.name}
                    </Grid>
                </Grid>
            </strong>
        ),
    },
    {
        field: 'translated',
        headerName: 'Translated',
        width: 150,
        renderCell: (params: any) => (
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
                    <Typography variant="caption" component="div" color="text.secondary">
                        {`${Math.round(params.value)}%`}
                    </Typography>
                </Box>
            </Box>
        ),
    },
    {
        field: 'approved',
        headerName: 'Approved',
        width: 150,
        renderCell: (params: any) => (
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
                    <Typography variant="caption" component="div" color="text.secondary">
                        {`${Math.round(params.value)}%`}
                    </Typography>
                </Box>
            </Box>
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
    {
        field: 'release',
        headerName: 'Download',
        width: 150,
        renderCell: (params: any) => (
            <strong>
                {params.value &&
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        target="_blank" href={params.value?.download_url}
                    >
                        {params.value?.version}
                    </Button>
                }
            </strong>
        ),
    },
];

type IDRTranslationGridProps = {
    projectId: string,
    gitRepo: string,
}

type IGitHubRelease = {
    published_at: string,
    assets: any[],
    tag_name: string,
}

type IRowsLanguage = {
    id: number,
    translated: number,
    approved: number,
    targetLanguages: any,
    release: any,
}
type IProjectInfo = {
    targetLanguages: any[],
    description: string,
    name: string,
    logo: string,
}

function DRTranslationGrid(props: IDRTranslationGridProps) {
    const { projectId, gitRepo } = props
    const [projectInfo, setProjectInfo] = useState<IProjectInfo>()
    const [languages, setLanguages] = useState([])
    const [data, setData] = useState<IRowsLanguage[]>([])
    const [releases, setRelease] = useState([])

    useEffect(() => {
        const abortController = new AbortController();
        const crowdinService = new CrowdinService();
        crowdinService.getProject(projectId, abortController).then(res => {
            if (abortController.signal.aborted) {
                return;
            }
            setProjectInfo(res?.data)
        }).catch(err => {
            console.log(err)
        })

        return function cleanUp() {
            abortController.abort();
        }
    }, [projectId]);

    useEffect(() => {
        const abortController = new AbortController();
        const crowdinService = new CrowdinService();

        crowdinService.getLanguages(projectId, abortController).then(res => {
            if (abortController.signal.aborted) {
                return;
            }
            setLanguages(res?.data)
        }).catch(err => {
            console.log(err)
        })

        return function cleanUp() {
            abortController.abort();
        }
    }, [projectId]);

    useEffect(() => {
        const abortController = new AbortController();
        const gitHubService = new GitHubService();
        gitHubService.getReleases(gitRepo, abortController).then((res) => {
            if (abortController.signal.aborted) {
                return;
            }
            setRelease(res.map((item: IGitHubRelease) => {
                return {
                    version: item.tag_name.split('/')[1],
                    language: item.tag_name.split('/')[0],
                    download_url: item.assets[0].browser_download_url,
                    date: new Date(item.published_at),
                }
            }))
        }).catch(err => {
            console.log(err)
        })

        return function cleanUp() {
            abortController.abort();
        }
    }, [gitRepo]);

    useEffect(() => {
        if (projectInfo && languages && languages.length > 0)
            setData(languages?.map((item: any, index: number) => {
                return {
                    id: index,
                    translated: item.data.phrases.translated / item.data.phrases.total * 100,
                    approved: item.data.phrases.approved / item.data.phrases.total * 100,
                    // https://www.iban.com/country-codes
                    targetLanguages: projectInfo?.targetLanguages.filter((lang) => {
                        if (lang.twoLettersCode === "ja") {
                            lang.twoLettersCode = "jp"
                        }
                        if (lang.twoLettersCode === "zh") {
                            lang.twoLettersCode = "cn"
                            lang.name = "Chinese"
                        }
                        if (lang.twoLettersCode === "el") {
                            lang.twoLettersCode = "gr"
                        }
                        return lang.id === item.data.languageId
                    })[0],
                    release: null
                }
            }))
    }, [languages, projectInfo, releases]);

    useEffect(() => {
        if (data && releases && data.length > 0 && releases.length > 0) {
            data?.forEach((item, index) => {
                releases?.forEach((release: any) => {
                    if (item?.targetLanguages.name === release?.language) {
                        if (!data[index].release || data[index]?.release?.date < release?.date) {
                            data[index].release = release
                        }
                    }
                })
            })
        }
    }, [data, releases]);

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    try {
        return (
            <Card elevation={24} sx={{ maxWidth: 900 }}>
                <CardHeader
                    title={projectInfo?.name}
                // subheader="September 14, 2016"
                />
                <CardActionArea onClick={handleExpandClick} sx={{ maxWidth: 900, maxHeight: 900 }}>
                    <CardMedia
                        component="img"
                        image={projectInfo?.logo}
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
                {projectInfo?.description &&
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Typography paragraph>
                            <div dangerouslySetInnerHTML={{ __html: projectInfo.description }} />
                        </Typography>
                    </Collapse>
                }
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid rows={data} columns={columns} />
                </div>
            </Card>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>DRTranslationGrid error</div>
    }
}

export default DRTranslationGrid;