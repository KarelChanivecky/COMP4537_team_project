import React from 'react';
import {ButtonGroup, Grid, IconButton, ListItem, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import EditTextModal from "../modals/EditTextModal";

/**
 * Models a row for list of todo lists
 * @param {TodoListItem}props.listItem
 * @return {JSX.Element}
 * @constructor
 */
function TodoListRow(props) {
    const {listItem, ...other} = props;
    return (
        <ListItem {...other}>
            <Grid container direction="row" justify="space-between">
                <Typography variant="body1">{listItem.description}</Typography>
                <EditTextModal/>
            </Grid>
        </ListItem>

    );
}

export default TodoListRow;