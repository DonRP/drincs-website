import { myUseTheme } from '../../Theme';
import Icon from '../../assets/kofi.svg?react';

interface IProps {
    fill?: string;
}

function KofiIcon(props: IProps) {
    const theme = myUseTheme()
    return <Icon
        fill={props.fill ? props.fill : theme.palette.text.primary}
    />
}

export default KofiIcon;