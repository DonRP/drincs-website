import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import UndoIcon from '@mui/icons-material/Undo';
import { Theme, useMediaQuery } from '@mui/material';
import DRAlert from 'components/DRAlert';
import DRButton from 'components/DRButton';
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
        layout,
        clearData,
        ...rest
    } = props;
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation(["translation"]);
    const smScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

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
            head={t("bug_reports")}
            maxWidth={"md"}
            setOpen={setOpen}
            layout={smScreen ? "fullscreen" : layout}
            minWidth={800}
            actions={
                <>
                    <DRButton
                        onClick={handleSend}
                        loading={loading}
                        endDecorator={<SendIcon />}
                    >
                        {t("send")}
                    </DRButton>
                    <DRButton
                        onClick={() => setOpen(false)}
                        disabled={loading}
                        variant="outlined"
                        color="neutral"
                        startDecorator={<UndoIcon />}
                    >
                        {t("cancel")}
                    </DRButton>
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