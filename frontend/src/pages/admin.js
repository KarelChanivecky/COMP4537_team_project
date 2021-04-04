import React, {useEffect, useState} from 'react';
import {getEndpointCounts} from "../lib/dataSource";
import {useHistory} from "react-router-dom";
import {
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {ArrowBack, PowerSettingsNew} from "@material-ui/icons";
import {Paths} from "../lib/paths";

function Admin() {
    const logout = ()=> {
        sessionStorage.removeItem("jwt");
        window.alert("You have been logged out");
        hist.push(Paths.LOGIN());
    }
    const [endpoints, setEndpoints] = useState([]);

    const fetchEndpoints = () => {
        getEndpointCounts()
            .then(setEndpoints)
            .catch(err => {
                window.alert(err.response.status);
                if (err.response.status === 401) {
                    logout();
                }
            });
    };

    useEffect(fetchEndpoints, []);

    const hist = useHistory();

    const back = () => {
        hist.push(Paths.LISTS());
    };

    const logoutButton = sessionStorage.getItem("jwt")  ?
        <IconButton onClick={logout}>
            <PowerSettingsNew/>
        </IconButton>
        : <></>
    return (
        <Grid container direction="column">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Endpoint method</TableCell>
                            <TableCell>Endpoint name</TableCell>
                            <TableCell>Endpoint hit counts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            endpoints.map(e =>
                                <TableRow key={e.name}>
                                    <TableCell>{e.method}</TableCell>
                                    <TableCell>{e.name}</TableCell>
                                    <TableCell>{e.count}</TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
            <IconButton onClick={back}>
                <ArrowBack/>
            </IconButton>
            {logoutButton}
        </Grid>

    );
}

export default Admin;
