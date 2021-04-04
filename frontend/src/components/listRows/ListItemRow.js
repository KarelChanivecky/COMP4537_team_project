import React from 'react';
import {ButtonGroup, Grid, ListItem, ListItemSecondaryAction, Typography} from "@material-ui/core";
import { useParams} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import TextModal from "../modals/textModal";
import {deleteListItem, editListItem} from "../../lib/dataSource";
import {TodoList, TodoListItem} from "../../lib/models.mjs";
import ConfirmModal from "../modals/ConfirmModal";
import {Delete} from "@material-ui/icons";

/**
 * Models a row for list of todo lists
 * @param {TodoListItem}props.listItem
 * @param {function} props.refresh
 * @return {JSX.Element}
 * @constructor
 */
function TodoListItemRow(props) {
    const {listItem, refresh, ...other} = props;

    const {listId} = useParams();
    const metaList = new TodoList("", parseInt(listId))

    const editItem = (newDescription) => {
        editListItem(metaList, new TodoListItem(newDescription, listItem.id))
            .then(_ => refresh())
            .catch(err => window.alert(err));
    }

    const deleteItem = () => {
        deleteListItem(metaList, listItem)
            .then(_ => refresh())
            .catch(err => window.alert(err));
    }

    return (
        <ListItem key={listItem.id} {...other}>
            <Grid container direction="row" justify="space-between">
                <Typography variant="body1">{listItem.description}</Typography>
                <ListItemSecondaryAction>
                    <ButtonGroup>
                        <TextModal item={listItem} actionName="Edit" submit={editItem} Icon={EditIcon}/>
                        <ConfirmModal Icon={Delete} submit={deleteItem}
                                      actionName={`Delete: ${listItem.description}`}/>
                    </ButtonGroup>

                </ListItemSecondaryAction>
            </Grid>
        </ListItem>

    );
}

export default TodoListItemRow;