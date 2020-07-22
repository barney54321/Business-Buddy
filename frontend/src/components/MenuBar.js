import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import { useAuth0 } from "@auth0/auth0-react";
import CompanyLogo from './CompanyLogo';
import { Box } from '@material-ui/core';

const MenuBar = (props) => {
    const { isAuthenticated } = useAuth0();

    var userInfo = <></>;

    if (isAuthenticated) {
        userInfo = <CompanyLogo business={props.business} user={props.user} setPage={(change) => props.setPage(change)} />
    }

    return (
        <AppBar position="static" elevation={1} style={{ backgroundColor: "#FFFFFF", height: "7vh", width: "100%", color: "#000000", paddingTop: "1vh", minHeight: "50px" }}>
            <Grid container>
                <Grid item xs={5}>
                    <Grid container>
                        <Grid item xs={1}>
                            <img
                                src="koala.jpg"
                                className="App-logo"
                                alt="logo"
                                style={{ height: "5vh", paddingLeft: "20%" }}
                            />
                        </Grid>

                        <Grid item xs>
                            <Box onClick={() => props.setPage("dashboard")} alignItems="center" style={{ display: "inline", margin: "auto", height: "100%" }}>
                                <Typography variant="h3" style={{ overflow: "hidden", display: "inline-block", paddingLeft: "1%", paddingBotton: "10%", fontSize: "calc(12px + 3vh)" }}>
                                    <strong>Business Buddy</strong>
                                </Typography>
                            </Box>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={3}></Grid>

                <Grid item xs={4} style={{ textAlign: "right" }}>
                    {userInfo}
                </Grid>
            </Grid>
        </AppBar>
    );
}

export default MenuBar;