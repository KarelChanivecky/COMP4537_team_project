import React, {useState} from 'react';
import {Button, ButtonGroup, Grid, TextField, Typography} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {handleStringChange} from "../lib/commonHandlers";
import {createUser, loginUser} from "../lib/dataSource";
import {User} from "../lib/models.mjs";

function Register(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const hist = useHistory();

    const registerHandler = () => {
        createUser(new User(email, password))
            .then(_ => hist.push(Paths.LISTS()))
            .catch(err => window.alert(err));
    };


    return (
        <Grid container justify="center">
            <Grid item container direction="column" md={8} justify="center">
                <Typography variant={"h3"} align="center">Register</Typography>
                <TextField variant="outlined"
                           label="Email"
                           onChange={handleStringChange(setEmail)}
                           value={email}/>
                <TextField variant="outlined"
                           label="Password"
                           onChange={handleStringChange(setPassword)}
                           value={password}/>
                <Grid item container direction="row" justify="center">
                    <ButtonGroup >
                        <Button component={Link} to="/">
                            Cancel
                        </Button>
                        <Button onClick={registerHandler}>
                            Register
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Grid>

    );
}

export default Register;