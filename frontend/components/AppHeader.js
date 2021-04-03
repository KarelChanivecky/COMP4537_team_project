import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import ColoredPaper from "./ColoredPaper";

function AppHeader(props) {
    const headerColor = {
        main: "#A00",
        contrastText: "#FFF"
    }
    return (

        <ColoredPaper color={headerColor}>
            <Grid container justify="center" direction="row">
                <Typography variant="h1">Do TODO</Typography>
            </Grid>
        </ColoredPaper>

    );
}

export default AppHeader;