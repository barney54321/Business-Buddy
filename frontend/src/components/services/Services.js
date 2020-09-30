import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
    BrowserView,
    isMobile
} from "react-device-detect";

import Service from "./Service";
import AddService from "./AddService";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    typography: { 
        color: "#000000", 
        paddingBottom: "3%", 
        paddingLeft: "2%" 
    },
    container: {
        overflowY: "auto",
        marginTop: isMobile ? "3%" : "-1%", 
        height: "auto", 
        display: "flex", 
        maxHeight: "85vh", 
        backgroundColor: "#FFFFFF"
    }
}));

const colors = [
    "rgba(108,175,63,1)",
    "rgb(239,116,33)",
    "rgb(247,193,0)",
    "rgb(60,110,200)",
]

export default function Services(props) {
    const classes = useStyles();

    const business = props.business;

    const services = [
        {
            text: "NSW Health Alerts",
            action: () => {props.setPage("alerts")},
        }
    ];

    if (business != null) {
        for (var i = 0; i < props.business.services.length; i++) {
            let j = i;
            const text = business.services[j].name.slice();
            const link = business.services[j].link.slice();
            const action = () => window.open(link, "_blank");
            services.push({
                text: text,
                action: action,
            });
        }
    }

    return (
        <div className={classes.root}>

            <BrowserView>
                <Typography variant="h5" className={classes.typography}>
                    <strong>My Services</strong>
                </Typography>
            </BrowserView>
            <Grid container spacing={3} className={classes.container}>
                {services.map((val, index) =>
                    <Service val={val} key={index} color={colors[index % colors.length]}></Service>
                )}
                <AddService addService={props.addService}/>
            </Grid>
        </div>
    );
}