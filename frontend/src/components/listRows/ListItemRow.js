import React from 'react';
import {ButtonGroup, Grid, ListItem, ListItemSecondaryAction, Typography} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import TextModal from "../modals/textModal";
import {deleteListItem, editListItem} from "../../lib/dataSource";
import {TodoList, TodoListItem} from "../../lib/models.mjs";
import ConfirmModal from "../modals/ConfirmModal";
import {Delete} from "@material-ui/icons";
import {Paths} from "../../lib/paths";

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

    const hist = useHistory();
    const logout = () => {
        sessionStorage.removeItem("jwt");
        window.alert("You have been logged out");
        hist.push(Paths.LOGIN());
    }

    const editItem = (newDescription) => {
        editListItem(metaList, new TodoListItem(newDescription, listItem.id))
            .then(_ => refresh())
            .catch(err => {
                window.alert(err.response.status);
                if (err.response.status === 401) {
                    logout();
                }
            });
    }

    const deleteItem = () => {
        deleteListItem(metaList, listItem)
            .then(_ => refresh())
            .catch(err => {
                window.alert(err.response.status);
                if (err.response.status === 401) {
                    logout();
                }
            });
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