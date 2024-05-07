import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectsEnum } from '../../enum/ProjectsEnum';
import { handleInputChangeByFieldName } from '../../utility/UtilityComponenets';
import { getEnumLookup } from '../../utility/UtilityEnum';
import { isEmptyOrSpaces } from '../../utility/UtilityFunctionts';
import { Browser, DeviceABFD } from '../../values/constant';
import DRAutocomplete from '../DRAutocomplete';
import DRTextarea from '../DRTextarea';
import DRTextField from '../DRTextField';
import ReportForm, { ReportBody } from './ReportForm';

type IProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
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
    const {
        open,
        setOpen,
    } = props;
    const [errorFields, setErrorFields] = useState<string[]>([])
    const browsers = getEnumLookup<string>(Browser)
    const devices = getEnumLookup<string>(DeviceABFD)
    const [data, setData] = useState<BugType>(new BugType(devices[0].oid, browsers[0].oid))
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
            setOpen={setOpen}
            head={t("bug_reports")}
            data={data}
            maxWidth={"md"}
            getData={getData}
            clearData={() => setData(new BugType(devices[0].oid, browsers[0].oid))}
        >
            <DRTextField
                fieldName="title"
                label={t("title")}
                required
                onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.title || ""}
                errorFields={errorFields}
            />
            <DRTextarea
                fieldName="description"
                label={t("what_happened")}
                helperText={t("what_happened_helper")}
                placeholder={t("what_happened_placeholder")}
                required
                onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.description || ""}
                errorFields={errorFields}
            />
            <DRAutocomplete
                fieldName="browser"
                label={t("browser")}
                helperText={t("browser_helper")}
                options={browsers}
                required
                onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value?.oid, data, setData)}
                defaultValue={data?.browser}
                errorFields={errorFields}
                disableClearable
            />
            <DRAutocomplete
                fieldName="device"
                label={t("device")}
                helperText={t("device_helper")}
                options={devices}
                required
                onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value?.oid, data, setData)}
                defaultValue={data?.device}
                errorFields={errorFields}
                disableClearable
            />
            <DRTextarea
                fieldName="nickname"
                label={t("your_nickname")}
                helperText={t("nickname_helper")}
                placeholder={t("nickname_placeholder")}
                onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.nickname || ""}
                errorFields={errorFields}
            />
            <DRTextarea
                fieldName="additionalDescription"
                label={t("additional_description")}
                helperText={t("additional_description_helper")}
                onChangeGeneric={(fieldName, value) => handleInputChangeByFieldName(fieldName, value, data, setData)}
                defaultValue={data?.additionalDescription || ""}
                errorFields={errorFields}
            />
        </ReportForm>
    )
}

export default WebSiteBugForm   