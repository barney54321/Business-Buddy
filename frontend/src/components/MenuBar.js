import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth0 } from "@auth0/auth0-react";
import CompanyLogo from './CompanyLogo';
import { Box } from '@material-ui/core';

import {
    BrowserView,
    MobileView,
} from "react-device-detect";

const useStyles = makeStyles({
    appBar: {
        backgroundColor: "#FFFFFF",
        height: "65px",
        width: "100%",
        color: "#000000",
        paddingTop: "10px"
    },
    appBarMobile: {
        backgroundColor: "#FFFFFF",
        height: "9vh",
        width: "100%",
        color: "#000000",
        paddingTop: "10px"
    },
    typographyMobile: {
        marginTop: "5%",
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
    typography: {
        marginTop: "-1%",
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
    imageBox: { 
        width: "70px",
        minWidth: "50px" 
    },
    koala: { 
        paddingLeft: "10px", 
        height: "50px" 
    },
    koalaMobile: { 
        paddingLeft: "10px", 
        height: "7vh" 
    },
    textBox: { 
        maxWidth: "60%" 
    }
});

const MenuBar = (props) => {
    const classes = useStyles();

    const { isAuthenticated } = useAuth0();

    var userInfo = <></>;

    if (isAuthenticated) {
        userInfo = <CompanyLogo
            business={props.business}
            user={props.user}
            setPage={(change) => props.setPage(change)}
        />
    }

    return (
        <>
            <BrowserView>
                <AppBar position="static" elevation={1} className={classes.appBar}>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Box display="flex">
                                <Box className={classes.imageBox}>
                                    <img
                                        src="koala.jpg"
                                        alt="logo"
                                        className={classes.koala}
                                    />
                                </Box>

                                <Box onClick={() => props.setPage("dashboard")} overflow="hidden" alignItems="center" className={classes.textBox}>
                                    <Typography variant="h3" className={classes.typography}>
                                        <strong>Business Buddy</strong>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {userInfo}
                    </Box>

                </AppBar>
            </BrowserView>
            <MobileView>
                <AppBar position="static" elevation={1} className={classes.appBarMobile}>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Box display="flex">
                                <Box className={classes.imageBox}>
                                    <img
                                        src="koala.jpg"
                                        alt="logo"
                                        className={classes.koalaMobile}
                                    />
                                </Box>

                                <Box onClick={() => props.setPage("dashboard")} overflow="hidden" alignItems="center" className={classes.textBox}>
                                    <Typography variant="h5" className={classes.typographyMobile}>
                                        <strong>Business Buddy</strong>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {userInfo}
                    </Box>

                </AppBar>
            </MobileView>
        </>
    );
}

export default MenuBar;