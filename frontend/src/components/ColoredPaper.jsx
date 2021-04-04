import React from 'react';
import {makeStyles, Paper} from "@material-ui/core";

/**
 *
 * @param {{main:string, contrastText:string}}color
 * @param {JSX.Element[]} children
 * @param {boolean} parentSize
 * @param {any} other
 * @return {JSX.Element}
 * @constructor
 */
function ColoredPaper({color, children, parentSize, ...other}) {
    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: color ? color.main : '#FFF',
            color: color ? color.contrastText : '#000',
            width: parentSize ? "100%" : "auto",
            height: parentSize ? "100%" : "auto"
        }
    }));

    const classes = useStyles();

    return (
        <Paper className={classes.root} {...other} >{children}</Paper>
    );
}

export default ColoredPaper;