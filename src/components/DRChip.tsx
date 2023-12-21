import { Chip, ChipProps, ChipTypeMap, Tooltip } from '@mui/joy';
import DRErrorComponent from './DRErrorComponent';

export interface IProps extends ChipProps<ChipTypeMap['defaultComponent'], {
    component?: React.ElementType;
}> {
    ariaLabel?: string
}

function DRChip(props: IProps) {
    const {
        ariaLabel,
        ...rest
    } = props;

    try {
        return (
            <Tooltip
                title={ariaLabel}
            >
                <Chip
                    {...rest}
                />
            </Tooltip>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRChip"} />
    }
}

export default DRChip;