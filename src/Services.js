import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Service from "./Service";
import AddService from "./AddService";

const services = [
    {
        src: "keeper.jpg",
        text: "Jobkeeper"
    },
    {
        src: "liquor.jpg",
        text: "Liquor Licence"
    },
    {
        src: "lbr.jpg",
        text: "Local Business Relief"
    },
    {
        src: "keeper.jpg",
        text: "Jobkeeper"
    },
    {
        src: "liquor.jpg",
        text: "Liquor Licence"
    },
    {
        src: "lbr.jpg",
        text: "Local Business Relief"
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Services(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Typography variant="h5" style={{ color: "#000000" }}>
                <strong>My Services</strong>
            </Typography>
            <Grid container spacing={3}>
                {services.map((val, index) =>
                    <Service val={val} key={index}></Service>
                )}
                <AddService clickAdd={() => props.addService()}/>
            </Grid>
        </div>
    );
}