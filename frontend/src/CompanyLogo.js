import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import LogoutButton from "./authorisation/LogoutButton";

const CompanyLogo = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Typography variant="h5" style={{ display: "inline", paddingLeft: "2%", fontSize: "calc(12px + 1vh)" }}>
                {props.name.toUpperCase()}
            </Typography>

            <img
                src="pizza.jpg"
                className="App-logo"
                alt="company"
                style={{ height: "5vh", paddingLeft: "1%", paddingRight: "1%" }}
                onClick={handleClick}
            />

            <Menu
                id="company-dropdown"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Home</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <LogoutButton/>
            </Menu>
        </Box>
    );
}

export default CompanyLogo;