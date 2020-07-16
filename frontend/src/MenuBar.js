import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import { useAuth0 } from "@auth0/auth0-react";
import CompanyLogo from './CompanyLogo';

const MenuBar = (props) => {
    const { isAuthenticated } = useAuth0();

    var userInfo = <></>;

    if (isAuthenticated) {
        userInfo = <CompanyLogo name={props.name}/>
    }

    return (
        <AppBar position="static" style={{ backgroundColor: "#FFFFFF", height: "7vh", width: "100%", color: "#000000", paddingTop: "1vh", minHeight: "50px" }}>
            <Grid container>
                <Grid item xs={8}>
                    <img
                        src="koala.jpg"
                        className="App-logo"
                        alt="logo"
                        style={{ height: "5vh", paddingLeft: "1%" }}
                    />
                    <Typography variant="h3" style={{ display: "inline", paddingLeft: "1%", paddingBotton: "10%", verticalAlign: "super", fontSize: "calc(12px + 3vh)" }}>
                        <strong>Business Buddy</strong>
                    </Typography>
                </Grid>

                <Grid item xs={4} style={{ textAlign: "right" }}>
                    {userInfo}
                </Grid>
            </Grid>
        </AppBar>
    );
}

export default MenuBar;