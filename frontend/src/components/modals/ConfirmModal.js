import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from "@material-ui/core";

/**
 *
 * @param {JSX.Element} props.Icon
 * @param {function} props.submit
 * @param {string} props.actionName
 * @return {JSX.Element}
 * @constructor
 */
function ConfirmModal(props) {
    const {Icon, submit, actionName} = props;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        handleClose();
        submit();
    };
    return (
        <div>
            <IconButton size="medium" onClick={handleClickOpen}>
                <Icon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{actionName}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConfirmModal;