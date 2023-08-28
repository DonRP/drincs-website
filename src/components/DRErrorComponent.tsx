import { myUseTheme } from 'Theme';
import { logError } from 'utility/Logger';

type IDRErrorComponentProps = {
    error: any,
    text: string,
}

function DRErrorComponent(props: IDRErrorComponentProps) {
    const theme = myUseTheme()
    logError(props.text, props.error)
    return <div style={{ color: theme.palette.danger[500] }}>{props.text}</div>
}

export default DRErrorComponent;