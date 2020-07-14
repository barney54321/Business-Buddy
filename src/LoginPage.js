import React from 'react';

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from '@material-ui/core';
import Box from "@material-ui/core/Box";

class LoginPage extends React.Component {

    constructor(props) {
        super(props)

        this.app = props.app;
    }

    render() {

        return (
            <Box height="93vh">
                <Grid container p={3}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <Box style={{ height: "20vh" }}></Box>
                        <Paper style={{ height: "40vh", borderRadius: 16 }}>
                            <Box p={2}>
                                <Typography variant="h5" style={{ color: "#183052" }}><strong>Log into My Business</strong></Typography>
                                <Button variant="contained" onClick={() => this.app.setState({ loggedIn: true })}>Log In</Button>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
            </Box>
        );
    }
}

export default LoginPage;