import FavoriteIcon from '@mui/icons-material/Favorite';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import WarningIcon from '@mui/icons-material/Warning';
import { Grid, Stack, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import DRAlert from "components/DRAlert";
import DRIconButton from 'components/DRIconButton';
import DRStepperDots from 'components/DRStepperDots';
import DRSupportCard from "components/DRSupportCard";
import GifsGrid, { IGifGridRow } from 'components/Grid/GifsGrid';
import PayPalIcon from 'components/Icon/PayPalIcon';
import { gitHubLink } from "constant";
import { ReactElement, useState } from 'react';
import { analyticPageView } from "utility/Analytics";

type SupportDataType = {
    card: ReactElement,
}

const data: SupportDataType[] = [
    {
        card: <DRSupportCard
            title="Official Supporter"
            month_price={2}
            year_price={20}
            discord_role={true}
            news={true}
            voting_power={false}
        />
    },
    {
        card: <DRSupportCard
            title="Super Supporter"
            month_price={5}
            year_price={50}
            discord_role={true}
            news={true}
            voting_power={true}
        />
    },
    {
        card: <DRSupportCard
            title="Mega Supporter"
            month_price={10}
            year_price={100}
            discord_role={true}
            news={true}
            voting_power={true}
        />
    },
    {
        card: <DRSupportCard
            title="Ultra Supporter"
            month_price={15}
            year_price={150}
            discord_role={true}
            news={true}
            voting_power={true}
        />
    },
    {
        card: <DRSupportCard
            title="VIP Supporter"
            month_price={20}
            year_price={200}
            discord_role={true}
            news={true}
            voting_power={true}
        />
    },
];

const gifs: IGifGridRow[] = [
    {
        logo: <Typography
            level="title-lg"
            sx={{ mr: 'auto' }}
            fontSize={20}
        >
            <FreeBreakfastIcon />
            <Typography
                ml={2}
            >
                Buy Me A Coffe
            </Typography>
        </Typography>,
        link: "https://www.buymeacoffee.com/DRincs",
    },
    {
        logo: <Typography
            level="title-lg"
            sx={{ mr: 'auto' }}
            fontSize={20}
        >
            <PayPalIcon />
            <Typography
                ml={2}
            >
                Pay Pal
            </Typography>
        </Typography>,
        link: "https://www.paypal.com/paypalme/DRincsProductions",
    },
];

function Support() {
    analyticPageView("Support")
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep === data.length - 3) return 0
            return prevActiveStep + 1
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep === 0) return data.length - 3
            return prevActiveStep - 1
        });
    };

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                paddingBottom={3}
            >
                <Stack
                    spacing={0.2}
                    sx={{
                        width: "98%",
                        marginBottom: 2,
                    }}
                >
                    <DRAlert
                        color="warning"
                        startDecorator={<WarningIcon />}
                    >
                        The awards are still under development. For more information read: <a href={gitHubLink + "/drincs-website/issues/37"}>GitHub issue</a>
                    </DRAlert>
                    <DRAlert
                        startDecorator={<FavoriteIcon />}
                        color="primary"
                    >
                        Not support me just to get the benefits, but to make sure that I can spend more time on the project
                    </DRAlert>
                </Stack>
                {/* pc */}
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        display: { xs: 'none', lg: 'flex' },
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={4}
                    >
                        <DRIconButton
                            icon={<NavigateBeforeIcon />}
                            ariaLabel="Before"
                            size="sm"
                            onClick={handleBack}
                        />
                        {data.map((item, index) => {
                            if (index === activeStep || index === activeStep + 1 || index === activeStep + 2)
                                return <Grid>{item.card}</Grid>
                            return <></>
                        })}

                        <DRIconButton
                            icon={<NavigateNextIcon />}
                            ariaLabel="Next"
                            size="sm"
                            onClick={handleNext}
                        />
                    </Grid>
                    <Grid>
                        <DRStepperDots
                            steps={data.length - 2}
                            activeStep={activeStep}
                        />
                    </Grid>
                </Grid>
                {/* mobile */}
                <Tabs
                    aria-label="Pricing plan"
                    defaultValue={1}
                    variant="outlined"
                    sx={{
                        borderRadius: 'lg',
                        boxShadow: 'sm',
                        overflow: 'auto',
                        display: { lg: 'none' },
                        width: "98%",
                        maxWidth: 700,
                    }}
                >
                    <TabList>
                        <Tab value={0}>Official</Tab>
                        <Tab value={1}>Super</Tab>
                        <Tab value={2}>Mega</Tab>
                        <Tab value={3}>Ultra</Tab>
                        <Tab value={4}>VIP</Tab>
                    </TabList>
                    {data.map((item, index) => {
                        return <TabPanel value={index}>
                            {item.card}
                        </TabPanel>
                    })}
                </Tabs>
                {/* gifs */}
                <GifsGrid
                    title={"Gifs"}
                    data={gifs}
                    height={208}
                />
            </Grid >
        </>
    );
}

export default Support;
