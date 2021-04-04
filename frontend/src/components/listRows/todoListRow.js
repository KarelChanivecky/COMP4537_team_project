import React from 'react';
import {Divider, ListItem, ListItemSecondaryAction, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {editList} from "../../lib/dataSource";
import {TodoList} from "../../lib/models.mjs";
import TextModal from "../modals/textModal";
import EditIcon from "@material-ui/icons/Edit";

/**
 * Models a row for a todo list
 * @param {TodoList} props.list
 * @param {function} props.refresh
 * @return {JSX.Element}
 * @constructor
 */
function TodoListRow(props) {
    const {list, refresh, ...other} = props;

    const listItemsPath = `/lists/${list.id}/items`;

    const changeList = (description) => {
        editList(new TodoList(description, list.id))
            .then(_ => refresh())
    }

    return (
        <>
            <ListItem component={Link} to={listItemsPath} {...other} key={list.id}>
                <Typography variant="body1">{list.description}</Typography>
                <ListItemSecondaryAction>
                    <TextModal actionName="Edit" Icon={EditIcon} submit={changeList} item={list}/>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider/>
        </>
    );
}

export default TodoListRow;