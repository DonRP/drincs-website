import { Grid } from '@mui/joy';
import ReportGrid, { IReportGridRow } from 'components/Grid/ReportGrid';
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
    analyticPageView("Download")

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
                    data={rowsWebService}
                    height={208}
                    githubLink='https://github.com/DRincs-Productions/drincs-discord-bot/issues/new/choose'
                />
            </Grid>
        </>
    );
}

export default Report;
