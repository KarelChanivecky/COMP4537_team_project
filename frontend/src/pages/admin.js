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
import {ArrowBack} from "@material-ui/icons";
import {Paths} from "../lib/paths";

function Admin(props) {

    const [endpoints, setEndpoints] = useState([]);

    const fetchEndpoints = () => {
        getEndpointCounts()
            .then(setEndpoints);
    };

    useEffect(fetchEndpoints, []);

    const hist = useHistory();

    const back = () => {
        hist.push(Paths.LISTS());
    };

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
        </Grid>

    );
}

export default Admin;
