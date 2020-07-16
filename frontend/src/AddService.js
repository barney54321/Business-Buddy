import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 120,
    },
}));

export default function AddService(props) {
    const classes = useStyles();

    return (
        
        <Grid item xs={6}>
            <Paper className={classes.paper} elevation={3} onClick={props.clickAdd}>
            </Paper>
        </Grid>
    );
}