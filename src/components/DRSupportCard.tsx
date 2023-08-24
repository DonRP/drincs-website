import InfoIcon from '@mui/icons-material/Info';
import { Alert, Card, CardActions, CardContent, CardHeader, IconButton, Rating, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Grid2 from '@mui/material/Unstable_Grid2';
import DRButton from './DRButton';
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
            <Card sx={{
                backgroundColor: "#19759554",
                border: 1,
                "border-color": "#197595",
            }}>
                <CardHeader
                    title={
                        <Typography variant="h6" align="left">
                            {title}
                        </Typography>
                    }
                    subheader={
                        <Rating
                            name="read-only"
                            value={stars}
                            readOnly
                            sx={{
                                marginTop: 1,
                                display: { xs: 'none', lg: 'flex' },
                            }}
                        />
                    }
                    action={
                        <Rating
                            name="read-only"
                            value={stars}
                            readOnly
                            sx={{
                                marginTop: 1,
                                display: { xs: 'flex', lg: 'none' },
                            }}
                        />
                    }
                />
                <CardContent>

                    <Grid2
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="start"
                        spacing={1}
                    >
                        <Grid2
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid2
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <Typography variant="h4" >
                                    €{month_price}
                                </Typography>
                            </Grid2>
                            <Grid2>
                                <Typography color="text.secondary">
                                    / month
                                </Typography>
                            </Grid2>
                        </Grid2>
                        <Grid2
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid2
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <Typography variant="h4" >
                                    €{year_price}
                                </Typography>
                            </Grid2>
                            <Grid2>
                                <Typography color="text.secondary">
                                    / year
                                </Typography>
                            </Grid2>
                            <Grid2>
                                <IconButton
                                    color="primary"
                                    aria-label="Annual price is only for sites where it is available"
                                    title="Annual price is only for sites where it is available"
                                    size="small"
                                >
                                    <InfoIcon />
                                </IconButton>
                            </Grid2>
                            {/* <Grid2>
                                <Typography variant="body2" align="left">
                                    ....
                                </Typography>
                            </Grid2> */}
                        </Grid2>
                    </Grid2>
                </CardContent>
                <CardActions>
                    <Grid2
                        xs={12}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid2 xs={12}>
                            <Alert severity="info" icon={false}>Don't support me for gifts, but to give me the time to spend on the project</Alert>
                        </Grid2>
                        <Grid2 xs={12}>
                            <DRButton
                                title='Patreon'
                                ariaLabel='8% retained by Patreon'
                                marginTop={0}
                                marginBottom={0}
                                onClick={() => {
                                    window.open("https://www.patreon.com/DRincs")
                                }}
                            >
                                Patreon
                                <Chip label="8%"
                                    sx={{ color: "red" }}
                                />
                            </DRButton>
                        </Grid2>
                        <Grid2 xs={12}>
                            <DRButton
                                title='Buy Me A Coffe'
                                ariaLabel='0% retained by BuyMeACoffe'
                                marginTop={0}
                                marginBottom={0}
                                onClick={() => {
                                    window.open("https://www.buymeacoffee.com/DRincs")
                                }}
                            >
                                Buy Me A Coffe
                                <Chip label="0%"
                                    sx={{ color: "green" }}
                                />
                            </DRButton>
                        </Grid2>
                    </Grid2>
                </CardActions>
            </Card>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRSupportCard"} />
    }
}

export default DRSupportCard;