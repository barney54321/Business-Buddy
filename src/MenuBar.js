import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";

import { useAuth0 } from "@auth0/auth0-react";

const MenuBar = (props) => {
    const { isAuthenticated } = useAuth0();

    var userInfo = <></>;

    if (isAuthenticated) {
        userInfo = (
            <Grid container>
                <Grid item xs={10}>
                    <Typography variant="h5" align="right">
                        {props.name}
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}>
                    <Avatar alt="Company" src="pizza.jpg" />
                </Grid>
            </Grid>
        );
    }

    return (
        <AppBar position="static" style={{ backgroundColor: "#FFFFFF", height: "7vh", width: "1", color: "#000000" }}>
            <Toolbar>
                <Grid container>
                    <Grid item xs={4}>
                        <img
                            src="koala.jpg"
                            className="App-logo"
                            alt="logo"
                            padding="5"
                        />
                        <Typography variant="h3" style={{ display: "inline" }}>
                            <strong>Business Buddy</strong>
                        </Typography>
                    </Grid>


                    <Grid item xs={4}>
                        <Button>HOME</Button>
                        <Button>PRIVACY</Button>
                    </Grid>

                    <Grid item xs={4}>
                        {userInfo}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default MenuBar;