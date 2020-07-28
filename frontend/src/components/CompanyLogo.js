import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';

import LogoutButton from "./authorisation/LogoutButton";

const useStyles = makeStyles({
    gridItem: { 
        paddingTop: "1%", 
        paddingRight: "2%" 
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
        <Grid container>
            <Grid item xs className={classes.gridItem}>
                <Typography variant="h5" >
                    {name}
                </Typography>
            </Grid>

            <Grid item xs={1}>
                <Avatar onClick={handleClick} alt={user.name} src={user.picture} className={classes.avatar}/>

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