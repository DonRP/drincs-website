import { myUseTheme } from 'Theme';
import { ReactComponent as Icon } from 'svg/buymeacoffee.svg';

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