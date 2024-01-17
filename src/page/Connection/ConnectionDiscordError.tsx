import ReportIcon from '@mui/icons-material/Report';
import { Avatar, AvatarGroup, Grid, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';

export default function ConnectionDiscordError() {
    const { t } = useTranslation(["translation"]);

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid>
                <AvatarGroup
                    sx={{
                        "--Avatar-size": "150px"
                    }}
                >
                    <Avatar>
                        <ReportIcon
                            color='error'
                            sx={{ fontSize: 120 }}
                        />
                    </Avatar>
                </AvatarGroup>
            </Grid>
            <Grid>
                <Typography level="h4" gutterBottom
                    fontSize={28}
                >
                    {t('connection_discord_error')}
                </Typography>
            </Grid>
            <Grid>
                <Typography level="title-md"
                    sx={{
                        marginBottom: 2
                    }}
                >
                    {t('connection_discord_error_subtitle')}
                </Typography>
            </Grid>
        </Grid>
    );
}
