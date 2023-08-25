import ImageIcon from '@mui/icons-material/Image';
import DRAlert from 'components/DRAlert';
import { DRButtonNoMargin } from 'components/DRButton';
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
            // onClose={handleClose}
            title={"Bug report"}
            maxWidth={"md"}
            actions={
                <>
                    <DRButtonNoMargin
                        label='Cancel'
                    // onClick={handleClose}
                    />
                    <DRButtonNoMargin
                        label='Send'
                    // onClick={handleClose}
                    />
                </>
            }
        >
            <DRTextField
                fieldName="description"
                label="What happened?"
                helperText="Also tell us, what did you expect to happen?"
                placeholder="Tell us what you see!"
                required
                onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, bugItemToEdit, setBugItemToEdit)}
                defaultValue={bugItemToEdit?.description || ""}
                errorFields={errorFields}
            />
            <DRTextField
                fieldName="additionalDescription"
                label="Additional Description"
                helperText="Add a description to help us understand"
                required
                onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, bugItemToEdit, setBugItemToEdit)}
                defaultValue={bugItemToEdit?.description || ""}
                errorFields={errorFields}
            />
            <DRTextField
                fieldName="nickname"
                label="Your Nickname"
                helperText="Add your contact so we can contact you for more information"
                placeholder="Discrod: _balck_ram_"
                onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, bugItemToEdit, setBugItemToEdit)}
                defaultValue={bugItemToEdit?.description || ""}
                errorFields={errorFields}
            />
            <DRAlert
                startDecorator={< ImageIcon />}
            >
                To add images or files you can use WeTransfer (or other methods to share files) and add the link to the description. Or use GitHub
            </DRAlert>

        </DRDialog>
    )
}

export default ABFDBugForm   