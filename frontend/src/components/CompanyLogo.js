import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from "@material-ui/core/Avatar";

import LogoutButton from "./authorisation/LogoutButton";

const CompanyLogo = (props) => {

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
        <Grid container>
            <Grid item xs style={{ paddingTop: "1%", paddingRight: "2%" }}>
                <Typography variant="h5" >
                    {name}
                </Typography>
            </Grid>

            <Grid item xs={1}>
                <Avatar onClick={handleClick} alt={user.name} src={user.picture} style={{ float: "right", marginRight: "20%", marginTop: "5%" }} />

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

            </Grid>
        </Grid>
    );
}

export default CompanyLogo;