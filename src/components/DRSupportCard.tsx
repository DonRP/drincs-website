import Check from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Card, CardActions, Divider, Grid, List, ListItem, ListItemDecorator, Typography } from '@mui/joy';
import { BoostyLink, BuyMeACoffeeLink, KofiLink, PatreonLink } from 'constant';
import { useTranslation } from 'react-i18next';
import { DRButtonNoMargin } from './DRButton';
import DRChip from './DRChip';
import DRErrorComponent from './DRErrorComponent';
import BoostyIcon from './Icon/BoostyIcon';
import BuyMeACoffeeIcon from './Icon/BuyMeACoffeeIcon';
import KofiIcon from './Icon/KofiIcon';
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
    const { t } = useTranslation(["translation"]);
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
                        {"/ " + t("month").toLocaleLowerCase()}
                    </Typography>
                </Typography>
                <Typography
                    level="title-lg"
                    sx={{ mr: 'auto' }}
                    fontSize={25}
                >
                    {year_price}€{' '}
                    <Typography fontSize="sm" textColor="text.tertiary">
                        {"/ " + t("year").toLocaleLowerCase()}
                    </Typography>
                </Typography>
                <Divider inset="none" />
                <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                    <ListItem>
                        <ListItemDecorator>
                            {discord_role ? <Check /> : <ClearIcon />}
                        </ListItemDecorator>
                        {t("site_role", { site: "Discord" })}
                    </ListItem>
                    <ListItem>
                        <ListItemDecorator>
                            {news ? <Check /> : <ClearIcon />}
                        </ListItemDecorator>
                        {t("private_news")}
                    </ListItem>
                    <ListItem>
                        <ListItemDecorator>
                            {voting_power ? <Check /> : <ClearIcon />}
                        </ListItemDecorator>
                        {t("voting_power")}
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
                                size='sm'
                                variant="soft"
                                color="neutral"
                                onClick={() => {
                                    window.open(KofiLink)
                                }}
                                startDecorator={
                                    <KofiIcon />
                                }
                                endDecorator={
                                    <DRChip
                                        size='sm'
                                        ariaLabel={t("retained_by", { site: "Ko-fi", percent: "0%" })}
                                        sx={{ color: "green" }}
                                    >
                                        {"8%"}
                                    </DRChip>
                                }
                            >
                                {"Ko-fi"}
                            </DRButtonNoMargin>
                        </Grid>
                        <Grid xs={12}>
                            <DRButtonNoMargin
                                size='sm'
                                variant="soft"
                                color="neutral"
                                onClick={() => {
                                    window.open(BuyMeACoffeeLink)
                                }}
                                startDecorator={
                                    <BuyMeACoffeeIcon />
                                }
                                endDecorator={
                                    <DRChip
                                        size='sm'
                                        ariaLabel={t("retained_by", { site: "BuyMeACoffe", percent: "0%" })}
                                        sx={{ color: "green" }}
                                    >
                                        {"0%"}
                                    </DRChip>
                                }
                            >
                                {"Buy Me A Coffe"}
                            </DRButtonNoMargin>
                        </Grid>
                        <Grid xs={12}>
                            <DRButtonNoMargin
                                size='sm'
                                variant="soft"
                                color="neutral"
                                onClick={() => {
                                    window.open(PatreonLink)
                                }}
                                startDecorator={
                                    <PatreonIcon />
                                }
                                endDecorator={
                                    <DRChip
                                        size='sm'
                                        ariaLabel={t("retained_by", { site: "Patreon", percent: "8%" })}
                                        sx={{ color: "red" }}
                                    >
                                        {"8%"}
                                    </DRChip>
                                }
                            >
                                {"Patreon"}
                            </DRButtonNoMargin>
                        </Grid>
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
                                    size='sm'
                                    variant="soft"
                                    color="neutral"
                                    onClick={() => {
                                        window.open(BoostyLink)
                                    }}
                                    startDecorator={
                                        <BoostyIcon />
                                    }
                                    endDecorator={
                                        <DRChip
                                            size='sm'
                                            ariaLabel={t("retained_by", { site: "Boosty", percent: "10%" })}
                                            sx={{ color: "red" }}
                                        >
                                            {"8%"}
                                        </DRChip>
                                    }
                                >
                                    {"Boosty"}
                                </DRButtonNoMargin>
                            </Grid>
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