import React from 'react';

import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useAuth0 } from "@auth0/auth0-react";

const SettingsPage = (props) => {

    const { isAuthenticated, user } = useAuth0();

    const business = props.business;

    const saveChange = () => {
        let name = document.getElementById("set_name").value;
        let industry = document.getElementById("set_industry").value;
        let postcode = document.getElementById("set_postcode").value;
        let employees = document.getElementById("set_employees").value;
        let assistance = document.getElementById("set_assistance").value;
        let turnover = document.getElementById("set_turnover").value;

        var newBusiness = {...business};
        newBusiness.name = name;
        newBusiness.industry = industry;
        newBusiness.postcode = postcode;
        newBusiness.employee_count = employees;

        if (assistance.toLowerCase() === "yes" || assistance.toLowerCase() === "no") {
            newBusiness.financial_help = assistance;
        }
        
        newBusiness.fall_in_turnover = turnover;

        props.updateBusiness(newBusiness);
    }

    var username = "";
    var email = "";

    if (isAuthenticated) {
        username = user.name;
        email = user.email;
    }

    var name = "";
    var industry = "";
    var postcode = "";
    var employees = "";
    var assistance = "";
    var turnover = "";

    if (business != null && business.name !== undefined) {
        name = business.name  || name;
        industry = business.industry  || industry;
        postcode = business.postcode  || postcode;
        employees = business.employee_count  || employees;
        assistance = business.financial_help  || assistance;
        turnover = business.fall_in_turnover || turnover;
    } else {
        return <></>
    }

    return (
        <>
            <br></br>

            <Grid container spacing={3} style={{ color: "#000000", width: "100%", height: "92vh", textColor: "#000000" }}>
                <Grid item xs={2}></Grid>
                <Grid item xs={5}>
                    <Typography variant="h5" style={{ color: "#000000", paddingBottom: "2%", paddingLeft: "2%" }}>
                        <strong>My Data</strong>
                    </Typography>
                    <Box boxShadow={3} borderRadius={10} style={{ padding: "2%" }}>
                        <Typography variant="h6" style={{ color: "#000000", paddingBottom: "2%" }}>
                            PERSONAL INFORMATION
                        </Typography>

                        <Box component="div" display="inline-block" p={0} m={0} width="35%">
                            <TextField disabled defaultValue="NAME: " InputProps={{ disableUnderline: true }} />
                        </Box>
                        {username}<br></br>

                        <Box component="div" display="inline-block" p={0} m={0} width="35%">
                            <TextField disabled defaultValue="EMAIL: " InputProps={{ disableUnderline: true }} />
                        </Box>
                        {email}
                    </Box>

                    <br></br>
                    <Box boxShadow={3} borderRadius={10} style={{ padding: "2%" }}>
                        <Typography variant="h6" style={{ color: "#000000", paddingBottom: "2%" }}>
                            BUSINESS INFORMATION
                        </Typography>

                        <Box component="div" display="inline-block" p={0} m={0} width="35%">
                            <TextField disabled defaultValue="BUSINESS NAME: " InputProps={{ disableUnderline: true }} />
                        </Box>
                        <Box component="div" display="inline-block" p={0} m={0} width="55%">
                            <TextField id="set_name" defaultValue={name} InputProps={{ disableUnderline: true }} />
                        </Box>

                        <Box component="div" display="inline-block" p={0} m={0} width="35%">
                            <TextField disabled defaultValue="POSTCODE: " InputProps={{ disableUnderline: true }} />
                        </Box>
                        <Box component="div" display="inline-block" p={0} m={0} width="55%">
                            <TextField id="set_postcode" type="number" defaultValue={postcode} InputProps={{ disableUnderline: true }} />
                        </Box>

                        <Box component="div" display="inline-block" p={0} m={0} width="35%">
                            <TextField disabled defaultValue="INDUSTRY: " InputProps={{ disableUnderline: true }} />
                        </Box>
                        <Box component="div" display="inline-block" p={0} m={0} width="55%">
                            <TextField id="set_industry" defaultValue={industry} InputProps={{ disableUnderline: true }} />
                        </Box>

                        <Box component="div" display="inline-block" p={0} m={0} width="35%">
                            <TextField disabled defaultValue="NO. EMPLOYEES: " InputProps={{ disableUnderline: true }} />
                        </Box>
                        <Box component="div" display="inline-block" p={0} m={0} width="55%">
                            <TextField id="set_employees" type="number" defaultValue={employees} InputProps={{ disableUnderline: true }} />
                        </Box>

                        <Box component="div" display="inline-block" p={0} m={0} width="35%">
                            <TextField disabled defaultValue="GOVT. ASSISTANCE: " InputProps={{ disableUnderline: true }} />
                        </Box>
                        <Box component="div" display="inline-block" p={0} m={0} width="55%">
                            <TextField id="set_assistance" defaultValue={assistance} InputProps={{ disableUnderline: true }} />
                        </Box>

                        <Box component="div" display="inline-block" p={0} m={0} width="35%">
                            <TextField disabled defaultValue="FALL IN TURNOVER: " InputProps={{ disableUnderline: true }} />
                        </Box>
                        <Box component="div" display="inline-block" p={0} m={0} width="55%">
                            <TextField id="set_turnover" type="number" defaultValue={turnover.replace(/\D/g, '')} InputProps={{ disableUnderline: true, inputProps: { max: 100, min: 0 } }} />
                        </Box>

                        <Box component="div" display="block" p={0} m={0} width="35%">
                            <Button onClick={saveChange} variant="contained" color="primary" style={{ margin: "2%", marginLeft: "0%" }}>SAVE</Button>
                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h5" style={{ color: "#000000", paddingBottom: "2%", paddingLeft: "2%" }}>
                        <strong>Settings</strong>
                    </Typography>
                    <Box boxShadow={3} borderRadius={10} style={{ padding: "2%" }}>
                        <Typography variant="h6" style={{ color: "#000000", paddingBottom: "2%" }}>
                            ACCOUNT
                        </Typography>

                        <strong>Privacy Information</strong>
                        <br></br>
                        All data is securely stored in Australia with IBM Cloudant.
                        <br></br>
                        <br></br>

                        <strong>Delete Account</strong><br></br>
                        By clicking this button, all stored data will be cleared from the system and you will be 
                        logged out of Business Buddy.
                        <br></br>
                        <Button onClick={props.deleteAccount} variant="contained" color="secondary" style={{marginTop: "1%"}}>DELETE ACCOUNT</Button>
                    </Box>
                </Grid>
                <Grid item xs={2}></Grid>

            </Grid>
        </>
    );
}

export default SettingsPage;