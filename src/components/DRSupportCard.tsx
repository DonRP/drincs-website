import { Card, CardActions, CardContent, CardHeader, Rating, Typography, useTheme } from '@mui/material';
import Chip from '@mui/material/Chip';
import Grid2 from '@mui/material/Unstable_Grid2';
import DRButton from './DRButton';

type IDRSupportCardProps = {
    stars: number;
    title: string;
    month_price: number;
}

function DRSupportCard(props: IDRSupportCardProps) {
    const theme = useTheme();
    const { stars, title, month_price } = props;

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
                        <Grid2>
                            <Typography variant="body2" align="left">
                                Per favore non sostenermi per ottenere ....
                            </Typography>
                        </Grid2>
                    </Grid2>
                </CardContent>
                <CardActions>
                    <Grid2 xs={12}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid2 xs={12}>
                            <DRButton
                                ariaLabel='8% retained by Patreon'
                                marginTop={0}
                                marginBottom={0}
                            >
                                Patreon
                                <Chip label="8%"
                                    sx={{ color: "red" }}
                                />
                            </DRButton>
                        </Grid2>
                        <Grid2 xs={12}>
                            <DRButton ariaLabel='0% retained by BuyMeACoffe'
                                marginTop={0}
                                marginBottom={0}
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
        console.error(error)
        return <div style={{ color: theme.palette.error.main }}>DRSupportCard error</div>
    }
}

export default DRSupportCard;