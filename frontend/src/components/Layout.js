import React from 'react';
import AppHeader from "./AppHeader";
import {Grid} from "@material-ui/core";
import ColoredPaper from "./ColoredPaper";


function Layout(props) {
    const children = props.children;
    const contentColor = {
        main: "#A70",
        contrastText: "#FFF"
    }
    return (
        <div>
            <AppHeader/>
            <main>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} sm={12} md={8} lg={7} xl={5} >
                        <ColoredPaper parentSize elevation={0} color={contentColor}>
                            {children}
                        </ColoredPaper>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
}

export default Layout;