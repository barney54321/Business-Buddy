import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Services from "./services/Services";
import Buddy from "./messages/Buddy";

const useStyles = makeStyles({
    container: {
        color: "#183052",
        width: "100%",
        height: "auto",
        paddingTop: "2vh"
    }
});

const Dashboard = (props) => {
    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.container}>

            <Grid item xs sm md lg={1} xl={2}></Grid>

            <Grid item xs={12} md={5} lg={6} xl={5}>
                <Buddy
                    business={props.business}
                    addService={props.addService}
                    updateBusiness={props.updateBusiness}
                    alerts={props.alerts}
                />
            </Grid>

            <Grid item xs={12} md={5} lg={4} xl={3}>
                <Services
                    setPage={props.setPage}
                    addService={props.addService}
                    business={props.business}
                />
            </Grid>

            <Grid item xs sm md lg={1} xl={2}></Grid>

        </Grid>
    );
}

export default Dashboard;