import { Chip, Tooltip } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import { ReactNode } from 'react';
import DRErrorComponent from './DRErrorComponent';

export interface IDRChipProps {
    label: string,
    children?: ReactNode
    sx?: SxProps
    ariaLabel?: string
}

function DRChip(props: IDRChipProps) {
    const {
        label,
        children,
        sx,
        ariaLabel
    } = props;

    try {
        return (
            <Tooltip
                title={ariaLabel}
            >

                <Chip
                    sx={sx}
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