import { myUseTheme } from 'Theme';
import { ReactComponent as Icon } from 'svg/discord.svg';

type DiscordIconProps = {
    fill?: string;
}

function DiscordIcon(props: DiscordIconProps) {
    const theme = myUseTheme()
    return <Icon
        fill={props.fill ? props.fill : theme.palette.text.icon}
    />
}

export default DiscordIcon;