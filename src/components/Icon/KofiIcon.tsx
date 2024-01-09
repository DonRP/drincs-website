import { myUseTheme } from 'Theme';
import { ReactComponent as Icon } from 'svg/kofi.svg';

interface IProps {
    fill?: string;
}

export default function KofiIcon(props: IProps) {
    const theme = myUseTheme()
    return <Icon
        fill={props.fill ? props.fill : theme.palette.text.primary}
    />
}
