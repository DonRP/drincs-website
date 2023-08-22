import { Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@mui/material';
import * as React from 'react';
import { logError } from 'utility/Logger';

type IDRDialogProps = {
    open: boolean,
    maxWidth: false | undefined,
    title: string,
    children: React.ReactNode,
    actions: React.ReactNode,
}

function DRDialog(props: IDRDialogProps) {
    const theme = useTheme();
    const { open = false, maxWidth = false, title, children, actions } = props;

    try {
        return (
            <Dialog
                open={open}
                maxWidth={maxWidth}
                fullWidth
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    {actions}
                </DialogActions>
            </Dialog>
        );
    } catch (error) {
        logError("DRDialog", error)
        return <div style={{ color: theme.palette.error.main }}>DRDialog error</div>
    }
}

export default DRDialog;