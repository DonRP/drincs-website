import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Avatar, Grid, Paper, SxProps, Table, TableBody, TableCell, TableContainer, TableRow, Theme, useTheme } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { logError } from 'utility/Logger';
import { isBoolean, isObject } from 'utility/UtilityFunctionts';

type IDRTable = {
    titles?: string[],
    data?: any[][] | object[],
    verticalTitle?: boolean,
    width?: number,
    height?: number,
    toMirrorAcrossDiagonal?: boolean,
    sx?: SxProps<Theme>;
}

type IDRTableCell = {
    element: any;
}

function DRTableCell(props: IDRTableCell) {
    const theme = useTheme();
    const { element } = props;

    try {
        if (isBoolean(element)) {
            if (element) {
                return <TableCell align="center">
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Grid item>
                            <Avatar
                                sx={{
                                    bgcolor: green[500],
                                    width: 20,
                                    height: 20
                                }}
                            >
                                <CheckIcon
                                    sx={{
                                        width: 15,
                                        height: 15
                                    }}
                                />
                            </Avatar>
                        </Grid>
                    </Grid>
                </TableCell>
            }
            else {
                return <TableCell align="center">
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Grid item>
                            <Avatar
                                sx={{
                                    bgcolor: red[500],
                                    width: 20,
                                    height: 20
                                }}
                            >
                                <ClearIcon
                                    sx={{
                                        width: 15,
                                        height: 15
                                    }}
                                />
                            </Avatar>
                        </Grid>
                    </Grid>
                </TableCell>
            }
        }
        return <TableCell align="center">
            {element}
        </TableCell>
    } catch (error) {
        logError("DRTableCell", error)
        return <div style={{ color: theme.palette.error.main }}>DRTableCell error</div>
    }
}

function convertData(oldData: any[][] | object[] = [], revert = false): any[][] {
    let data: any[][] = oldData.map((item: any) => {
        if (Array.isArray(item)) {
            return item
        }
        else if (isObject(item)) {
            return Object.values(item)
        }
        else {
            return []
        }
    })
    if (!revert) {
        return data
    }

    let maxLengt = 0
    data.forEach(element => {
        if (maxLengt < element.length) {
            maxLengt = element.length
        }

    });
    let result: any[][] = [[]]
    for (let index = 0; index < maxLengt; index++) {
        result.push([])
    }
    data.forEach((element) => {
        for (let forIndex = 0; forIndex < element.length && forIndex < maxLengt; forIndex++) {
            result[forIndex].push(element[forIndex])
        }
    });
    return result
}

function DRTable(props: IDRTable) {
    const theme = useTheme();
    const { verticalTitle, toMirrorAcrossDiagonal, titles, data, sx } = props;
    const dataUsed = convertData(data, toMirrorAcrossDiagonal)
    try {
        return (
            <TableContainer
                component={Paper}
                sx={sx}
            >
                <Table >
                    <TableBody>
                        {verticalTitle && titles &&
                            <TableRow >
                                {titles.map((title) => {
                                    return <TableCell >
                                        {title}
                                    </TableCell>
                                })}
                            </TableRow>
                        }

                        {dataUsed.map((item, index) => {
                            return item.length > 0 ? <TableRow  >
                                {!verticalTitle && titles &&
                                    <TableCell >
                                        {titles.length > index && <>
                                            {titles[index]}
                                        </>}
                                    </TableCell>
                                }
                                {item.map((title) => {
                                    return <DRTableCell
                                        element={title}
                                    />
                                })}
                            </TableRow>
                                : <></>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } catch (error) {
        logError("DRTable", error)
        return <div style={{ color: theme.palette.error.main }}>DRTable error</div>
    }
}

export default DRTable;