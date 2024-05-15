import { useTheme } from '@drincs/react-components';
import { SVGAttributes } from 'react';
import Icon from '../../assets/mega.svg?react';

export default function MegaIcon(props: SVGAttributes<SVGSVGElement>) {
    const {
        fill = useTheme().palette.text.primary,
        ...rest
    } = props
    return <Icon
        fill={fill}
        {...rest}
    />
}
