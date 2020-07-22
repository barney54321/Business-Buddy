import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const Service = (props) => {

    var val = props.val;
    var link = "https://google.com.au";

    const handleClick = () => {
        if (val.action === undefined || val.action === null) {
            window.open(link, "_blank")
        } else {
            val.action();
        }
    }

    const style = {
        textAlign: 'center',
        height: 230,
        background: "linear-gradient(0deg, rgba(255,255,255,1) 23%, " + props.color + " 29%, " + props.color + " 100%)"
    }
    return (
        
        <Grid item xs={6} style={{height: 250}}>
            <Box onClick={handleClick} style={style} boxShadow={5} borderRadius={10} m={0}>
                <div style={{height: "50%"}}></div>
                <Box style={{color: "#000000", textAlign: "left", padding: "3%", backgroundColor: "#FFFFFF", height: "30%"}}>
                    <Typography variant="subtitle1" style={{color: "#000000", textAlign: "left"}}>
                        <strong>{val.text}</strong>
                    </Typography>
                </Box>
            </Box>
        </Grid>
    );
}

export default Service;