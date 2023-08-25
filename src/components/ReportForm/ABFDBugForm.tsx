import DRDialog from 'components/DRDialog';
import { useState } from 'react';

function ABFDBugForm() {
    const [itemToEdit, setItemToEdit] = useState({})


    return (
        <DRDialog
            open={true}
            title={"Bug report"}
            maxWidth={"md"}
            actions={
                <>
                    {/* <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSend}>Send</Button> */}
                </>
            }
        >

        </DRDialog>
    )
}

export default ABFDBugForm   