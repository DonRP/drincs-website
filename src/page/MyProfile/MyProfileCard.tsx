import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';

type Iprops = {
    title: string | JSX.Element,
    body: JSX.Element,
    actions: JSX.Element,
}

export default function MyProfileCard(props: Iprops) {
    const {
        title,
        body,
        actions,
    } = props

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 0, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <Card>
                    <Box sx={{ mb: 1 }}>
                        {title}
                    </Box>
                    <Divider />
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{ my: 1 }}
                    >
                        {body}
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            {actions}
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Stack>
        </Box>
    );
}
