import ImageIcon from '@mui/icons-material/Image';
import DRAlert from 'components/DRAlert';
import { DRButtonNoMargin } from 'components/DRButton';
import DRDialog, { IDRDialogProps } from 'components/DRDialog';
import { ProjectsEnum } from 'enum/ProjectsEnum';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GitService from 'services/GitHubService';
import { logError } from 'utility/Logger';
import { showToast, showToastByMyError } from 'utility/ShowToast';

interface ReportFormProps<T> extends IDRDialogProps {
    data: T,
    getData: () => ReportBody | undefined,
    clearData: () => void,
}

export interface ReportBody {
    repo: ProjectsEnum,
    title: string,
    body: string,
    labels: string[],
}

const githubService = new GitService()

function ReportForm<T>(props: ReportFormProps<T>) {
    const {
        children,
        setOpen,
        getData,
        clearData,
        ...rest
    } = props;
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation(["translation"]);

    const handleSend = () => {
        setLoading(true)
        let data = getData()
        if (!data) {
            setLoading(false)
            return
        }
        githubService.createIssue(data.repo, data.title, data.body, data.labels).then(res => {
            setLoading(false);
            setOpen(false)
            clearData()
            showToast(t("success_create_issue"), 'success', enqueueSnackbar)
        }).catch(err => {
            logError("send Report", err)
            showToastByMyError(err, enqueueSnackbar, t)
            setLoading(false);
        })
    }

    return (
        <DRDialog
            {...rest}
            title={t("bug_report")}
            maxWidth={"md"}
            setOpen={setOpen}
            actions={
                <>
                    <DRButtonNoMargin
                        label={t("cancel")}
                        onClick={() => setOpen(false)}
                        disabled={loading}
                    />
                    <DRButtonNoMargin
                        label={t("send")}
                        onClick={handleSend}
                        loading={loading}
                    />
                </>
            }
        >
            {children}
            <DRAlert
                startDecorator={< ImageIcon />}
            >
                {t("for_add_image_into_bug_report")}
            </DRAlert>

        </DRDialog>
    )
}

export default ReportForm   