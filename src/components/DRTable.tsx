import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableRow, useTheme } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { isBoolean, isObject } from 'Utility/UtilityFunctionts';

type IDRTable = {
    titles?: string[],
    data?: any[][] | object[],
    verticalTitle?: boolean,
    width?: number,
    height?: number,
    toMirrorAcrossDiagonal?: boolean,
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
                return <TableCell >
                    <Avatar
                        sx={{
                            bgcolor: green[500],
                            width: 24,
                            height: 24
                        }}
                    >
                        <CheckIcon />
                    </Avatar>
                </TableCell>
            }
            else {
                return <TableCell >
                    <Avatar
                        sx={{
                            bgcolor: red[500],
                            width: 24,
                            height: 24
                        }}
                    >
                        <ClearIcon />
                    </Avatar>
                </TableCell>
            }
        }
        // if (isObject(element)) {
        //     return <TableCell >
        //     </TableCell>
        // }
        return <TableCell >
            {element}
        </TableCell>
    } catch (error) {
        console.error(error)
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
    const { verticalTitle, toMirrorAcrossDiagonal, titles, data } = props;
    const dataUsed = convertData(data, toMirrorAcrossDiagonal)
    try {
        return (
            <TableContainer component={Paper}>
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
                            return <TableRow  >
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
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: theme.palette.error.main }}>DRTable error</div>
    }
}

export default DRTable;