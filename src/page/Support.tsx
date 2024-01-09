import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import WarningIcon from '@mui/icons-material/Warning';
import { Grid, Stack, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import DRAlert from "components/DRAlert";
import DRIconButton from 'components/DRIconButton';
import DRStepperDots from 'components/DRStepperDots';
import DRSupportCard from "components/DRSupportCard";
import GifsGrid, { IGifGridRow } from 'components/Grid/GifsGrid';
import BuyMeACoffeeIcon from 'components/Icon/BuyMeACoffeeIcon';
import KofiIcon from 'components/Icon/KofiIcon';
import PayPalIcon from 'components/Icon/PayPalIcon';
import { BuyMeACoffeeLink, KofiLink, gitHubLink } from "constant";
import { t } from 'i18next';
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
            <KofiIcon />
            <Typography
                ml={2}
            >
                Ko-fi
            </Typography>
        </Typography>,
        link: KofiLink,
    },
    {
        logo: <Typography
            level="title-lg"
            sx={{ mr: 'auto' }}
            fontSize={20}
        >
            <BuyMeACoffeeIcon />
            <Typography
                ml={2}
            >
                Buy Me A Coffe
            </Typography>
        </Typography>,
        link: BuyMeACoffeeLink,
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
                        {t("support_development_info") + " "} <a href={gitHubLink + "/drincs-website/issues/37"}>GitHub issue</a>
                    </DRAlert>
                    <DRAlert
                        startDecorator={<FavoriteIcon />}
                        color="primary"
                    >
                        {t("not_support_us_for_benefits")}
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
                            ariaLabel={t("before")}
                            size="sm"
                            onClick={handleBack}
                        >
                            <NavigateBeforeIcon />
                        </DRIconButton>
                        {data.map((item, index) => {
                            if (index === activeStep || index === activeStep + 1 || index === activeStep + 2)
                                return <Grid>{item.card}</Grid>
                            return <></>
                        })}

                        <DRIconButton
                            ariaLabel={t("next")}
                            size="sm"
                            onClick={handleNext}
                        >
                            <NavigateNextIcon />
                        </DRIconButton>
                    </Grid>
                    <Grid>
                        <DRStepperDots
                            steps={data.length - 2}
                            activeStep={activeStep}
                            backButton={<></>}
                            nextButton={<></>}
                        />
                    </Grid>
                </Grid>
                {/* mobile */}
                <Tabs
                    aria-label={t("pricing_plan")}
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
                    title={t("gifs")}
                    rows={gifs}
                    height={227}
                />
            </Grid >
        </>
    );
}

export default Support;
