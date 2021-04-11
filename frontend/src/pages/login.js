import React, {useState} from 'react';
import {Button, ButtonGroup, Divider, Grid, TextField, Typography} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {handleStringChange} from "../lib/commonHandlers";
import {loginUser} from "../lib/dataSource";
import {User} from "../lib/models.mjs";
import {Paths} from "../lib/paths";
import {validateEmail, validatePassword} from "../lib/testValidators";

function Login(props) {
    const hist = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = () => {
        if (!validateEmail(email)) {
            window.alert("not a valid email");
            return;
        }
        if (!validatePassword(password)) {
            window.alert("Not a valid password. Must have at least 8 chars, one lower case, one uppercase and one number");
            return;
        }
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
                           type="email"
                />
                <Divider/>
                <TextField variant="outlined"
                           label="Password"
                           type="password"
                            onChange={handleStringChange(setPassword)}
                           value={password}
                />
                <Grid item container direction="row" justify="center">
                    <ButtonGroup>
                        <Button component={Link} to={Paths.REGISTER()}>
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