import React from 'react';
import {ButtonGroup, Divider, ListItem, ListItemSecondaryAction, Typography} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {deleteList, editList} from "../../lib/dataSource";
import {TodoList} from "../../lib/models.mjs";
import TextModal from "../modals/textModal";
import EditIcon from "@material-ui/icons/Edit";
import {Delete} from "@material-ui/icons";
import ConfirmModal from "../modals/ConfirmModal";
import {Paths} from "../../lib/paths";

/**
 * Models a row for a todo list
 * @param {TodoList} props.list
 * @param {function} props.refresh
 * @return {JSX.Element}
 * @constructor
 */
function TodoListRow(props) {
    const {list, refresh, ...other} = props;

    const listItemsPath = Paths.ITEMS(list.id);
    const hist = useHistory();
    const logout = () => {
        sessionStorage.removeItem("jwt");
        window.alert("You have been logged out");
        hist.push(Paths.LOGIN());
    }
    const changeList = (description) => {
        editList(new TodoList(description, list.id))
            .then(_ => refresh())
            .catch(err => {
                window.alert(err.response.status);
                if (err.response.status === 401) {
                    logout();
                }
            });
    }

    const removeList = () => {
        deleteList(list)
            .then(_ => refresh())
            .catch(err => {
                window.alert(err.response.status);
                if (err.response.status === 401) {
                    logout();
                }
            });
    }

    return (
        <>
            <ListItem component={Link} to={listItemsPath} {...other} key={list.id}>
                <Typography variant="body1">{list.description}</Typography>
                <ListItemSecondaryAction>
                    <ButtonGroup>
                        <TextModal actionName="Edit" Icon={EditIcon} submit={changeList} item={list}/>
                        <ConfirmModal submit={removeList} Icon={Delete} actionName={"Delete list"}/>
                    </ButtonGroup>

                </ListItemSecondaryAction>
            </ListItem>
            <Divider/>
        </>
    );
}

export default TodoListRow;