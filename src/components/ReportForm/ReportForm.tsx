import ImageIcon from '@mui/icons-material/Image';
import DRAlert from 'components/DRAlert';
import { DRButtonNoMargin } from 'components/DRButton';
import DRDialog, { IDRDialogProps } from 'components/DRDialog';

interface ReportFormProps<T> extends IDRDialogProps {
    data: T,
}

function ReportForm<T>(props: ReportFormProps<T>) {
    const { children, onClose, ...rest } = props;

    return (
        <DRDialog
            {...rest}
            title={"Bug report"}
            maxWidth={"md"}
            onClose={onClose}
            actions={
                <>
                    <DRButtonNoMargin
                        label='Cancel'
                        onClick={onClose}
                    />
                    <DRButtonNoMargin
                        label='Send'
                    // onClick={onClick}
                    />
                </>
            }
        >
            {children}
            <DRAlert
                startDecorator={< ImageIcon />}
            >
                To add images or files you can use WeTransfer (or other methods to share files) and add the link to the text. Or use GitHub
            </DRAlert>

        </DRDialog>
    )
}

export default ReportForm   