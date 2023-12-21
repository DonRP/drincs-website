import { Skeleton, Table, TableProps } from '@mui/joy';
import { CSSProperties } from 'react';
import { isObject } from 'utility/UtilityFunctionts';
import DRErrorComponent from './DRErrorComponent';

interface IProps extends TableProps {
    titles?: string[],
    data?: any[][] | object[],
    verticalTitle?: boolean,
    width?: number,
    height?: number,
    toMirrorAcrossDiagonal?: boolean,
    sxColumns?: CSSProperties[]
    sxRows?: CSSProperties[]
    loading?: boolean
    laodingRows?: number
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


export default function DRTable(props: IProps) {
    const {
        verticalTitle
        , toMirrorAcrossDiagonal
        , titles
        , data
        , sxColumns = []
        , sxRows = []
        , borderAxis = "both"
        , loading
        , laodingRows = 5
        , ...rest
    } = props;

    const dataUsed = convertData(data, toMirrorAcrossDiagonal)

    try {
        if (loading) {
            return (
                <>
                    <Table
                        borderAxis={borderAxis}
                        {...rest}
                        sx={{
                            paddingX: 1,
                        }}
                    >
                    </Table>
                    {Array.from(Array(laodingRows), (e, i) => {
                        return <Skeleton animation="wave" variant="text" level="h2" key={i} />
                    })}
                </>
            );
        }
        return (
            <Table
                borderAxis={borderAxis}
                {...rest}
            >
                <thead>
                    {!verticalTitle && titles &&
                        <tr>
                            {titles.map((title) => {
                                return <th  >
                                    {title}
                                </th>
                            })}
                        </tr>
                    }
                </thead>
                <tbody>

                    {dataUsed.map((item, indexRox) => {
                        return item.length > 0 ? <tr key={indexRox}>
                            {verticalTitle && titles &&
                                <th >
                                    {titles.length > indexRox && <>
                                        {titles[indexRox]}
                                    </>}
                                </th>
                            }
                            {item.map((item, indexColumn) => {
                                if (sxColumns.length > indexColumn) {
                                    return <th
                                        scope="row"
                                        style={sxColumns[indexColumn]}
                                        key={indexColumn}
                                    >
                                        {item}
                                    </th>
                                }
                                if (sxRows.length > indexRox) {
                                    return <td
                                        style={sxRows[indexRox]}
                                        key={indexColumn}
                                    >
                                        {item}
                                    </td>
                                }
                                return <td
                                    key={indexColumn}
                                >
                                    {item}
                                </td>
                            })}
                        </tr>
                            : <></>
                    })}
                </tbody>
            </Table>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRTable"} />
    }
}
