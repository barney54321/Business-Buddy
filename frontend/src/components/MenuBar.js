import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth0 } from "@auth0/auth0-react";
import CompanyLogo from './CompanyLogo';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
    appBar: {
        backgroundColor: "#FFFFFF",
        height: "65px",
        width: "100%",
        color: "#000000",
        paddingTop: "10px"
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
    );
}

export default MenuBar;