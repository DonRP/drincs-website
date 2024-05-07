import { myUseTheme } from '../../Theme';
import Icon from '../..assets/buymeacoffee.svg?react';

interface IProps {
    fill?: string;
}

function BuyMeACoffeeIcon(props: IProps) {
    const theme = myUseTheme()
    return <Icon
        fill={props.fill ? props.fill : theme.palette.text.primary}
    />
}

export default BuyMeACoffeeIcon;