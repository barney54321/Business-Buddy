import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export default class MenuBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
        }
    }

    render() {
        return (
            <AppBar position="static" style={{ backgroundColor: "#FFFFFF", height: "7vh", width: "100%", color: "#000000", paddingTop: "1vh", minHeight: "50px"}}>
                    <Grid container>
                        <Grid item xs={4}>
                            <img
                                src="koala.jpg"
                                className="App-logo"
                                alt="logo"
                                style={{height: "5vh", paddingLeft: "1%"}}
                            />
                            <Typography variant="h3" style={{ display: "inline", paddingLeft: "2%", paddingBotton: "10%", verticalAlign: "super", fontSize: "calc(12px + 3vh)" }}>
                                <strong>Business Buddy</strong>
                            </Typography>
                        </Grid>


                        <Grid item xs={4}>
                            <Button size="large" style={{marginLeft: "1%", marginTop: "1%"}}>HOME</Button>
                            <Button size="large" style={{marginLeft: "1%", marginTop: "1%"}}>PRIVACY</Button>
                        </Grid>

                        <Grid item xs={4} style={{textAlign: "right"}}>
                            <Box>
                            <Typography variant="h5" style={{ display: "inline", paddingLeft: "2%", fontSize: "calc(12px + 1vh)" }}>
                                {this.state.name.toUpperCase()}
                            </Typography>

                            <img
                                src="pizza.jpg"
                                className="App-logo"
                                alt="company"
                                style={{height: "5vh", paddingLeft: "1%"}}
                            />
                            </Box>
                        </Grid>
                    </Grid>
                {/* </Toolbar> */}
            </AppBar>

        );
    }
}