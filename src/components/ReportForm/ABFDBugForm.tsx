import DRAutocomplete from 'components/DRAutocomplete';
import DRTextField from 'components/DRTextField';
import DRTextarea from 'components/DRTextarea';
import { ABFDrepo } from 'constant';
import { useState } from 'react';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';
import { isNullOrEmpty } from 'utility/UtilityFunctionts';
import ReportForm, { ReportBody } from './ReportForm';

type ABFDBugFormProps = {
    open: boolean;
    onClose: () => void;
}

class BugType {
    title: string = ""
    description: string = ""
    additionalDescription: string = ""
    nickname: string = ""
    device: string = ""
}

function ABFDBugForm(props: ABFDBugFormProps) {
    const [data, setData] = useState<BugType>(new BugType())
    const { open, onClose } = props;
    const [errorFields, setErrorFields] = useState<string[]>([])

    function getData() {
        let error: string[] = []
        if (isNullOrEmpty(data.description)) {
            error.push("description")
        }
        if (isNullOrEmpty(data.title)) {
            error.push("title")
        }
        setErrorFields(error)
        if (error.length > 0) {
            return
        }
        setErrorFields([])
        let res: ReportBody = {
            repo: ABFDrepo,
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
            <DRTextField
                fieldName="title"
                label="Title"
                required
                onChange={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.title || ""}
                errorFields={errorFields}
            />
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
            <DRAutocomplete
                fieldName="device"
                label="Device"
                helperText="Which device were you using?"
                options={["Windows", "Mac", "Linux", "Android", "iOS", "Web", "Other"]}
                required
                onChange={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.device || ""}
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