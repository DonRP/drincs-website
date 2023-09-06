import Check from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import { Card, CardActions, Divider, Grid, List, ListItem, ListItemDecorator, Typography } from '@mui/joy';
import { DRButtonNoMargin } from './DRButton';
import DRChip from './DRChip';
import DRErrorComponent from './DRErrorComponent';
import PatreonIcon from './Icon/PatreonIcon';

type IDRSupportCardProps = {
    title: string
    month_price: number
    year_price: number
    discord_role: boolean
    news: boolean
    voting_power: boolean
}

function DRSupportCard(props: IDRSupportCardProps) {
    const { title, month_price, year_price, discord_role, news, voting_power } = props;

    try {
        return (
            <Card
                sx={{
                    backgroundColor: "#19759554",
                    border: 1,
                    "border-color": "#197595",
                    minWidth: 250,
                    maxWidth: { lg: 300 },
                }}
            >
                <Typography level="h2">{title}</Typography>
                <Typography
                    level="title-lg"
                    sx={{ mr: 'auto' }}
                    fontSize={25}
                >
                    {month_price}€{' '}
                    <Typography fontSize="sm" textColor="text.tertiary">
                        / month
                    </Typography>
                </Typography>
                <Typography
                    level="title-lg"
                    sx={{ mr: 'auto' }}
                    fontSize={25}
                >
                    {year_price}€{' '}
                    <Typography fontSize="sm" textColor="text.tertiary">
                        / year
                    </Typography>
                </Typography>
                <Divider inset="none" />
                <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                    <ListItem>
                        <ListItemDecorator>
                            {discord_role ? <Check /> : <ClearIcon />}
                        </ListItemDecorator>
                        Discord Role
                    </ListItem>
                    <ListItem>
                        <ListItemDecorator>
                            {news ? <Check /> : <ClearIcon />}
                        </ListItemDecorator>
                        Private News
                    </ListItem>
                    <ListItem>
                        <ListItemDecorator>
                            {voting_power ? <Check /> : <ClearIcon />}
                        </ListItemDecorator>
                        Voting Power
                    </ListItem>
                </List>
                <Divider inset="none" />
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
                            <DRButtonNoMargin
                                label='Buy Me A Coffe'
                                size='sm'
                                variant="soft"
                                color="neutral"
                                onClick={() => {
                                    window.open("https://www.buymeacoffee.com/DRincs")
                                }}
                                startIcon={
                                    <FreeBreakfastIcon fontSize="small" />
                                }
                                endIcon={
                                    <DRChip
                                        label="0%"
                                        size='sm'
                                        ariaLabel='0% retained by BuyMeACoffe'
                                        sx={{ color: "green" }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid xs={12}>
                            <DRButtonNoMargin
                                label='Patreon'
                                size='sm'
                                variant="soft"
                                color="neutral"
                                onClick={() => {
                                    window.open("https://www.patreon.com/DRincs")
                                }}
                                startIcon={
                                    <PatreonIcon />
                                }
                                endIcon={
                                    <DRChip
                                        label="8%"
                                        size='sm'
                                        ariaLabel='8% retained by Patreon'
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