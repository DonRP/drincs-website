import { DRButtonNoMargin } from 'components/DRButton';
import DRTextField from 'components/DRTextField';
import { useState } from 'react';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';
import ReportForm from './ReportForm';

type ABFDBugFormProps = {
    open: boolean;
    onClose: () => void;
}

class BugType {
    description: string = ""
}

function ABFDBugForm(props: ABFDBugFormProps) {
    const [data, setData] = useState<BugType>(new BugType())
    const { open, onClose } = props;
    const [errorFields, setErrorFields] = useState([])


    return (
        <ReportForm<BugType>
            open={open}
            onClose={onClose}
            title={"Bug report"}
            data={data}
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
                onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.description || ""}
                errorFields={errorFields}
            />
            <DRTextField
                fieldName="additionalDescription"
                label="Additional Description"
                helperText="Add a description to help us understand"
                required
                onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.description || ""}
                errorFields={errorFields}
            />
            <DRTextField
                fieldName="nickname"
                label="Your Nickname"
                helperText="Add your contact so we can contact you for more information"
                placeholder="Discrod: _balck_ram_"
                onChangeValue={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.description || ""}
                errorFields={errorFields}
            />
        </ReportForm>
    )
}

export default ABFDBugForm   