import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import * as React from 'react';
import DRErrorComponent from './DRErrorComponent';

type IDRDialogProps = {
    open: boolean,
    maxWidth: false | undefined,
    title: string,
    children: React.ReactNode,
    actions: React.ReactNode,
}

function DRDialog(props: IDRDialogProps) {
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
        return <DRErrorComponent error={error} text={"DRDialog"} />
    }
}

export default DRDialog;