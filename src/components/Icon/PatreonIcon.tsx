import { useTheme } from '@drincs/react-components';
import Icon from '../../assets/patreon.svg?react';

interface IProps {
    fill?: string;
}

function PatreonIcon(props: IProps) {
    const theme = useTheme()
    return <Icon
        fill={props.fill ? props.fill : theme.palette.text.primary}
    />
}

export default PatreonIcon;