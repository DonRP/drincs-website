import { ColorPaletteProp } from '@mui/joy';
import Link from '@mui/joy/Link';
import { LinkProps, Link as RouterLink } from 'react-router-dom';

export interface IProps extends LinkProps {
    color?: ColorPaletteProp
}

export default function DRLink(props: IProps) {
    const {
        ...rest
    } = props

    return (

        <Link
            {...rest}
            component={RouterLink}
        />
    );
}
