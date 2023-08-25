import { Grid } from '@mui/joy';
import ReportGrid, { IReportGridRow } from 'components/Grid/ReportGrid';
import { analyticPageView } from 'utility/Analytics';

const rowsABFD: IReportGridRow[] = [
    {
        id: 0,
        info: {
            title: "Bug report",
            description: "Create a report to help us improve",
        },
        link: {
            website: "https://mega.nz/file/b1tQnKjT#Q0WG8su9jv994F2Hn7u31_I9HkBpDP5afUCsa6lBCfk"
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
                    height={411}
                />
                <ReportGrid
                    title="Web Service"
                    data={rowsABFD}
                    height={411}
                />
            </Grid>
        </>
    );
}

export default Report;
