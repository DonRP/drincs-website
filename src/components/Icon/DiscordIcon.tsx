import { myUseTheme } from '../../Theme';
import Icon from '../..assets/discord.svg?react';

interface IProps {
    fill?: string;
}

function DiscordIcon(props: IProps) {
    const theme = myUseTheme()
    return <Icon
        fill={props.fill ? props.fill : theme.palette.text.primary}
    />
}

export default DiscordIcon;