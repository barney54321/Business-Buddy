import React from 'react';

import { Container, Box, Typography, Link } from '@material-ui/core';


const Alerts = (props) => {

    var internals = <></>;

    const alerts = props.alerts;

    if (alerts != null) {
        internals = <>
            {alerts.map((alert, index) => 
                <li key={index} style={{paddingBottom: "0.4%"}}>
                    <Link href={alert.link} target="_blank" key={index}>{alert.day} {alert.month} - {alert.title}</Link>
                </li>
            )}
        </>;
    }

    return (
        <>
            <br></br>

            <Container>
                <Typography variant="h5" style={{ color: "#000000", paddingLeft: "2%" }}>
                    <strong>NSW Health Alerts</strong>
                </Typography>
                <Box boxShadow={15} borderRadius={10} style={{height: "90%", width: "100%", padding: "2%"}}>
                    <ul>
                        {internals}
                    </ul>
                </Box>
            </Container>
        </>
    );
}

export default Alerts;