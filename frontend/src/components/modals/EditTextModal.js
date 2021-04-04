import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";


/**
 *
 * @param {TodoList | TodoListItem} props.item
 * @param {Function} props.submitEdit
 * @return {JSX.Element}
 * @constructor
 */
function EditTextModal(props) {

    const {item, submitEdit} = props;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onConfirm = () => {
        handleClose()
        submitEdit();
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <EditIcon/>
            </IconButton>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                {/*TODO*/}
                <DialogTitle id="form-dialog-title">Edit: {item.description}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New description"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditTextModal;