import React, {useEffect, useState} from 'react';
import {Grid, IconButton, List, Typography} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import {createListItem, getListItems, getLists} from "../lib/dataSource";
import {TodoList, TodoListItem} from "../lib/models.mjs";
import ListItemRow from "../components/listRows/ListItemRow";
import {AddCircleOutlined, ArrowBack, PowerSettingsNew} from "@material-ui/icons";
import TextModal from "../components/modals/textModal";
import {Paths} from "../lib/paths";

function Items() {
    const {listId} = useParams();

    const [list, setList] = useState(new TodoList("", parseInt(listId)));

    const [items, setItems] = useState([]);

    const [fetchItems, setFetchItems] = useState(false);

    const refresh = () => {
        setFetchItems(!fetchItems);
    }
    const logout = () => {
        sessionStorage.removeItem("jwt");
        window.alert("You have been logged out");
        hist.push(Paths.LOGIN());
    }
    const getList = () => {
        getLists()
            .then(lists => {
                lists.forEach(l => {
                    if (l.id === parseInt(listId)) {
                        setList(l);
                    }
                })
            })
            .catch(err => {
                if (err.response.status === 401) {
                    logout();
                }
                window.alert(err.response.status);
            });
    };


    const getItems = () => {
        getListItems(new TodoList("", listId))
            .then(setItems)
            .catch(err => {
                window.alert(err.response.status);
                if (err.response.status === 401) {
                    logout();
                }
            });
    }

    useEffect(getList, [listId]);
    useEffect(getItems, [fetchItems, listId]);

    const addListItem = (description) => {
        if (description.length === 0 ) {
            alert("Please enter a description.");
            return;
        }
        createListItem(list, new TodoListItem(description))
            .then(_ => setFetchItems(!fetchItems))
            .catch(err => {
                window.alert(err.response.status);
                if (err.response.status === 401) {
                    logout();
                }
            });
    }


    const hist = useHistory();


    const back = () => {
        hist.push(Paths.LISTS());
    }


    const logoutButton = sessionStorage.getItem("jwt") ?
        <IconButton onClick={logout}>
            <PowerSettingsNew/>
        </IconButton>
        : <></>
    return (
        <Grid container direction="column">
            <Typography variant="h3">{list.description} items</Typography>
            <List>
                {items.map(item => <ListItemRow listItem={item} refresh={refresh}/>)}
            </List>
            <TextModal submit={addListItem} Icon={AddCircleOutlined} actionName="Add item"/>
            <IconButton onClick={back}>
                <ArrowBack/>
            </IconButton>
            {logoutButton}
        </Grid>
    );
}

export default Items;