import InfoIcon from '@mui/icons-material/Info';
import { Alert, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/joy';
import { Rating } from '@mui/material';
import { DRButtonNoMargin } from './DRButton';
import DRChip from './DRChip';
import DRErrorComponent from './DRErrorComponent';

type IDRSupportCardProps = {
    stars: number;
    title: string;
    month_price: number;
    year_price: number;
}

function DRSupportCard(props: IDRSupportCardProps) {
    const { stars, title, month_price, year_price } = props;

    try {
        return (
            <Card
                sx={{
                    backgroundColor: "#19759554",
                    border: 1,
                    "border-color": "#197595",
                }}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems={{ xs: "flex-start", lg: 'center' }}
                >
                    <Typography
                        component='h6'
                        fontSize={20}
                    >
                        {title}
                    </Typography>
                    <Rating
                        name="read-only"
                        value={stars}
                        readOnly
                        sx={{
                            display: { xs: 'none', lg: 'flex' },
                        }}
                    />
                </Grid>

                <Rating
                    name="read-only"
                    value={stars}
                    readOnly
                    sx={{
                        marginTop: 1,
                        display: { xs: 'flex', lg: 'none' },
                        position: 'absolute', top: '0.875rem', right: '1.1rem'
                    }}
                />
                <CardContent>
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="start"
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <Typography
                                    fontSize={35}
                                >
                                    €{month_price}
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography
                                // color="text.secondary"
                                >
                                    / month
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <Typography
                                    fontSize={35}
                                >
                                    €{year_price}
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography
                                // color="text.secondary"
                                >
                                    / year
                                </Typography>
                            </Grid>
                            <Grid>
                                <IconButton
                                    color="primary"
                                    aria-label="Annual price is only for sites where it is available"
                                    title="Annual price is only for sites where it is available"
                                    size="sm"
                                >
                                    <InfoIcon />
                                </IconButton>
                            </Grid>
                            {/* <Grid>
                                <Typography variant="body2" align="left">
                                    ....
                                </Typography>
                            </Grid> */}
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid
                        xs={12}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid xs={12}>
                            <Alert>Don't support me for gifts, but to give me the time to spend on the project</Alert>
                        </Grid>
                        <Grid xs={12}>
                            <DRButtonNoMargin
                                label='BuyMeACoffe'
                                ariaLabel='0% retained by BuyMeACoffe'
                                marginTop={0}
                                marginBottom={0}
                                onClick={() => {
                                    window.open("https://www.buymeacoffee.com/DRincs")
                                }}
                                endIcon={
                                    <DRChip
                                        label="0%"
                                        sx={{ color: "green" }}
                                    />
                                }
                            />
                        </Grid>
                        {/* <Grid xs={12}>
                            <DRButtonNoMargin
                                title='PayPal'
                                ariaLabel='0% retained by PayPal'
                                marginTop={0}
                                marginBottom={0}
                                onClick={() => {
                                    window.open("https://www.paypal.com/paypalme/DRincsProductions")
                                }}
                                endIcon={
                                    <DRChip
                                        label="0%"
                                        sx={{ color: "green" }}
                                    />
                                }
                            />
                        </Grid> */}
                        <Grid xs={12}>
                            <DRButtonNoMargin
                                label='Patreon'
                                ariaLabel='8% retained by Patreon'
                                onClick={() => {
                                    window.open("https://www.patreon.com/DRincs")
                                }}
                                endIcon={
                                    <DRChip
                                        label="8%"
                                        sx={{ color: "red" }}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRSupportCard"} />
    }
}

export default DRSupportCard;