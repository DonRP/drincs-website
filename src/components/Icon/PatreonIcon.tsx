import { myUseTheme } from '../../Theme';
import Icon from '../../assets/patreon.svg?react';

interface IProps {
    fill?: string;
}

function PatreonIcon(props: IProps) {
    const theme = myUseTheme()
    return <Icon
        fill={props.fill ? props.fill : theme.palette.text.primary}
    />
}

export default PatreonIcon;