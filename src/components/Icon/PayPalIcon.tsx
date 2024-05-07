import { myUseTheme } from '../../Theme';
import Icon from '../../assets/paypal.svg?react';

interface IProps {
    fill?: string;
}

function PayPalIcon(props: IProps) {
    const theme = myUseTheme()
    return <Icon
        fill={props.fill ? props.fill : theme.palette.text.primary}
    />
}

export default PayPalIcon;