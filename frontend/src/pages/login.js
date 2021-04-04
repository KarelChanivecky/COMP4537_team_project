import React, {useState} from 'react';
import {Button, ButtonGroup, Grid, TextField, Typography} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {handleStringChange} from "../lib/commonHandlers";
import {loginUser} from "../lib/dataSource";
import {User} from "../lib/models.mjs";
import {Paths} from "../lib/paths";

function Login(props) {
    const hist = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = () => {
        loginUser(new User(email, password))
            .then(_ => hist.push(Paths.LISTS()))
            .catch(err => window.alert(err));
    };

    return (
        <Grid container justify="center">
            <Grid item container direction="column" md={8} justify="center">
                <Typography variant={"h3"} align="center">Login</Typography>
                <TextField variant="outlined"
                           label="Email"
                           onChange={handleStringChange(setEmail)}
                           value={email}
                />
                <TextField variant="outlined"
                           label="Password"
                            onChange={handleStringChange(setPassword)}
                           value={password}
                />
                <Grid item container direction="row" justify="center">
                    <ButtonGroup>
                        <Button component={Link} to="/register">
                            Register
                        </Button>
                        <Button onClick={loginHandler}>
                            Login
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Grid>

    );
}

export default Login;