import DRTextField from 'components/DRTextField';
import DRTextarea from 'components/DRTextarea';
import { ProjectsEnum } from 'enum/ProjectsEnum';
import { useState } from 'react';
import { handleInputChangeByFieldName } from 'utility/UtilityComponenets';
import { isNullOrEmpty } from 'utility/UtilityFunctionts';
import ReportForm, { ReportBody } from './ReportForm';

type IProps = {
    open: boolean;
    onClose: () => void;
}

class BugType {
    title: string = ""
    description: string = ""
    additionalDescription: string = ""
    nickname: string = ""
}

function DiscordBugForm(props: IProps) {
    const { open, onClose } = props;
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [data, setData] = useState<BugType>(new BugType())

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
            repo: ProjectsEnum.DiscordBot,
            title: "[Report WebSite]" + data.title,
            body: `### What happened?

            ${data.description}
            
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
            clearData={() => setData(new BugType())}
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

export default DiscordBugForm   