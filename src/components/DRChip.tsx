import { Chip } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import { ReactNode } from 'react';
import DRErrorComponent from './DRErrorComponent';

export interface IDRChipProps {
    label: string,
    children?: ReactNode,
    sx?: SxProps
}

function DRChip(props: IDRChipProps) {
    const {
        label,
        children,
        sx,
    } = props;

    try {
        return (
            <Chip
                sx={sx}
            >
                {label}
                {children}
            </Chip>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRChip"} />
    }
}

export default DRChip;