import DRTextarea from 'components/DRTextarea';
import { useState } from 'react';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';
import { isNullOrEmpty } from 'utility/UtilityFunctionts';
import ReportForm, { ReportBody } from './ReportForm';

type ABFDBugFormProps = {
    open: boolean;
    onClose: () => void;
}

class BugType {
    description: string = ""
    additionalDescription: string = ""
    nickname: string = ""
}

function ABFDBugForm(props: ABFDBugFormProps) {
    const [data, setData] = useState<BugType>(new BugType())
    const { open, onClose } = props;
    const [errorFields, setErrorFields] = useState<string[]>([])

    function getData() {
        if (isNullOrEmpty(data.description)) {
            setErrorFields(["description"])
            return undefined
        }
        setErrorFields([])
        let res: ReportBody = {
            repo: "",
            title: "",
            body: "",
            labels: []
        }
        return res
    }

    return (
        <ReportForm<BugType>
            open={open}
            onClose={onClose}
            title={"Bug report"}
            data={data}
            maxWidth={"md"}
            getData={getData}
        >
            <DRTextarea
                fieldName="description"
                label="What happened?"
                helperText="Also tell us, what did you expect to happen?"
                placeholder="Tell us what you see!"
                required
                onChange={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.description || ""}
                errorFields={errorFields}
            />
            <DRTextarea
                fieldName="additionalDescription"
                label="Additional Description"
                helperText="Add a description to help us understand"
                onChange={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.additionalDescription || ""}
                errorFields={errorFields}
            />
            <DRTextarea
                fieldName="nickname"
                label="Your Nickname"
                helperText="Add your contact so we can contact you for more information"
                placeholder="Discrod: _balck_ram_"
                onChange={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.nickname || ""}
                errorFields={errorFields}
            />
        </ReportForm>
    )
}

export default ABFDBugForm   