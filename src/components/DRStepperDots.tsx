import MobileStepper from '@mui/material/MobileStepper';

type IProps = {
    steps: number;
    activeStep: number;
}

export default function DRStepperDots(props: IProps) {
    const { steps, activeStep } = props;

    return (
        <MobileStepper
            variant="dots"
            steps={steps}
            position="static"
            activeStep={activeStep}
            nextButton={
                // <Button size="small" onClick={handleNext} disabled={activeStep === steps - 1}>
                //     Next
                //     {theme.direction === 'rtl' ? (
                //         <KeyboardArrowLeft />
                //     ) : (
                //         <KeyboardArrowRight />
                //     )}
                // </Button>
                <></>
            }
            backButton={
                // <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                //     {theme.direction === 'rtl' ? (
                //         <KeyboardArrowRight />
                //     ) : (
                //         <KeyboardArrowLeft />
                //     )}
                //     Back
                // </Button>
                <></>
            }
        />
    );
}