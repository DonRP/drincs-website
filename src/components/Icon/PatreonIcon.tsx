import { myUseTheme } from 'Theme';
import { ReactComponent as Icon } from 'svg/patreon.svg';

type PatreonIconProps = {
    fill?: string;
}

function PatreonIcon(props: PatreonIconProps) {
    const theme = myUseTheme()
    return <Icon
        fill={props.fill ? props.fill : theme.palette.text.icon}
    />
}

export default PatreonIcon;