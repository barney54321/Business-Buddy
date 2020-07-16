import React from 'react';

import Grid from '@material-ui/core/Grid';

import Services from "./Services";
import Buddy from "./Buddy";

export default class Dashboard extends React.Component {

    addService = () => {
        
    }

    render() {
        return (
            <>
                <br></br>

                <Grid container spacing={3} style={{ color: "#183052", width: "100%", height: "92vh" }}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={5}><Buddy/></Grid>
                    <Grid item xs={3}><Services addService={this.addService}/></Grid>
                    <Grid item xs={2}></Grid>
                    
                </Grid>
            </>
        );
    }
}