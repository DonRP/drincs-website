import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import axios from 'axios';
import DRAutocomplete from "components/DRAutocomplete";
import DRDialog from "components/DRDialog";
import DRTextField from "components/DRTextField";
import { useState } from "react";

// https://www.geeksforgeeks.org/file-uploading-in-react-js/
function Report() {
    const [openBugDialog, setOpenBugDialog] = useState(false);
    const [openRequestDialog, setOpenRequestDialog] = useState(false);
    const [bugItemToEdit, setBugItemToEdit] = useState();
    const deviceOptions = ['Option 1', 'Option 2'];
    const projectOptions = ['Option 1', 'Option 2'];

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
        if (id === "bug") {
            setOpenBugDialog(true);
        }
        else if (id === "request") {
            setOpenRequestDialog(true);
        }
    };

    const handleClose = () => {
        setOpenBugDialog(false);
        setOpenRequestDialog(false);
    };


    const state = {
        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)
    const onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button)
    const onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
    };

    // File content to be displayed after
    // file upload is complete
    const fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {this.state.selectedFile.name}</p>


                    <p>File Type: {this.state.selectedFile.type}</p>


                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
            >
                <h1>Report</h1>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleClickOpen("bug")
                        }}
                    >
                        🐞Bug report: Create a report to help us improve
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleClickOpen("request")
                        }}
                    >
                        Feature request: Suggest an idea for this project
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => {
                            window.open("https://github.com/DonRP/ABFD/issues/new/choose")
                        }}
                    >
                        Quest: Suggest an Quest/mission (requires a GitHub account)
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
                        <Button onClick={handleClose}>Send</Button>
                    </>
                }
            >
                <DialogContentText>
                    If you want you can use GitHub (here you can upload multiple files)
                </DialogContentText>
                <DRAutocomplete
                    id="project"
                    label="Project"
                    defaultValue={bugItemToEdit?.project || projectOptions[0]}
                    onChange={(event, newVal) => handleInputChangeGeneric(event, newVal, bugItemToEdit, setBugItemToEdit, "project")}
                    options={projectOptions}
                />
                <DRTextField
                    id="nickname"
                    label="Your nickname"
                    onChange={(event, newVal) => handleInputChangeGeneric(event, newVal, bugItemToEdit, setBugItemToEdit)}
                    defaultValue={bugItemToEdit?.nickname || ""}
                />
                <DRTextField
                    id="title"
                    label="Issues title*"
                    onChange={(event, newVal) => handleInputChangeGeneric(event, newVal, bugItemToEdit, setBugItemToEdit)}
                    defaultValue={bugItemToEdit?.title || ""}
                />
                <DRTextField
                    id="description"
                    label="Describe the bug*"
                    aria-label="A clear and concise description of what the bug is."
                    onChange={(event, newVal) => handleInputChangeGeneric(event, newVal, bugItemToEdit, setBugItemToEdit)}
                    defaultValue={bugItemToEdit?.description || ""}
                    rows={3}
                />
                <DRTextField
                    id="expectedBehavior"
                    label="Expected behavior"
                    aria-label="A clear and concise description of what you expected to happen."
                    onChange={(event, newVal) => handleInputChangeGeneric(event, newVal, bugItemToEdit, setBugItemToEdit)}
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
                <div>
                    Screenshots: <input type="file" multiple accept="image/*,audio/*,video/*" onChange={onFileChange} />
                </div>
                <div>
                    Save file: <input type="file" accept=".save" onChange={onFileChange} />
                </div>
                <DRTextField
                    id="additional"
                    label="Additional context"
                    aria-label="Add any other context about the problem here."
                    onChange={(event, newVal) => handleInputChangeGeneric(event, newVal, bugItemToEdit, setBugItemToEdit)}
                    defaultValue={bugItemToEdit?.additional || ""}
                    rows={3}
                />
            </DRDialog>
            {/* Request Dialog */}
            <Dialog open={openRequestDialog} onClose={handleClose}>
                <DialogTitle>Feature request</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Report;
