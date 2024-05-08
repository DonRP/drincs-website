import { useTheme } from '@drincs/react-components';
import { SVGAttributes } from 'react';
import Icon from '../../assets/buymeacoffee.svg?react';

export default function BuyMeACoffeeIcon(props: SVGAttributes<SVGSVGElement>) {
    const {
        fill = useTheme().palette.text.primary,
        ...rest
    } = props
    return <Icon
        fill={fill}
        {...rest}
    />
}
