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

export default function Service(props) {
    const classes = useStyles();

    var val = props.val;

    return (
        
        <Grid item xs={6}>
            <Paper className={classes.paper} elevation={3}>
                <img
                    src={val.src}
                    className="App-logo"
                    alt="logo"
                /><br></br>
                {val.text}
            </Paper>
        </Grid>
    );
}