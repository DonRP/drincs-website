import { Card } from '@mui/joy';
import Box from '@mui/joy/Box';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import DRSheet from '../../components/DRSheet';

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
        <DRSheet
            sx={{
                maxWidth: 800,
                mx: 'auto', // margin left & right
                my: 4, // margin top & bottom
                py: 3, // padding top & bottom
                px: 2, // padding left & right
                display: 'flex',
                flexDirection: 'column',
            }}
            variant="outlined"
        >
            <Card>
                <Box sx={{ mb: 1 }}>
                    {title}
                </Box>
                <Divider />
                {body}
                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions
                        sx={{
                            alignSelf: { xs: "self-start", sm: 'flex-end' },
                            pt: 2
                        }}
                    >
                        {actions}
                    </CardActions>
                </CardOverflow>
            </Card>
        </DRSheet>
    );
}
