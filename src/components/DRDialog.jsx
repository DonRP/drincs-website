import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import * as React from 'react';

function DRDialog(props) {
    const { open = false, maxWidth = false, title, children, actions } = props;

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
}

export default DRDialog;