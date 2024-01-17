import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Avatar, AvatarGroup, Grid, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';

export default function ConnectionDiscordSuccessPage() {
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
                        <CheckBoxIcon
                            color='success'
                            sx={{ fontSize: 120 }}
                        />
                    </Avatar>
                </AvatarGroup>
            </Grid>
            <Grid>
                <Typography level="h4" gutterBottom
                    fontSize={28}
                >
                    {t('connection_discord_success')}
                </Typography>
            </Grid>
            <Grid>
                <Typography level="title-md"
                    sx={{
                        marginBottom: 2
                    }}
                >
                    {t('connection_discord_success_subtitle')}
                </Typography>
            </Grid>
        </Grid>
    );
}
