import React from 'react';
import {Grid, ListItem, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

/**
 * Models a row for a todo list
 * @param {TodoList} props.list
 * @return {JSX.Element}
 * @constructor
 */
function TodoListRow(props) {
    const {list, ...other} = props;
    const listItemsPath = `/lists/${list.id}/items`;
    return (
        <ListItem component={Link} to={listItemsPath} {...other}>
            <Typography variant="body1">{list.description}</Typography>
        </ListItem>

    );
}

export default TodoListRow;