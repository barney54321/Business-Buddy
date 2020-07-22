import React from 'react';

import Grid from '@material-ui/core/Grid';

import Services from "./services/Services";
import Buddy from "./messages/Buddy";

const Dashboard = (props) => {

    return (
        <>
            <br></br>

            <Grid container spacing={3} style={{ color: "#183052", width: "100%", height: "92vh" }}>
                <Grid item xs={2}></Grid>
                <Grid item xs={5}><Buddy business={props.business} updateBusiness={props.updateBusiness} alerts={props.alerts}/></Grid>
                <Grid item xs={3}><Services setPage={props.setPage} addService={props.addService} business={props.business}/></Grid>
                <Grid item xs={2}></Grid>

            </Grid>
        </>
    );
}

export default Dashboard;