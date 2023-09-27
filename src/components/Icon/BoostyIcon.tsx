import { myUseTheme } from 'Theme';
import { ReactComponent as Icon } from 'svg/boosty.svg';

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