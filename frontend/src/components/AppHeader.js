import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import ColoredPaper from "./ColoredPaper";

function AppHeader(props) {
    const headerColor = {
        main: "#A00",
        contrastText: "#FFF"
    }
    return (
        <header>
            <ColoredPaper color={headerColor}>
                <Grid container justify="center" direction="row">
                    <Typography variant="h1">DoToDo</Typography>
                </Grid>
            </ColoredPaper>
        </header>
    );
}

export default AppHeader;