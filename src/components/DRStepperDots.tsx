import MobileStepper, { MobileStepperProps } from '@mui/material/MobileStepper';

interface IProps extends MobileStepperProps {
}

export default function DRStepperDots(props: IProps) {
    const {
        sx,
        variant = "dots",
        position = "static",
        ...rest
    } = props;

    return (
        <MobileStepper
            sx={{
                backgroundColor: "transparent",
                ...sx,
            }}
            variant={variant}
            position={position}
            {...rest}
        />
    );
}