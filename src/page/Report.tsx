import { Grid } from '@mui/joy';
import { myUseTheme } from 'Theme';
import DRAlert from 'components/DRAlert';
import ReportGrid, { IReportGridRow } from 'components/Grid/ReportGrid';
import DiscordIcon from 'components/Icon/DiscordIcon';
import ABFDBugForm from 'components/ReportForm/ABFDBugForm';
import DiscordBugForm from 'components/ReportForm/DiscordBugForm';
import WebSiteBugForm from 'components/ReportForm/WebSiteBugForm';
import { ABFDrepo, WebSiteRepo, discordLink } from 'constant';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { analyticPageView } from 'utility/Analytics';
function Report() {
    const [openABFDBug, setOpenABFDBug] = useState(false)
    const [openWebSiteBug, setOpenWebSiteBug] = useState(false)
    const [openDiscordBug, setDiscordBug] = useState(false)
    const { t } = useTranslation(["translation"]);

    const rowsABFD: IReportGridRow[] = [
        {
            info: {
                title: t("bug_reports"),
                description: t("bug_report_info"),
            },
            link: {
                website: () => { setOpenABFDBug(true) },
            }
        },
        {
            info: {
                title: t("feature_request"),
                description: t("feature_request_info"),
            },
            link: {
            }
        },
        {
            info: {
                title: t("writing_or_translation"),
                description: t("writing_or_translation_info"),
            },
            link: {
            }
        },
        {
            info: {
                title: t("new_game_quest"),
                description: t("new_game_quest_info"),
            },
            link: {
            }
        },
    ];

    const rowsWebService: IReportGridRow[] = [
        {
            info: {
                title: t("bug_reports"),
                description: t("bug_report_info"),
            },
            link: {
                website: () => { setOpenWebSiteBug(true) },
            }
        },
        {
            info: {
                title: t("feature_request"),
                description: t("feature_request_info"),
            },
            link: {
            }
        },
    ];

    const rowsDiscord: IReportGridRow[] = [
        {
            info: {
                title: t("bug_reports"),
                description: t("bug_report_info"),
            },
            link: {
                website: () => { setDiscordBug(true) },
            }
        },
        {
            info: {
                title: t("feature_request"),
                description: t("feature_request_info"),
            },
            link: {
            }
        },
    ];

    const theme = myUseTheme()
    analyticPageView("Report")

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                paddingTop={3}
                paddingBottom={3}
            >
                <h2>{t("reports")}</h2>
                <DRAlert
                    startDecorator={< DiscordIcon fill={theme.palette.logo.dicord} />}
                >
                    {t("before_opening_issue_info") + " "}<a href={discordLink}>Discord</a>
                </DRAlert>
                <ReportGrid
                    title="A Big Family in Debit"
                    rows={rowsABFD}
                    height={302}
                    githubLink={`https://github.com/${ABFDrepo}/issues/new/choose`}
                />
                <ReportGrid
                    title="Web Service"
                    rows={rowsWebService}
                    height={152}
                    githubLink={`https://github.com/${WebSiteRepo}/issues/new/choose`}
                />
                <ReportGrid
                    title="Discord"
                    rows={rowsDiscord}
                    height={152}
                    githubLink='https://github.com/DRincs-Productions/drincs-discord-bot/issues/new/choose'
                />
            </Grid>
            <ABFDBugForm
                open={openABFDBug}
                setOpen={setOpenABFDBug}
            />
            <WebSiteBugForm
                open={openWebSiteBug}
                setOpen={setOpenWebSiteBug}
            />
            <DiscordBugForm
                open={openDiscordBug}
                setOpen={setDiscordBug}
            />
        </>
    );
}

export default Report;
