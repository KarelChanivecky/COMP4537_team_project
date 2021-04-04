import React, {useEffect, useState} from 'react';
import {Button, Grid, IconButton, List, Typography} from "@material-ui/core";
import {createList, getLists} from "../lib/dataSource";
import TodoListRow from "../components/listRows/ListItemRow";
import {AddCircleOutlined} from "@material-ui/icons";
import {TodoList} from "../lib/models.mjs";
import TextModal from "../components/modals/textModal";
import {useHistory} from "react-router-dom";
import * as Path from "path";

function Lists(props) {

    const [lists, setLists] = useState([]);

    const fetchLists = () => {
        getLists()
            .then(setLists)
            .catch(err => window.alert(err));
    }

    const [fetch, setFetch] = useState(true);

    const addList = (description) => {
        createList(new TodoList(description))
            .then(_ => setFetch(!fetch))
            .catch(err => window.alert(err));
    }

    useEffect(fetchLists, [fetch]);


    const hist = useHistory();
    const toAdmin = () => {
        hist.push(Paths.ADMIN());
    }

    return (
        <Grid container direction="column">
            <Typography variant="h3">TODO lists</Typography>
            <List>
                {lists.map((list) => <TodoListRow listItem={list} refresh={setFetch}/>)}
            </List>
            <TextModal Icon={AddCircleOutlined} submit={addList} actionName="Add list"/>
            <Button onClick={toAdmin}>
                Admin Page
            </Button>
        </Grid>
    );
}

export default Lists;
