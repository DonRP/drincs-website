import { Button, Card, CardActions, CardContent, CardHeader, Rating, Typography, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

type IDRSupportCardProps = {
    stars: number;
}

function DRSupportCard(props: IDRSupportCardProps) {
    const theme = useTheme();

    try {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardHeader
                    action={
                        <Rating
                            name="read-only"
                            value={1}
                            readOnly
                            sx={{
                                marginTop: 1,
                                marginLeft: 1,
                            }}
                        />
                    }
                    title={"Official Supporter"}
                    subheader={".............."}
                />
                <CardContent>
                    <Grid2
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Grid2
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Typography variant="h4" >
                                €1
                            </Typography>
                        </Grid2>
                        <Grid2>
                            <Typography color="text.secondary">
                                / month
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: theme.palette.error.main }}>DRSupportCard error</div>
    }
}

export default DRSupportCard;