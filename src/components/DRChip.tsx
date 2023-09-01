import { Chip, Tooltip } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import { ReactNode } from 'react';
import DRErrorComponent from './DRErrorComponent';

export interface IDRChipProps {
    label: string,
    children?: ReactNode
    sx?: SxProps
    ariaLabel?: string
    size?: 'sm' | 'md' | 'lg'
}

function DRChip(props: IDRChipProps) {
    const {
        label,
        children,
        sx,
        ariaLabel,
        size,
    } = props;

    try {
        return (
            <Tooltip
                title={ariaLabel}
            >
                <Chip
                    sx={sx}
                    size={size}
                >
                    {label}
                    {children}
                </Chip>
            </Tooltip>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRChip"} />
    }
}

export default DRChip;