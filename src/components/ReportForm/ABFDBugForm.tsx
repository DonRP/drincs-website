import DRAutocomplete from 'components/DRAutocomplete';
import DRTextField from 'components/DRTextField';
import DRTextarea from 'components/DRTextarea';
import { DeviceABFD, VersionABFD } from 'constant';
import { ProjectsEnum } from 'enum/ProjectsEnum';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';
import { getEnumLookup } from 'utility/UtilityEnum';
import { isEmptyOrSpaces } from 'utility/UtilityFunctionts';
import ReportForm, { ReportBody } from './ReportForm';

type IProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

class BugType {
    constructor(defDevice: string, defVersion: string) {
        this.device = defDevice
        this.version = defVersion
    }
    title: string = ""
    description: string = ""
    additionalDescription: string = ""
    nickname: string = ""
    device: string
    version: string
}

function ABFDBugForm(props: IProps) {
    const {
        open,
        setOpen,
    } = props;
    const [errorFields, setErrorFields] = useState<string[]>([])
    const versions = getEnumLookup<string>(VersionABFD)
    const devices = getEnumLookup<string>(DeviceABFD)
    const [data, setData] = useState<BugType>(new BugType(devices[0].oid, versions[0].oid))
    const { t } = useTranslation(["translation"]);

    function getData() {
        let error: string[] = []
        if (isEmptyOrSpaces(data.description)) {
            error.push("description")
        }
        if (isEmptyOrSpaces(data.title)) {
            error.push("title")
        }
        setErrorFields(error)
        if (error.length > 0) {
            return
        }
        setErrorFields([])
        let res: ReportBody = {
            repo: ProjectsEnum.ABFD,
            title: "[Report] " + data.title,
            body: `### What happened?

${data.description}

### Device

${data.device}

### Version

${data.version}

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
            setOpen={setOpen}
            head={t("bug_report")}
            data={data}
            maxWidth={"md"}
            getData={getData}
            clearData={() => setData(new BugType(devices[0].oid, versions[0].oid))}
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
                options={devices}
                required
                onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value?.oid, data, setData)}
                defaultValue={data?.device}
                errorFields={errorFields}
                disableClearable
            />
            <DRAutocomplete
                fieldName="version"
                label="Version"
                helperText="What version of our software are you running?"
                options={versions}
                required
                onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value?.oid, data, setData)}
                defaultValue={data?.version}
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

export default ABFDBugForm   