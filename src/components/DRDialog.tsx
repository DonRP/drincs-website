import { Close } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/joy';
import { Breakpoint, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ReactNode } from 'react';
import DRErrorComponent from './DRErrorComponent';

export type IDRDialogProps = {
    open: boolean,
    maxWidth?: Breakpoint | false,
    title: string,
    children?: ReactNode,
    actions?: ReactNode,
    onClose?: () => void,
}

function DRDialog(props: IDRDialogProps) {
    const { open = false, maxWidth = false, title, children, actions, onClose } = props;

    try {
        return (
            <Dialog
                open={open}
                maxWidth={maxWidth}
            >
                <DialogTitle>
                    <Typography
                        component="h1"
                        fontSize={20}
                        sx={{
                            paddingLeft: 3,
                            paddingTop: 1,
                        }}
                    >
                        {title}
                    </Typography>
                </DialogTitle>
                <Box position="absolute" top={0} right={0} >
                    <IconButton
                        onClick={onClose}
                    >
                        <Close />
                    </IconButton>
                </Box>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    {actions}
                </DialogActions>
            </Dialog>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"DRDialog"} />
    }
}

export default DRDialog;