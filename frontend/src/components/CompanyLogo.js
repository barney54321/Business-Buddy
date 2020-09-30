import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';

import LogoutButton from "./authorisation/LogoutButton";

import {
    BrowserView,
    isMobile,
} from "react-device-detect";

const useStyles = makeStyles({
    typography: { 
        marginTop: "5%",
        whiteSpace: "nowrap",
    },
    avatar: {
        float: "right",
        marginRight: "20%",
        marginTop: "5%"
    }
});


const CompanyLogo = (props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (change) => {
        props.setPage(change);
        handleClose();
    }

    let user = props.user;
    let name = "";

    if (props.business !== null && props.business.name !== undefined) {
        name = props.business.name;
    }

    return (
        <Box display="flex" justifyContent="flex-end">
            <BrowserView>
                <Box m="auto" >
                    <Typography variant="h5" className={classes.typography}>
                        {name}
                    </Typography>
                </Box>
            </BrowserView>

            <Box style={{ width: isMobile ? "10px" : "70px"  }}>
                <Avatar onClick={handleClick} alt={user.name} src={user.picture} className={classes.avatar} />

                <Menu
                    id="company-dropdown"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleChange("dashboard")}>Home</MenuItem>
                    <MenuItem onClick={() => handleChange("settings")}>Settings</MenuItem>
                    <LogoutButton />
                </Menu>
            </Box>
        </Box>
    );
}

export default CompanyLogo;