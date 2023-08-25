import { Typography } from '@mui/joy';
import DRDialog from 'components/DRDialog';
import DRTextField from 'components/DRTextField';
import { useState } from 'react';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';

type ABFDBugFormProps = {
    open: boolean;
    onClose: () => void;
}

class BugType {
    description: string = ""
}

function ABFDBugForm(props: ABFDBugFormProps) {
    const [bugItemToEdit, setBugItemToEdit] = useState<BugType>(new BugType())
    const { open, onClose } = props;
    const [errorFields, setErrorFields] = useState([])


    return (
        <DRDialog
            open={open}
            onClose={onClose}
            title={"Bug report"}
            maxWidth={"md"}
            actions={
                <>
                    {/* <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSend}>Send</Button> */}
                </>
            }
        >
            {/* <DialogContentText>
                For now you can't upload files (images or saves etc...), if you want to do it you can share them through WeTransfer (or similar) and put the link in Additional context, or you can use <a href="https://github.com/DonRP/ABFD/issues/new/choose">GitHub</a>.
            </DialogContentText> */}
            <Typography>
                What happened?
            </Typography>
            <Typography>
                Also tell us, what did you expect to happen?
            </Typography>
            <DRTextField
                fieldName="description"
                label="Description"
                required
                onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, bugItemToEdit, setBugItemToEdit)}
                defaultValue={bugItemToEdit?.description || ""}
                rows={3}
                errorFields={errorFields}
            />
            {/* 
            <DRTextField
                fieldName="nickname"
                label="Your nickname"
                onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, bugItemToEdit, setBugItemToEdit)}
                defaultValue={bugItemToEdit?.nickname || ""}
            /> */}

        </DRDialog>
    )
}

export default ABFDBugForm   