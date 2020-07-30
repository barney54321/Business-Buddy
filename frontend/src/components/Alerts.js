import React from 'react';

import { Container, Box, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    box: { 
        maxHeight: "70vh", 
        width: "95%", 
        padding: "2%",
        overflowY: "auto"
    },
    typography: { 
        color: "#000000", 
        paddingLeft: "2%" 
    }
});

const Alerts = (props) => {
    const classes = useStyles();

    var internals = <></>;

    const alerts = props.alerts;

    if (alerts != null) {
        internals = <>
            {alerts.map((alert, index) =>
                <li key={index} style={{ paddingBottom: "0.4%" }}>
                    <Link href={alert.link} target="_blank" key={index}>{alert.day} {alert.month} - {alert.title}</Link>
                </li>
            )}
        </>;
    }

    return (
        <>
            <br></br>

            <Container>
                <Typography variant="h5" className={classes.typography}>
                    <strong>NSW Health Alerts</strong>
                </Typography>
                <Box boxShadow={15} borderRadius={10} className={classes.box}>
                    <ul>
                        {internals}
                    </ul>
                </Box>
            </Container>
        </>
    );
}

export default Alerts;