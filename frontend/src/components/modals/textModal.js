import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import {handleStringChange} from "../../lib/commonHandlers";


/**
 *
 * @param {TodoList | TodoListItem | undefined} props.item
 * @param {function(string)} props.submit
 * @param {string} props.actionName
 * @param {JSX.Element} props.Icon
 * @return {JSX.Element}
 * @constructor
 */
function TextModal(props) {

    const {item, submit, Icon, actionName} = props;

    const [description, setDescription] = useState(item? item.description : "");

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onConfirm = () => {
        handleClose()
        submit(description);
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <Icon/>
            </IconButton>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{actionName}{item ? `: ${item.description}`: ""}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New description"
                        value={description}
                        onChange={handleStringChange(setDescription)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TextModal;