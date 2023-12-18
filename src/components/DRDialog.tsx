import { DialogContent, ModalClose } from '@mui/joy';
import DialogActions from '@mui/joy/DialogActions';
import DialogTitle from '@mui/joy/DialogTitle';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';

interface IProps extends IDRDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    children?: React.ReactNode;
    head?: string | React.ReactNode;
    actions?: React.ReactNode;
}

export interface IDRDialogProps extends ModalDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

function DRDialog(props: IProps) {
    const {
        open
        , setOpen
        , children
        , actions
        , head
        , ...rest
    } = props;

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog {...rest}>
                <ModalClose />
                {head &&
                    <DialogTitle>
                        {head}
                    </DialogTitle>
                }
                {head &&
                    <Divider />
                }
                <DialogContent
                    sx={{
                        padding: 1
                    }}
                >
                    {children}
                </DialogContent>
                <DialogActions>
                    {actions}
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}

export default DRDialog;
