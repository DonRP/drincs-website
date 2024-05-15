import { useTheme } from '@drincs/react-components';
import { logError } from '../utility/Logger';

type IDRErrorComponentProps = {
    error: any,
    text: string,
}

function DRErrorComponent(props: IDRErrorComponentProps) {
    const theme = useTheme()
    logError(props.text, props.error)
    return <div style={{ color: theme.palette.danger[500] }}>{props.text}</div>
}

export default DRErrorComponent;