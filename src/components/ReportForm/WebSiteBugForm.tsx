import DRAutocomplete from 'components/DRAutocomplete';
import DRTextField from 'components/DRTextField';
import DRTextarea from 'components/DRTextarea';
import { Browser, DeviceABFD } from 'constant';
import { ProjectsEnum } from 'enum/ProjectsEnum';
import { useState } from 'react';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';
import { getEnumDescriptions } from 'utility/UtilityEnum';
import { isNullOrEmpty } from 'utility/UtilityFunctionts';
import ReportForm, { ReportBody } from './ReportForm';

type IProps = {
    open: boolean;
    onClose: () => void;
}

class BugType {
    constructor(defDevice: string, defVersion: string) {
        this.device = defDevice
        this.browser = defVersion
    }
    title: string = ""
    description: string = ""
    additionalDescription: string = ""
    nickname: string = ""
    device: string
    browser: string
}

function WebSiteBugForm(props: IProps) {
    const { open, onClose } = props;
    const [errorFields, setErrorFields] = useState<string[]>([])
    const browsers = getEnumDescriptions(Browser)
    const devices = getEnumDescriptions(DeviceABFD)
    const [data, setData] = useState<BugType>(new BugType(devices[0], browsers[0]))

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
            repo: ProjectsEnum.WebSite,
            title: "[Report] " + data.title,
            body: `### What happened?

${data.description}

### Browser

${data.browser}

### Device

${data.device}

### User Nickname

${data.nickname || "_No response_"}

### Additional Description

${data.additionalDescription || "_No response_"}
`,
            labels: ["bug"],
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
            clearData={() => setData(new BugType(devices[0], browsers[0]))}
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
                fieldName="browser"
                label="Browser"
                helperText="Which Browser were you using?"
                options={browsers}
                required
                onChange={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.browser}
                errorFields={errorFields}
                disableClearable
            />
            <DRAutocomplete
                fieldName="device"
                label="Device"
                helperText="Which device were you using?"
                options={devices}
                required
                onChange={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.device}
                errorFields={errorFields}
                disableClearable
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
            <DRTextarea
                fieldName="additionalDescription"
                label="Additional Description"
                helperText="Add a description to help us understand"
                onChange={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.additionalDescription || ""}
                errorFields={errorFields}
            />
        </ReportForm>
    )
}

export default WebSiteBugForm   