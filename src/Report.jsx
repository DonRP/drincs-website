import BugReportIcon from '@mui/icons-material/BugReport';
import GitHubIcon from '@mui/icons-material/GitHub';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { Button, CircularProgress, DialogContentText, Grid } from "@mui/material";
import { Box } from "@mui/system";
import DRAutocomplete from "components/DRAutocomplete";
import DRDialog from "components/DRDialog";
import DRTextField from "components/DRTextField";
import { useState } from "react";
import GitService from "services/GitHubService";

// https://www.geeksforgeeks.org/file-uploading-in-react-js/
function Report() {
    const [openBugDialog, setOpenBugDialog] = useState(false)
    const [openRequestDialog, setOpenRequestDialog] = useState(false)
    const [openProgressBarDialog, setOpenProgressBarDialog] = useState(false)
    const [openErrorDialog, setOpenErrorDialog] = useState(false)
    const [itemToEdit, setItemToEdit] = useState({})
    const [bugItemToEdit, setBugItemToEdit] = useState({})
    const [reuestItemToEdit, setRequestItemToEdit] = useState({})
    const deviceOptions = ['All Device', 'Windows', 'Linux', 'MacOS', 'Android', 'IOS']
    const projectOptions = ['A Big Family in Debit', 'Web Site']
    const [errorFields, setErrorFields] = useState([])

    function handleInputChangeGeneric(event, newVal, itemToEdit, setItemToEdit, id) {
        const target = event.target;
        var value = target.value;

        if (newVal) {
            value = newVal;
        }
        var idModel = id ? id : event.currentTarget.id

        setItemToEdit({
            ...itemToEdit,
            [idModel]: value
        })
    }

    const handleClickOpen = (id) => {
        setBugItemToEdit({})
        setBugItemToEdit({})
        if (id === "bug") {
            setItemToEdit({
                ...itemToEdit,
                sendType: id
            })
            setOpenBugDialog(true);
        }
        else if (id === "request") {
            setItemToEdit({
                ...itemToEdit,
                sendType: id
            })
            setOpenRequestDialog(true);
        }
    };

    const handleClose = () => {
        setOpenBugDialog(false);
        setOpenRequestDialog(false);
        setOpenProgressBarDialog(false);
        setOpenErrorDialog(false);
    };
    const handleSend = () => {
        var repo = ""
        var title = ""
        var body = ""
        var labels = []
        setErrorFields([])
        if (itemToEdit.project === projectOptions[1]) {
            repo = "DonRP/drincs-website"
        }
        else //(itemToEdit.project === projectOptions[0]) 
        {
            repo = "DonRP/ABFD"
        }
        var er = []
        if (itemToEdit?.sendType === "bug") {
            if (!bugItemToEdit.title || bugItemToEdit.title === "") {
                er.push("title")
            }
            if (!bugItemToEdit.description || bugItemToEdit.description === "") {
                er.push("description")
            }
            setErrorFields(er)
            if (er.length > 0) {
                return
            }

            title = "[Report] " + bugItemToEdit?.title
            body = "**Describe the bug**   \n" + bugItemToEdit?.description +
                "   \n\n**Expected behavior**   \n" + bugItemToEdit?.expectedBehavior +
                "   \n\n**Screenshots**   \n" +
                "   \n\n**Device (please complete the following information):**   \n- OS: " + bugItemToEdit?.device +
                "   \n\n**Additional context**   \n" + bugItemToEdit?.additional +
                "   \n\n**Written by**   \n" + bugItemToEdit?.nickname
            labels = ["bug"]
        }
        else if (itemToEdit?.sendType === "request") {
            if (!reuestItemToEdit.title || reuestItemToEdit.title === "") {
                er.push("title")
            }
            if (!reuestItemToEdit.description || reuestItemToEdit.description === "") {
                er.push("description")
            }
            setErrorFields(er)
            if (er.length > 0) {
                return
            }

            title = "[Request] " + reuestItemToEdit?.title
            body = "**Is your feature request related to a problem? Please describe.**   \n" + reuestItemToEdit?.description +
                "   \n\n**Describe the solution you'd like**   \n" + reuestItemToEdit?.posibleSolution +
                "   \n\n**Describe alternatives you've considered**   \n" + reuestItemToEdit?.alternatives +
                "   \n\n**Device (please complete the following information):**   \n- OS: " + reuestItemToEdit?.device +
                "   \n\n**Additional context**   \n" + reuestItemToEdit?.additional +
                "   \n\n**Written by**   \n" + reuestItemToEdit?.nickname
            labels = ["enhancement"]
        }

        setOpenBugDialog(false);
        setOpenRequestDialog(false);
        setOpenErrorDialog(false);
        setOpenProgressBarDialog(true);

        const abortController = new AbortController();
        const githubService = new GitService();
        githubService.createIssue(repo, title, body, labels, abortController).then(res => {
            if (abortController.signal.aborted) {
                return;
            }
            setOpenProgressBarDialog(false);
        }).catch(err => {
            console.log(err)
            setOpenProgressBarDialog(false);
            setOpenErrorDialog(true);
        })

        return function cleanUp() {
            abortController.abort();
        }
    }

    // // On file select (from the pop up)
    // const onFileChange = (event, itemToEdit, setItemToEdit, id) => {
    //     // Update the state
    //     if (id === "savefile") {
    //         setItemToEdit({
    //             ...itemToEdit,
    //             [id]: event.target.files[0]
    //         })
    //     }
    //     else if (id === "screenshots") {
    //         setItemToEdit({
    //             ...itemToEdit,
    //             [id]: event.target.files[0]
    //         })
    //     }
    // }

    // // On file upload (click the upload button)
    // const onFileUpload = () => {

    //     // Create an object of formData
    //     const formData = new FormData();

    //     // Update the formData object
    //     formData.append(
    //         "myFile",
    //         this.state.selectedFile,
    //         this.state.selectedFile.name
    //     );

    //     // Details of the uploaded file
    //     console.log(this.state.selectedFile);

    //     // Request made to the backend api
    //     // Send formData object
    //     axios.post("api/uploadfile", formData);
    // }

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
                pt={3}
            >
                <h2>Report</h2>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleClickOpen("bug")
                        }}
                        startIcon={<BugReportIcon />}
                    >
                        <strong>
                            Bug report: Create a report to help us improve
                        </strong>
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleClickOpen("request")
                        }}
                        startIcon={<HistoryEduIcon />}
                    >
                        <strong>
                            Feature request: Suggest an idea for this project
                        </strong>
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => {
                            window.open("https://github.com/DonRP/ABFD/issues/new/choose")
                        }}
                        startIcon={<GitHubIcon />}
                    >
                        <strong>
                            Quest: Suggest an Quest/mission (requires a GitHub account)
                        </strong>
                    </Button>
                </Grid>
            </Grid>
            {/* Bug Dialog */}
            <DRDialog
                open={openBugDialog}
                title="Bug report"
                maxWidth={200}
                actions={
                    <>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSend}>Send</Button>
                    </>
                }
            >
                <DialogContentText>
                    {/* If you want you can use <a href="https://github.com/DonRP/ABFD/issues/new/choose">GitHub</a> (here you can upload multiple files) */}
                    For now you can't upload files (images or saves etc...), if you want to do it you can share them through WeTransfer (or similar) and put the link in Additional context, or you can use <a href="https://github.com/DonRP/ABFD/issues/new/choose">GitHub</a>.
                </DialogContentText>
                <DRAutocomplete
                    id="project"
                    label="Project"
                    defaultValue={itemToEdit?.project || projectOptions[0]}
                    onChange={(event, newVal) => handleInputChangeGeneric(event, newVal, itemToEdit, setItemToEdit, "project")}
                    options={projectOptions}
                />
                <DRTextField
                    id="nickname"
                    label="Your nickname"
                    onChangeValue={(event, newVal) => handleInputChangeGeneric(event, newVal, bugItemToEdit, setBugItemToEdit)}
                    defaultValue={bugItemToEdit?.nickname || ""}
                />
                <DRTextField
                    id="title"
                    label="Issues title*"
                    onChangeValue={(event, newVal) => handleInputChangeGeneric(event, newVal, bugItemToEdit, setBugItemToEdit)}
                    defaultValue={bugItemToEdit?.title || ""}
                    error={errorFields.includes("title")}
                />
                <DRTextField
                    id="description"
                    label="Describe the bug*"
                    aria-label="A clear and concise description of what the bug is."
                    onChangeValue={(event, newVal) => handleInputChangeGeneric(event, newVal, bugItemToEdit, setBugItemToEdit)}
                    defaultValue={bugItemToEdit?.description || ""}
                    rows={3}
                    error={errorFields.includes("description")}
                />
                <DRTextField
                    id="expectedBehavior"
                    label="Expected behavior"
                    aria-label="A clear and concise description of what you expected to happen."
                    onChangeValue={(event, newVal) => handleInputChangeGeneric(event, newVal, bugItemToEdit, setBugItemToEdit)}
                    defaultValue={bugItemToEdit?.expectedBehavior || ""}
                    rows={3}
                />
                <DRAutocomplete
                    id="device"
                    label="Device"
                    defaultValue={bugItemToEdit?.device || deviceOptions[0]}
                    onChange={(event, newVal) => handleInputChangeGeneric(event, newVal, bugItemToEdit, setBugItemToEdit, "device")}
                    options={deviceOptions}
                />
                {/* <div>
                    Screenshot: <input
                        type="file"
                        // multiple
                        accept="image/*,audio/*,video/*"
                        onChange={(event) => onFileChange(event, bugItemToEdit, setBugItemToEdit, "screenshots")}
                    />
                </div> */}
                {/* <div>
                    Save file: <input
                        type="file"
                        accept=".save"
                        onChange={(event) => onFileChange(event, bugItemToEdit, setBugItemToEdit, "savefile")}
                    />
                </div> */}
                <DRTextField
                    id="additional"
                    label="Additional context"
                    aria-label="Add any other context about the problem here."
                    onChangeValue={(event, newVal) => handleInputChangeGeneric(event, newVal, bugItemToEdit, setBugItemToEdit)}
                    defaultValue={bugItemToEdit?.additional || ""}
                    rows={3}
                />
            </DRDialog>
            {/* Request Dialog */}
            <DRDialog
                open={openRequestDialog}
                title="Request Dialog"
                maxWidth={200}
                actions={
                    <>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSend}>Send</Button>
                    </>
                }
            >
                <DialogContentText>
                    For now you can't upload files (images or saves etc...), if you want to do it you can share them through WeTransfer (or similar) and put the link in Additional context, or you can use <a href="https://github.com/DonRP/ABFD/issues/new/choose">GitHub</a>.
                </DialogContentText>
                <DRAutocomplete
                    id="project"
                    label="Project"
                    defaultValue={itemToEdit?.project || projectOptions[0]}
                    onChange={(event, newVal) => handleInputChangeGeneric(event, newVal, itemToEdit, setItemToEdit, "project")}
                    options={projectOptions}
                />
                <DRTextField
                    id="nickname"
                    label="Your nickname"
                    onChangeValue={(event, newVal) => handleInputChangeGeneric(event, newVal, reuestItemToEdit, setRequestItemToEdit)}
                    defaultValue={reuestItemToEdit?.nickname || ""}
                />
                <DRTextField
                    id="title"
                    label="Issues title*"
                    onChangeValue={(event, newVal) => handleInputChangeGeneric(event, newVal, reuestItemToEdit, setRequestItemToEdit)}
                    defaultValue={reuestItemToEdit?.title || ""}
                    error={errorFields.includes("title")}
                />
                <DRTextField
                    id="description"
                    label="Is your feature request related to a problem? Please describe.*"
                    aria-label="A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]"
                    onChangeValue={(event, newVal) => handleInputChangeGeneric(event, newVal, reuestItemToEdit, setRequestItemToEdit)}
                    defaultValue={reuestItemToEdit?.description || ""}
                    rows={3}
                    error={errorFields.includes("description")}
                />
                <DRTextField
                    id="posibleSolution"
                    label="Describe the solution you'd like"
                    aria-label="A clear and concise description of what you want to happen."
                    onChangeValue={(event, newVal) => handleInputChangeGeneric(event, newVal, reuestItemToEdit, setRequestItemToEdit)}
                    defaultValue={reuestItemToEdit?.posibleSolution || ""}
                    rows={3}
                />
                <DRTextField
                    id="alternatives"
                    label="Describe alternatives you've considered"
                    aria-label="A clear and concise description of any alternative solutions or features you've considered."
                    onChangeValue={(event, newVal) => handleInputChangeGeneric(event, newVal, reuestItemToEdit, setRequestItemToEdit)}
                    defaultValue={reuestItemToEdit?.alternatives || ""}
                    rows={3}
                />
                <DRAutocomplete
                    id="device"
                    label="Device"
                    defaultValue={reuestItemToEdit?.device || deviceOptions[0]}
                    onChange={(event, newVal) => handleInputChangeGeneric(event, newVal, reuestItemToEdit, setRequestItemToEdit, "device")}
                    options={deviceOptions}
                />
                <div>
                    {/* Screenshot: <input
                        type="file"
                        // multiple
                        accept="image/*,audio/*,video/*"
                        onChange={(event) => onFileChange(event, reuestItemToEdit, setRequestItemToEdit, "screenshots")}
                    /> */}
                </div>
                <DRTextField
                    id="additional"
                    label="Additional context"
                    aria-label="Add any other context about the problem here."
                    onChangeValue={(event, newVal) => handleInputChangeGeneric(event, newVal, reuestItemToEdit, setRequestItemToEdit)}
                    defaultValue={reuestItemToEdit?.additional || ""}
                    rows={3}
                />
            </DRDialog>
            {/* Progress Bar */}
            <DRDialog
                open={openProgressBarDialog}
                title="Progress Bar"
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    <DialogContentText>
                        Uploading...
                    </DialogContentText>
                </Grid>
            </DRDialog>
            {/* Error */}
            <DRDialog
                open={openErrorDialog}
                title="Error"
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    actions={
                        <>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSend}>Try again</Button>
                        </>
                    }
                >
                    <DialogContentText>
                        Something went wrong try again, if the error persists contact the developer on <a href="https://discord.gg/HFfeJKR">Discord</a>.
                    </DialogContentText>
                </Grid>
            </DRDialog>
        </>
    )
}

export default Report;
