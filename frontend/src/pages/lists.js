import React, {useEffect, useState} from 'react';
import {Button, Grid, IconButton, List, Typography} from "@material-ui/core";
import {createList, getLists} from "../lib/dataSource";
import TodoListRow from "../components/listRows/todoListRow";
import {AddCircleOutlined, PowerSettingsNew} from "@material-ui/icons";
import {TodoList} from "../lib/models.mjs";
import TextModal from "../components/modals/textModal";
import {useHistory} from "react-router-dom";
import {Paths} from "../lib/paths";

function Lists() {

    const [lists, setLists] = useState([]);
    const logout = ()=> {
        sessionStorage.removeItem("jwt");
        window.alert("You have been logged out");
        hist.push(Paths.LOGIN());
    }
    const fetchLists = () => {
        getLists()
            .then(lists => {
                setLists(lists);
            })
            .catch(err => {
                window.alert(err.response.status);
                if (err.response.status === 401) {
                    logout();
                }
            });
    }

    const [fetch, setFetch] = useState(true);

    const addList = (description) => {
        createList(new TodoList(description))
            .then(_ => setFetch(!fetch))
            .catch(err => {
                window.alert(err.response.status);
                if (err.response.status === 401) {
                    logout();
                }
            });
    }

    useEffect(fetchLists, [fetch]);


    const hist = useHistory();
    const toAdmin = () => {
        hist.push(Paths.ADMIN());
    }


    const logoutButton = sessionStorage.getItem("jwt")  ?
        <IconButton onClick={logout}>
            <PowerSettingsNew/>
        </IconButton>
        : <></>

    return (
        <Grid container direction="column">
            <Typography variant="h3">TODO lists</Typography>
            <List>
                {lists.map((list) => <TodoListRow list={list} refresh={setFetch}/>)}
            </List>
            <TextModal Icon={AddCircleOutlined} submit={addList} actionName="Add list"/>
            <Button onClick={toAdmin}>
                Admin Page
            </Button>
            {logoutButton}
        </Grid>
    );
}

export default Lists;
