import React, {useEffect, useState} from 'react';
import {Grid, IconButton, List, Typography} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import {createListItem, deleteList, getListItems, getLists} from "../lib/dataSource";
import {TodoList, TodoListItem} from "../lib/models.mjs";
import ListItemRow from "../components/listRows/ListItemRow";
import {AddCircleOutlined, ArrowBack, Delete} from "@material-ui/icons";
import TextModal from "../components/modals/textModal";
import ConfirmModal from "../components/modals/ConfirmModal";
import {Paths} from "../lib/paths";

function Items(props) {
    const {listId} = useParams();

    const [list, setList] = useState(new TodoList("", parseInt(listId)));

    const [items, setItems] = useState([]);

    const [fetchItems, setFetchItems] = useState(false);

    const refresh = () => {
        setFetchItems(!fetchItems);
    }

    const getList = () => {
        getLists()
            .then(lists => {
                lists.forEach(l => {
                    if (l.id === parseInt(listId) ) {
                        setList(l);
                    }
                })
            })
            .catch(err => window.alert(err));
    };

    useEffect(getList, []);

    const getItems = () => {
        getListItems(list)
            .then(setItems)
            .catch(err => window.alert(err));
    }

    useEffect(getItems, [fetchItems]);

    const addListItem = (description) => {
        createListItem(list, new TodoListItem(description))
            .then(_ => setFetchItems(!fetchItems))
            .catch(err => window.alert(err));
    }


    const hist = useHistory();


    const back = () => {
        hist.push(Paths.LISTS());
    }
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
        </Grid>
    );
}

export default Items;