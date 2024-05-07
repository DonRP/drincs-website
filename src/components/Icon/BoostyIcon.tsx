import { myUseTheme } from '../../Theme';
import Icon from '../../assets/boosty.svg?react';

interface IProps {
    fill?: string;
}

function BoostyIcon(props: IProps) {
    const theme = myUseTheme()
    return <Icon
        fill={props.fill ? props.fill : theme.palette.text.primary}
    />
}

export default BoostyIcon;