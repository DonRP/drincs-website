import { Grid } from '@mui/joy';
import { myUseTheme } from 'Theme';
import DRAlert from 'components/DRAlert';
import ReportGrid, { IReportGridRow } from 'components/Grid/ReportGrid';
import DiscordIcon from 'components/Icon/DiscordIcon';
import { discordLink } from 'constant';
import { analyticPageView } from 'utility/Analytics';

const rowsABFD: IReportGridRow[] = [
    {
        info: {
            title: "Bug report",
            description: "Create a report to help us improve",
        },
        link: {
        }
    },
    {
        info: {
            title: "Feature request",
            description: "Suggest an idea for this project",
        },
        link: {
        }
    },
    {
        info: {
            title: "Writing or Translation",
            description: "For issues relating to the Writing or Translation",
        },
        link: {
        }
    },
    {
        info: {
            title: "New Quest-Mission",
            description: "New Quest-Mission",
        },
        link: {
        }
    },
];

const rowsWebService: IReportGridRow[] = [
    {
        info: {
            title: "Bug report",
            description: "Create a report to help us improve",
        },
        link: {
        }
    },
    {
        info: {
            title: "Feature request",
            description: "Suggest an idea for this project",
        },
        link: {
        }
    },
];

const rowsDiscord: IReportGridRow[] = [
    {
        info: {
            title: "Bug report",
            description: "Create a report to help us improve",
        },
        link: {
        }
    },
    {
        info: {
            title: "Feature request",
            description: "Suggest an idea for this project",
        },
        link: {
        }
    },
];

function Report() {
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
                <h2>Report</h2>
                <DRAlert
                    startDecorator={< DiscordIcon fill={theme.palette.logo.dicord} />}
                >
                    Before opening an <i>issue</i> it is recommended to talk about the <i>issue</i> first on <a href={discordLink + "/drincs-website/issues/38"}>Discord</a>
                </DRAlert>
                <ReportGrid
                    title="A Big Family in Debit"
                    data={rowsABFD}
                    height={358}
                    githubLink='https://github.com/DRincs-Productions/ABFD/issues/new/choose'
                />
                <ReportGrid
                    title="Web Service"
                    data={rowsWebService}
                    height={208}
                    githubLink='https://github.com/DRincs-Productions/drincs-website/issues/new/choose'
                />
                <ReportGrid
                    title="Discord"
                    data={rowsDiscord}
                    height={208}
                    githubLink='https://github.com/DRincs-Productions/drincs-discord-bot/issues/new/choose'
                />
            </Grid>
            {/* <ABFDBugForm /> */}
        </>
    );
}

export default Report;
