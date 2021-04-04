import React from 'react';
import {Button, ButtonGroup, Grid, TextField, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

function Login(props) {
    return (
        <Grid container justify="center">
            <Grid item container direction="column" md={8} justify="center">
                <Typography variant={"h3"} align="center">Login</Typography>
                <TextField variant="outlined"
                           label="Email"/>
                <TextField variant="outlined"
                           label="Password"/>
                <Grid item container direction="row" justify="center">
                    <ButtonGroup>
                        <Button component={Link} to="/register">
                            Register
                        </Button>
                        <Button>
                            Login
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Grid>

    );
}

export default Login;